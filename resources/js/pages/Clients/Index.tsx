import AppLayout from '@/components/Layout/AppLayout';
import { Link } from '@inertiajs/react';

export default function ClientsIndex({ auth, clients }: { auth: { user: any }; clients: any }) {
    return (
        <AppLayout user={auth.user}>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Clients</h1>
                    <Link href={route('clients.create')} className="bg-blue-600 text-white px-4 py-2 rounded">
                        + New Client
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold">Name</th>
                                <th className="px-6 py-3 text-left font-semibold">Email</th>
                                <th className="px-6 py-3 text-left font-semibold">Phone</th>
                                <th className="px-6 py-3 text-left font-semibold">Company</th>
                                <th className="px-6 py-3 text-right font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {clients?.data?.map((client: any) => (
                                <tr key={client.id}>
                                    <td className="px-6 py-4">{client.name}</td>
                                    <td className="px-6 py-4">{client.email}</td>
                                    <td className="px-6 py-4">{client.phone || '-'}</td>
                                    <td className="px-6 py-4">{client.company || '-'}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link href={route('clients.show', client.id)} className="text-blue-600">View</Link>
                                        <Link href={route('clients.edit', client.id)} className="text-yellow-600">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
