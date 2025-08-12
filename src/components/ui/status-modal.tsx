import { Order } from '@/types'
import React from 'react'
import Modal from 'react-modal'

interface StatusModalProps {
    isOpen: boolean
    onClose: () => void
    order: Order | null
    newStatus: string
    setNewStatus: (status: string) => void
    onStatusChange: (e: React.FormEvent<HTMLFormElement>) => void
}

const StatusModal: React.FC<StatusModalProps> = ({
    isOpen,
    onClose,
    order,
    newStatus,
    setNewStatus,
    onStatusChange,
}) => {
    const statuses = ['Pending', 'Cooking', 'Finished', 'Cancelled']

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-6"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <h2 className="text-lg font-semibold mb-4 text-center">
                Change Status for Order #{order?.OrderID}
            </h2>
            <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Status
                </label>
                <select
                    id="status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 text-sm"
                >
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700 transition-colors duration-200"
                    onClick={(e) => onStatusChange(e as unknown as React.FormEvent<HTMLFormElement>)}
                >
                    Update Status
                </button>
                <button
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    )
}

export default StatusModal
