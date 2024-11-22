import { Head, Link, useForm, usePage } from "@inertiajs/react";
import ErrorAlert from "../../Components/AlertComp/ErrorAlert";
import SuccessAlert from "../../Components/AlertComp/SuccessAlert";
import { useState } from "react";

export default function SignUpOrg() {
    const { errors } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(false);
    
    const { data, setData, post, processing } = useForm({
        org_name: "",
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/sent-org', {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccess(true);
                setData({
                    org_name: "",
                    username: "",
                    email: "",
                    password: "",
                });
            }
        });
    };

    return (
        <>
            <Head title="Sign up Organization" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 flex items-center justify-center p-6 animate-gradient-x">
                <div className="w-full max-w-md">
                    <div className="backdrop-blur-sm bg-white/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 space-y-8">
                        {/* Logo/Brand */}
                        <div className="text-center space-y-2">
                            <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500/10 to-sky-500/10 rounded-xl flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-medium text-gray-900 animate-fade-in">Create Organization</h2>
                            <p className="text-sm text-gray-500">
                                Set up your organization and get started
                            </p>
                        </div>

                        {/* Success Alert */}
                        {showSuccess && (
                            <SuccessAlert
                                title="Organization Created"
                                description="Your organization has been successfully created. You can now log in."
                                duration={7000}
                                onClose={() => setShowSuccess(false)}
                            />
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                            <div className="space-y-5">
                                <div className="group">
                                    <label htmlFor="org_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Organization Name
                                    </label>
                                    <input
                                        id="org_name"
                                        name="org_name"
                                        type="text"
                                        value={data.org_name}
                                        className="block w-full rounded-lg border border-gray-200 bg-white/70 px-4 py-2.5 text-gray-700 transition duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-gray-300 group-hover:border-gray-300"
                                        placeholder="Your Organization Name"
                                        onChange={e => setData('org_name', e.target.value)}
                                    />
                                    {errors.org_name && <p className="mt-1 text-sm text-red-500 animate-shake">{errors.org_name}</p>}
                                </div>

                                <div className="group">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={data.username}
                                        className="block w-full rounded-lg border border-gray-200 bg-white/70 px-4 py-2.5 text-gray-700 transition duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-gray-300 group-hover:border-gray-300"
                                        placeholder="Choose a username"
                                        onChange={e => setData('username', e.target.value)}
                                    />
                                    {errors.username && <p className="mt-1 text-sm text-red-500 animate-shake">{errors.username}</p>}
                                </div>

                                <div className="group">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        className="block w-full rounded-lg border border-gray-200 bg-white/70 px-4 py-2.5 text-gray-700 transition duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-gray-300 group-hover:border-gray-300"
                                        placeholder="you@example.com"
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-500 animate-shake">{errors.email}</p>}
                                </div>

                                <div className="group">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        className="block w-full rounded-lg border border-gray-200 bg-white/70 px-4 py-2.5 text-gray-700 transition duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-gray-300 group-hover:border-gray-300"
                                        placeholder="••••••••"
                                        onChange={e => setData('password', e.target.value)}
                                    />
                                    {errors.password && <p className="mt-1 text-sm text-red-500 animate-shake">{errors.password}</p>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="relative w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                                >
                                    {processing ? (
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    {processing ? 'Creating Organization...' : 'Create Organization'}
                                </button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white/60 text-gray-500 backdrop-blur-sm">
                                            Already have an account?
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href="/"
                                    className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-white/70 border border-gray-200 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/20"
                                >
                                    Back to login page
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes gradient-x {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-2px); }
                    75% { transform: translateX(2px); }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 15s ease infinite;
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
            `}</style>
        </>
    );
}