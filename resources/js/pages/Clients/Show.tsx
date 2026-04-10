import AppLayout from '../../Components/Layout/AppLayout';
import { Link } from '@inertiajs/react';
import StatusBadge from '../../Components/StatusBadge';

export default function ShowClient({ auth, client }: { auth: { user: any }; client: any }) {
    return (
        <AppLayout user={auth.user}>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{client.name}</h1>
                    <Link href={route('clients.edit', client.id)} className="bg-yellow-600 text-white px-4 py-2 rounded">
                        Edit
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="text-lg font-semibold">{client.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="text-lg font-semibold">{client.phone || '-'}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-gray-600">Company</p>
                            <p className="text-lg font-semibold">{client.company || '-'}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Associated Events</h2>
                    {client.events && client.events.length > 0 ? (
                        <table className="w-full text-sm">
                            <tbody className="divide-y">
                                {client.events.map((event: any) => (
                                    <tr key={event.id}>
                                        <td className="px-4 py-2">{event.title}</td>
                                        <td className="px-4 py-2">{new Date(event.start_date).toLocaleDateString('id-ID')}</td>
                                        <td className="px-4 py-2"><StatusBadge status={event.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-600">No events associated</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
