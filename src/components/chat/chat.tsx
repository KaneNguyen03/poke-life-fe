import chatApi from '@/services/chat'
import { APICreateChatRequest } from '@/types'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_API_SECRET) 

interface ChatMessage {
    sender: string
    text: string
    userId: string
}

const AdminChat: React.FC = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const [customers, setCustomers] = useState<{ id: string; name: string }[]>([])

    useEffect(() => {
        fetchCustomers() // Fetch customers when component mounts

        socket.on('message', (newMessage: ChatMessage) => {
            if (newMessage.userId === selectedUserId) {
                setMessages((prevMessages) => [...prevMessages, newMessage])
            }
        })

        return () => {
            socket.off('message')
        }
    }, [selectedUserId])

    const fetchChatHistory = async (userId: string) => {
        const messages = await chatApi.fetchChatHistory(userId)
        if (Array.isArray(messages)) {
            setMessages(messages)
        }
    }

    const fetchCustomers = async () => {
        try {
            const customersResponse = await chatApi.fetchAllChats()
            const uniqueSenders = Array.from(new Set(customersResponse.map((chat: { sender: string, id: string }) => chat.sender)))

            const formattedCustomers = uniqueSenders.map(sender => ({
                id: sender as string,
                name: (sender as string)?.split('@')[0]
            }))

            setCustomers(formattedCustomers.length > 0 ? formattedCustomers : mockData())
        } catch (error) {
            console.error('Error fetching customers:', error)
        }
    }

    const mockData = () => ([
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Doe' }
    ])

    const sendMessage = async () => {
        if (message.trim() && selectedUserId) {
            const chatMessage: APICreateChatRequest = {
                sender: 'admin',
                text: message,
                userId: selectedUserId
            }
            // Optimistically update the messages
            const newMessage = { ...chatMessage, userId: selectedUserId }
            setMessages((prevMessages) => [...prevMessages, newMessage])

            // Send the message to the backend
            await chatApi.createChatMessage(chatMessage)
            setMessage('') // Clear the input field
        }
    }

    const handleSelectCustomer = (customerId: string) => {
        setSelectedUserId(customerId)
        setMessages([]) // Clear messages when selecting a new customer
        fetchChatHistory(customerId) // Fetch history when a new customer is selected
    }

    return (
        <div className={`fixed bottom-0 right-0 ${isOpen ? 'h-fit' : 'h-12'} w-64 bg-white shadow-lg transition-all duration-300 rounded-lg overflow-hidden`}>
            <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
                <span className="font-bold text-lg">Admin Chat</span>
                <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-800 hover:bg-blue-700 px-2 py-1 rounded">
                    {isOpen ? 'Close' : 'Open'}
                </button>
            </div>
            {isOpen && (
                <div className="flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                        <h4 className="font-bold text-gray-800">Select Customer:</h4>
                        <ul className="mt-2 space-y-2">
                            {customers.map((customer) => (
                                <li key={customer.id}>
                                    <button
                                        onClick={() => handleSelectCustomer(customer.id)}
                                        className={`block w-full text-left p-2 rounded transition-colors ${selectedUserId === customer.id ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                                    >
                                        {customer.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-white">
                        <div className="space-y-2">
                            {messages.map((msg, index) => (
                                <div key={index} className={`mb-1 p-2 rounded ${msg.sender === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                    <strong>{msg.sender.charAt(0).toUpperCase() + msg.sender.slice(1)}:</strong> {msg.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-gray-100 flex items-center gap-4">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage} className="w-24 bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition-colors">
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminChat
