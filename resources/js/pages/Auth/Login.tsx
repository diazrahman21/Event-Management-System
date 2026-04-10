import { useForm } from '@inertiajs/react';
import { FormEvent, FormHTMLAttributes } from 'react';

export default function Login({
    status,
}: {
    status?: string;
} & FormHTMLAttributes<HTMLFormElement>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Event Management System
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to your account
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {status && (
                        <div className="rounded-md bg-blue-50 p-4">
                            <p className="text-center text-sm font-medium text-blue-800">
                                {status}
                            </p>
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.currentTarget.value)}
                            required
                            autoComplete="email"
                            className={`relative block w-full appearance-none rounded-none rounded-t-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                                errors.email ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Email address"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.currentTarget.value)}
                            required
                            autoComplete="current-password"
                            className={`relative block w-full appearance-none rounded-none rounded-b-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                                errors.password ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Password"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {processing ? 'Signing in...' : 'Sign in'}
                    </button>

                    <div className="text-center text-sm">
                        <p className="text-gray-600">
                            Demo Credentials:
                        </p>
                        <p className="mt-1 text-gray-500">
                            Admin: <code className="font-mono">admin@demo.com</code> / <code className="font-mono">password</code>
                        </p>
                        <p className="text-gray-500">
                            Staff: <code className="font-mono">staff@demo.com</code> / <code className="font-mono">password</code>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
