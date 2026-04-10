import AppLayout from '../Components/Layout/AppLayout';
import { Link } from '@inertiajs/react';
import StatusBadge from '../Components/StatusBadge';

export default function Dashboard({
    auth,
    stats,
    upcomingEvents,
}: {
    auth: { user: any };
    stats: {
        totalEvents: number;
        planningCount: number;
        ongoingCount: number;
        completedCount: number;
        totalBudget: number;
        totalActual: number;
    };
    upcomingEvents: any[];
}) {
    return (
        <AppLayout user={auth.user}>
            <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <dt className="text-sm font-medium text-gray-500">Total Events</dt>
                        <dd className="mt-2 text-3xl font-bold text-gray-900">{stats.totalEvents}</dd>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <dt className="text-sm font-medium text-gray-500">Planning</dt>
                        <dd className="mt-2 text-3xl font-bold text-amber-600">{stats.planningCount}</dd>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <dt className="text-sm font-medium text-gray-500">Ongoing</dt>
                        <dd className="mt-2 text-3xl font-bold text-blue-600">{stats.ongoingCount}</dd>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <dt className="text-sm font-medium text-gray-500">Completed</dt>
                        <dd className="mt-2 text-3xl font-bold text-green-600">{stats.completedCount}</dd>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <dt className="text-sm font-medium text-gray-500">Over Budget</dt>
                        <dd className="mt-2 text-sm text-gray-900">
                            Rp {stats.totalActual.toLocaleString('id-ID')} / Rp {stats.totalBudget.toLocaleString('id-ID')}
                        </dd>
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200 px-6 py-4 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">Upcoming Events (Next 7 Days)</h2>
                        </div>
                        <div className="mt-3 sm:ml-4 sm:mt-0">
                            <Link
                                href={route('events.index')}
                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                View All Events
                            </Link>
                        </div>
                    </div>

                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Event
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Start Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event: any) => (
                                    <tr key={event.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            {event.title}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                            {new Date(event.start_date).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            <StatusBadge status={event.status} />
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <Link
                                                href={route('events.show', event.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-600">
                                        No upcoming events
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
