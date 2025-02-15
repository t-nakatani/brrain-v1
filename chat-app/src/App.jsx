import { useState } from 'react'
import './App.css'
import ChatMessage from './components/ChatMessage'
import FollowUpQuestion from './components/FollowUpQuestion'
import { mockResponse, getFollowUpResponse } from './mocks/api-response'

function App() {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [currentResponse, setCurrentResponse] = useState(null)
  const [initialQuestion, setInitialQuestion] = useState('')
  const [answeredFollowUps, setAnsweredFollowUps] = useState(new Set())

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const input = userInput
    setInitialQuestion(input)
    setMessages(prev => [...prev, { text: input, isUser: true }])
    setAnsweredFollowUps(new Set())
    
    // モックAPIレスポンスを使用
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: mockResponse.response_to_surface_question, isUser: false }
      ])
      setCurrentResponse(mockResponse)
    }, 1000)

    setUserInput('')
  }

  const handleOptionSelect = (option, followUpId) => {
    // 選択されたオプションをメッセージとして表示
    setMessages(prev => [...prev, { 
      text: `選択: ${option.text}`, 
      isUser: true 
    }])

    // 回答済みのフォローアップを記録
    setAnsweredFollowUps(prev => new Set([...prev, followUpId]))

    // フォローアップのレスポンスを取得
    const followUpResponse = getFollowUpResponse(initialQuestion, option)
    
    // 新しいレスポンスを表示
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: followUpResponse.response_to_surface_question, isUser: false }
      ])
      setCurrentResponse(followUpResponse)
    }, 1000)
  }

  // 未回答のフォローアップのみを表示
  const unansweredFollowUps = currentResponse?.follow_ups.filter(
    followUp => !answeredFollowUps.has(followUp.id)
  ) || []

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
      </div>
      
      {unansweredFollowUps.map((followUp) => (
        <FollowUpQuestion
          key={followUp.id}
          followUp={followUp}
          onOptionSelect={(option) => handleOptionSelect(option, followUp.id)}
        />
      ))}

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="メッセージを入力..."
          className="message-input"
        />
        <button type="submit" className="send-button">送信</button>
      </form>
    </div>
  )
}

export default App
