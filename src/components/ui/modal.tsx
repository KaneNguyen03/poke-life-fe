import React from 'react'
import Modal from 'react-modal'
import { cn } from '@/utils/cn'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    showCloseButton?: boolean
    className?: string
    overlayClassName?: string
    closeOnBackdropClick?: boolean
}

export const CustomModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true,
    className = '',
    overlayClassName = '',
    closeOnBackdropClick = true
}) => {
    const defaultClassName = 'bg-white rounded-xl shadow-2xl max-w-lg mx-auto p-0 transform transition-all duration-300 ease-out'
    const defaultOverlayClassName = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={closeOnBackdropClick}
            ariaHideApp={false}
            className={cn(defaultClassName, className)}
            overlayClassName={cn(defaultOverlayClassName, overlayClassName)}
        >
            {title && (
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-xl">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">{title}</h2>
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                                aria-label="Close modal"
                            >
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            )}
            {!title && showCloseButton && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-10 hover:bg-opacity-20 transition-all duration-200"
                    aria-label="Close modal"
                >
                    <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
            <div className={title ? '' : 'p-6'}>
                {children}
            </div>
        </Modal>
    )
}
