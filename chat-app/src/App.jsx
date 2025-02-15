import { useState, useEffect } from 'react'
import './App.css'
import ChatMessage from './components/ChatMessage'
import FollowUpQuestion from './components/FollowUpQuestion'
import { mockResponse } from './mocks/api-response'

function App() {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userInput.trim()) return

    // ユーザーメッセージを追加
    setMessages(prev => [...prev, { text: userInput, isUser: true }])
    
    // モックAPIレスポンスを使用
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: mockResponse.response_to_surface_question, isUser: false }
      ])
    }, 1000)

    setUserInput('')
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
      
      {mockResponse.follow_ups.map((followUp, index) => (
        <FollowUpQuestion
          key={index}
          followUp={followUp}
          onOptionSelect={(option) => {
            setMessages(prev => [...prev, { 
              text: `選択: ${option.text}`, 
              isUser: true 
            }])
          }}
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
