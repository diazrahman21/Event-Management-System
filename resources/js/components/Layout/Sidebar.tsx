import { Link } from '@inertiajs/react';

const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: 'dashboard' },
    { name: 'Events', href: 'events.index', icon: 'calendar' },
    { name: 'Clients', href: 'clients.index', icon: 'users' },
];

export default function Sidebar({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: any }) {
    const getIcon = (icon: string) => {
        const icons: { [key: string]: string } = {
            dashboard: '📊',
            calendar: '📅',
            users: '👥',
        };
        return icons[icon] || '•';
    };

    return (
        <>
            {/* Fixed sidebar for desktop */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:relative lg:z-0 lg:transform-none ${
                isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex items-center justify-between border-b border-gray-700 px-4 py-4">
                        <Link href={route('dashboard')} className="text-xl font-bold">
                            EMS
                        </Link>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded p-1 hover:bg-gray-800 lg:hidden"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={route(item.href)}
                                className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                                <span className="mr-3 text-lg">{getIcon(item.icon)}</span>
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* User section */}
                    <div className="border-t border-gray-700 px-4 py-4">
                        <div className="mb-4 flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                                {user.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs text-gray-400">
                                    {user.roles?.[0]?.name
                                        ? user.roles[0].name.charAt(0).toUpperCase() + user.roles[0].name.slice(1)
                                        : 'User'}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
