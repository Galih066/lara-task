import { Head, Link, useForm, usePage } from "@inertiajs/react"
import ErrorAlert from "../../Components/AlertComp/ErrorAlert"

export default function Login() {
    const { errors } = usePage().props
    const { data, setData, post, processing, errors: errorsLogin } = useForm({
        email: "",
        password: "",
        remember: false
    })
    const canResetPassword = true

    const handleSubmit = (event) => {
        event.preventDefault()
        post('/sent-login', {
            preserveScroll: true,
        })
    }

    return (
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
                        <h2 className="text-2xl font-medium text-gray-900 animate-fade-in">Welcome Back</h2>
                        <p className="text-sm text-gray-500">
                            Sign in to your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="block w-full px-4 py-2.5 text-gray-700 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                                        autoComplete="username"
                                        onChange={e => setData('email', e.target.value)}
                                        required
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="block w-full px-4 py-2.5 text-gray-700 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                                        autoComplete="current-password"
                                        onChange={e => setData('password', e.target.value)}
                                        required
                                    />
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        id="remember"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                        className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500/20"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                {canResetPassword && (
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-blue-500 hover:text-blue-600 transition-colors duration-200"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
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
                                {processing ? 'Signing in...' : 'Sign in'}
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white/60 text-gray-500 backdrop-blur-sm">
                                        Don't have an account?
                                    </span>
                                </div>
                            </div>

                            <Link
                                href="/signup-org"
                                className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-white/70 border border-gray-200 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/20"
                            >
                                Create new account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}