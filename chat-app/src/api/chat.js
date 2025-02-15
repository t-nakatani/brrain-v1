const API_BASE_URL = 'http://localhost:8000'

export const sendMessage = async (message, context = [], latentIntent = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        context,
        latent_intent: latentIntent,
      }),
    })
    
    if (!response.ok) {
      throw new Error('APIリクエストに失敗しました')
    }
    
    const data = await response.json()
    return {
      response_to_surface_question: data.response_to_surface_question,
      follow_ups: data.follow_ups || [], // follow_upsがない場合は空配列を返す
      latent_intent: data.latent_intent,
    }
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export const sendFollowUpResponse = async (originalInput, selectedOption, latentIntent = null) => {
  return sendMessage(
    originalInput,
    [selectedOption.text],
    latentIntent
  )
}
