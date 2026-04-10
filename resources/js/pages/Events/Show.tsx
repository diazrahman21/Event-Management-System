import AppLayout from '../../Components/Layout/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import StatusBadge from '../../Components/StatusBadge';
import BudgetProgressBar from '../../Components/BudgetProgressBar';
import { useState } from 'react';

export default function ShowEvent({
    auth,
    event,
    can,
}: {
    auth: { user: any };
    event: any;
    can: {
        update: boolean;
        delete: boolean;
        updateStatus: boolean;
    };
}) {
    const [activeTab, setActiveTab] = useState<'info' | 'timeline' | 'budget'>('info');
    const [statusDropdown, setStatusDropdown] = useState(false);
    const { patch } = useForm();

    const handleStatusChange = (newStatus: string) => {
        patch(route('events.updateStatus', event.id), {
            status: newStatus,
        });
        setStatusDropdown(false);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(route('events.destroy', event.id));
        }
    };

    return (
        <AppLayout user={auth.user}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
                        <p className="mt-1 text-gray-600">{event.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {can.updateStatus && (
                            <div className="relative">
                                <button
                                    onClick={() => setStatusDropdown(!statusDropdown)}
                                    className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                >
                                    Status: <StatusBadge status={event.status} />
                                </button>
                                {statusDropdown && (
                                    <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg">
                                        {['planning', 'ongoing', 'selesai'].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusChange(status)}
                                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                            >
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {can.update && (
                            <Link
                                href={route('events.edit', event.id)}
                                className="rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700"
                            >
                                Edit
                            </Link>
                        )}

                        {can.delete && (
                            <button
                                onClick={handleDelete}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-white p-4 shadow">
                        <dt className="text-sm font-medium text-gray-500">Location</dt>
                        <dd className="mt-1 text-lg font-semibold text-gray-900">{event.location || '-'}</dd>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow">
                        <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                            {new Date(event.start_date).toLocaleDateString('id-ID')}
                        </dd>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow">
                        <dt className="text-sm font-medium text-gray-500">End Date</dt>
                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                            {new Date(event.end_date).toLocaleDateString('id-ID')}
                        </dd>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow">
                        <dt className="text-sm font-medium text-gray-500">Created By</dt>
                        <dd className="mt-1 text-lg font-semibold text-gray-900">{event.created_by}</dd>
                    </div>
                </div>

                {/* Tabs */}
                <div className="rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6" aria-label="Tabs">
                            {(['info', 'timeline', 'budget'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`border-b-2 px-1 py-4 text-sm font-medium ${
                                        activeTab === tab
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab === 'info' && 'Clients'}
                                    {tab === 'timeline' && 'Timeline'}
                                    {tab === 'budget' && 'Budget'}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {/* Clients Tab */}
                        {activeTab === 'info' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Associated Clients</h3>
                                {event.clients.length > 0 ? (
                                    <ul className="space-y-2">
                                        {event.clients.map((client: any) => (
                                            <li key={client.id} className="flex items-center text-gray-700">
                                                • {client.name}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600">No clients associated</p>
                                )}
                            </div>
                        )}

                        {/* Timeline Tab */}
                        {activeTab === 'timeline' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Timeline</h3>
                                {event.timelines && event.timelines.length > 0 ? (
                                    <div className="space-y-4">
                                        {event.timelines.map((timeline: any, idx: number) => (
                                            <div key={timeline.id} className="border-l-4 border-blue-500 pl-4">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{idx + 1}. {timeline.title}</h4>
                                                        <p className="mt-1 text-sm text-gray-600">{timeline.description}</p>
                                                    </div>
                                                    <StatusBadge status={timeline.status} />
                                                </div>
                                                <div className="mt-2 flex gap-4 text-sm text-gray-600">
                                                    <span>Due: {new Date(timeline.due_date).toLocaleDateString('id-ID')}</span>
                                                    {timeline.assigned_to && <span>Assigned: {timeline.assigned_to}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No timeline tasks</p>
                                )}
                            </div>
                        )}

                        {/* Budget Tab */}
                        {activeTab === 'budget' && event.budget && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
                                <div className="mb-6">
                                    <BudgetProgressBar 
                                        planned={event.budget.total_planned} 
                                        actual={event.budget.total_actual}
                                    />
                                </div>

                                <h4 className="text-md font-semibold text-gray-900 mb-3">Budget Items</h4>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Category</th>
                                            <th className="px-4 py-2 text-right font-semibold text-gray-700">Planned</th>
                                            <th className="px-4 py-2 text-right font-semibold text-gray-700">Actual</th>
                                            <th className="px-4 py-2 text-center font-semibold text-gray-700">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {event.budget.items.map((item: any) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-2">{item.category}</td>
                                                <td className="px-4 py-2 text-right">
                                                    Rp {item.planned_amount.toLocaleString('id-ID')}
                                                </td>
                                                <td className={`px-4 py-2 text-right ${
                                                    item.actual_amount > item.planned_amount ? 'text-red-600' : ''
                                                }`}>
                                                    Rp {item.actual_amount.toLocaleString('id-ID')}
                                                </td>
                                                <td className="px-4 py-2 text-center">
                                                    <StatusBadge status={item.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
