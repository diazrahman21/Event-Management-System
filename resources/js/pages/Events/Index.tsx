import AppLayout from '../../Components/Layout/AppLayout';
import { Link } from '@inertiajs/react';
import StatusBadge from '../../Components/StatusBadge';
import { useMemo } from 'react';

export default function EventsIndex({
    auth,
    events,
    filters,
}: {
    auth: { user: any };
    events: any;
    filters: any;
}) {
    const statusCounts = useMemo(() => {
        const counts = { planning: 0, ongoing: 0, selesai: 0 };
        if (events?.data) {
            events.data.forEach((event: any) => {
                if (counts.hasOwnProperty(event.status)) {
                    counts[event.status as keyof typeof counts]++;
                }
            });
        }
        return counts;
    }, [events?.data]);

    return (
        <AppLayout user={auth.user}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Events</h1>
                    {auth.user.roles.some((r: any) => r.name === 'admin') && (
                        <Link
                            href={route('events.create')}
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            + New Event
                        </Link>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-white p-4 shadow">
                        <dt className="text-sm font-medium text-gray-500">Planning</dt>
                        <dd className="mt-1 text-2xl font-bold text-amber-600">{statusCounts.planning}</dd>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow">
                        <dt className="text-sm font-medium text-gray-500">Ongoing</dt>
                        <dd className="mt-1 text-2xl font-bold text-blue-600">{statusCounts.ongoing}</dd>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow">
                        <dt className="text-sm font-medium text-gray-500">Completed</dt>
                        <dd className="mt-1 text-2xl font-bold text-green-600">{statusCounts.selesai}</dd>
                    </div>
                </div>

                {/* Events Table */}
                <div className="rounded-lg bg-white shadow">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Event
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Start Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Clients
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Budget
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {events?.data?.length > 0 ? (
                                events.data.map((event: any) => (
                                    <tr key={event.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            {event.title}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                            {event.location || '-'}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                            {new Date(event.start_date).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            <StatusBadge status={event.status} />
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                            {event.client_count}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                            Rp {event.budget.toLocaleString('id-ID')}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <Link
                                                href={route('events.show', event.id)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                View
                                            </Link>
                                            {auth.user.roles.some((r: any) => r.name === 'admin') && (
                                                <>
                                                    <Link
                                                        href={route('events.edit', event.id)}
                                                        className="text-yellow-600 hover:text-yellow-900 mr-4"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Are you sure?')) {
                                                                router.delete(route('events.destroy', event.id));
                                                            }
                                                        }}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-600">
                                        No events found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {events.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing {events.from} to {events.to} of {events.total} events
                        </div>
                        <div className="space-x-2">
                            {events.current_page > 1 && (
                                <Link
                                    href={events.prev_page_url}
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {events.current_page < events.last_page && (
                                <Link
                                    href={events.next_page_url}
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
