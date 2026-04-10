import { ReactNode, useState } from 'react';
import { Link } from '@inertiajs/react';
import Sidebar from './Sidebar';

export default function AppLayout({ children, user }: { children: ReactNode; user: any }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} />

            {/* Main content */}
            <div className="flex w-full flex-col overflow-hidden lg:ml-64">
                {/* Header */}
                <header className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 lg:hidden"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">
                                Welcome, {user.name}
                            </span>
                            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto">
                    <div className="px-4 py-8 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
