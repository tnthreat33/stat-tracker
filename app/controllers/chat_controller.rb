class ChatController < ApplicationController
    include HTTParty
  
    def create
      user_query = params[:query]
  
      # Fetch the ChatGPT API key from Rails credentials
      api_key = Rails.application.credentials.chatgpt_api_key
  
      # Use your ChatGPT API key and endpoint
      response = HTTParty.post('https://api.openai.com/v1/chat/completions', {
        headers: {
          'Authorization' => "Bearer #{api_key}",
          'Content-Type' => 'application/json',
        },
        body: { messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: user_query }] }.to_json,
      })
  
      render json: { response: response.body }
    end
  end
  