import apiInstance from "@/libs/axios"
import { ChatMessage, APICreateChatRequest } from "@/types"

// Fetch chat history for a specific user
const fetchChatHistory = async (userId: string) => {
    try {
        const response = await apiInstance.get<ChatMessage[]>(`/chat/${userId}`)
        console.log('Chat history fetched:', response.data)
        return response.data // Return the fetched chat messages
    } catch (error) {
        console.error('Error fetching chat history:', error)
    }
}

// Create a new chat message
const createChatMessage = async (chatMessage: APICreateChatRequest) => {
    try {
        const response = await apiInstance.post<ChatMessage>('/chat/message', chatMessage)
        console.log('Chat message created:', response.data)
        return response.data // Return the newly created chat message
    } catch (error) {
        console.error('Error creating chat message:', error)
    }
}

const fetchCustomers = async () => {
    try {
        const response = await apiInstance.get('/chat/customers')
        return response.data
    }
    catch (error) {
        console.error('Error fetching customers:', error)
    }
}
const chatApi = {
    fetchChatHistory,
    createChatMessage,
    fetchCustomers
}

export default chatApi
