import AppLayout from '../../Components/Layout/AppLayout';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function CreateEvent({
    auth,
    clients,
}: {
    auth: { user: any };
    clients: any[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        location: '',
        start_date: '',
        end_date: '',
        client_ids: [] as string[],
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('events.store'));
    };

    const toggleClient = (clientId: string) => {
        setData('client_ids', 
            data.client_ids.includes(clientId)
                ? data.client_ids.filter(id => id !== clientId)
                : [...data.client_ids, clientId]
        );
    };

    return (
        <AppLayout user={auth.user}>
            <div className="max-w-2xl">
                <h1 className="mb-6 text-3xl font-bold text-gray-900">Create Event</h1>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Event Title *</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                                errors.title ? 'border-red-300' : 'border-gray-300'
                            }`}
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                            <input
                                type="datetime-local"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                                    errors.start_date ? 'border-red-300' : 'border-gray-300'
                                }`}
                            />
                            {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Date *</label>
                            <input
                                type="datetime-local"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                                    errors.end_date ? 'border-red-300' : 'border-gray-300'
                                }`}
                            />
                            {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>}
                        </div>
                    </div>

                    {/* Clients */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Clients</label>
                        <div className="mt-3 space-y-2">
                            {clients.map((client) => (
                                <label key={client.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.client_ids.includes(client.id)}
                                        onChange={() => toggleClient(client.id)}
                                        className="rounded border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{client.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create Event'}
                        </button>
                        <a
                            href={route('events.index')}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
