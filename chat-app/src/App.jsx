import { useState } from 'react'
import './App.css'
import ChatMessage from './components/ChatMessage'
import FollowUpQuestion from './components/FollowUpQuestion'
import { sendMessage, sendFollowUpResponse } from './api/chat'

function App() {
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [currentResponse, setCurrentResponse] = useState(null)
  const [initialQuestion, setInitialQuestion] = useState('')
  const [answeredFollowUps, setAnsweredFollowUps] = useState(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [latentIntent, setLatentIntent] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userInput.trim() || isLoading) return

    const input = userInput
    setInitialQuestion(input)
    setMessages(prev => [...prev, { text: input, isUser: true }])
    setAnsweredFollowUps(new Set())
    setUserInput('')
    setError(null)
    setIsLoading(true)
    
    try {
      const response = await sendMessage(input)
      if (response && response.response_to_surface_question) {
        setMessages(prev => [
          ...prev,
          { text: response.response_to_surface_question, isUser: false }
        ])
        setCurrentResponse(response)
        setLatentIntent(response.latent_intent)
      } else {
        throw new Error('不正なレスポンス形式です')
      }
    } catch (err) {
      setError('メッセージの送信に失敗しました。もう一度お試しください。')
      console.error('Error sending message:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOptionSelect = async (option, followUpId) => {
    if (isLoading) return

    setMessages(prev => [...prev, { 
      text: `選択: ${option.text}`, 
      isUser: true 
    }])
    setAnsweredFollowUps(prev => new Set([...prev, followUpId]))
    setError(null)
    setIsLoading(true)

    try {
      const response = await sendFollowUpResponse(initialQuestion, option, latentIntent)
      if (response && response.response_to_surface_question) {
        setMessages(prev => [
          ...prev,
          { text: response.response_to_surface_question, isUser: false }
        ])
        setCurrentResponse(response)
        setLatentIntent(response.latent_intent)
        if (response.follow_ups && response.follow_ups.length > 0) {
          setAnsweredFollowUps(new Set())
        }
      } else {
        throw new Error('不正なレスポンス形式です')
      }
    } catch (err) {
      setError('選択の送信に失敗しました。もう一度お試しください。')
      console.error('Error sending follow-up:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const unansweredFollowUps = currentResponse?.follow_ups?.filter(
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
        {isLoading && (
          <div className="loading-message">
            <span className="loading-dots">...</span>
          </div>
        )}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
      
      {!isLoading && unansweredFollowUps.map((followUp) => (
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
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={isLoading}
        >
          送信
        </button>
      </form>
    </div>
  )
}

export default App
