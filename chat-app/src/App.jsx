import { useState, useEffect } from 'react'
import './App.css'
import ChatMessage from './components/ChatMessage'
import FollowUpQuestion from './components/FollowUpQuestion'
import { mockResponse, getFollowUpResponse } from './mocks/api-response'

function App() {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [currentResponse, setCurrentResponse] = useState(null)
  const [initialQuestion, setInitialQuestion] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const input = userInput
    setInitialQuestion(input)
    setMessages(prev => [...prev, { text: input, isUser: true }])
    
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

  const handleOptionSelect = (option) => {
    // 選択されたオプションをメッセージとして表示
    setMessages(prev => [...prev, { 
      text: `選択: ${option.text}`, 
      isUser: true 
    }])

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
      
      {currentResponse?.follow_ups.map((followUp, index) => (
        <FollowUpQuestion
          key={index}
          followUp={followUp}
          onOptionSelect={handleOptionSelect}
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
