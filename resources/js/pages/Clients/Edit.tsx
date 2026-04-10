import AppLayout from '@/components/Layout/AppLayout';
import { useForm } from '@inertiajs/react';

export default function EditClient({ auth, client }: { auth: { user: any }; client: any }) {
    const { data, setData, put, processing, errors } = useForm({
        name: client.name,
        email: client.email,
        phone: client.phone || '',
        company: client.company || '',
        notes: client.notes || '',
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        put(route('clients.update', client.id));
    };

    return (
        <AppLayout user={auth.user}>
            <div className="max-w-2xl">
                <h1 className="mb-6 text-3xl font-bold">Edit Client</h1>
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name *</label>
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full border rounded px-3 py-2" />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email *</label>
                        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full border rounded px-3 py-2" />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Company</label>
                        <input type="text" value={data.company} onChange={(e) => setData('company', e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
                            {processing ? 'Updating...' : 'Update Client'}
                        </button>
                        <a href={route('clients.show', client.id)} className="border rounded px-4 py-2">Cancel</a>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
