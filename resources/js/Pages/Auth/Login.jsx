import { Head, Link, useForm, usePage } from "@inertiajs/react"
import ErrorAlert from "../../Components/AlertComp/ErrorAlert"

export default function Login() {
    const { errors } = usePage().props
    const { data, setData, post, processing, errors: errorsLogin } = useForm({
        email: "",
        password: ""
    })
    const handleSubmit = (event) => {
        event.preventDefault()
        post('/sent-login', {
            preserveScroll: true,
        })
    }

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                    {/* Logo/Brand */}
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-400 to-sky-500 rounded-xl flex items-center justify-center">
                            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Error Alert */}
                    {errorsLogin.login && 
                        <ErrorAlert 
                            title="Login Failed" 
                            description={errorsLogin.login}
                            duration={7000}
                            onClose={() => delete errorsLogin.login}
                        />
                    }

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} method="POST" className="mt-8 space-y-6">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        className="pl-10 block w-full rounded-lg border-gray-300 bg-blue-50/50 py-3 text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-150 ease-in-out"
                                        placeholder="you@example.com"
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        className="pl-10 block w-full rounded-lg border-gray-300 bg-blue-50/50 py-3 text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-150 ease-in-out"
                                        placeholder="••••••••"
                                        onChange={e => setData('password', e.target.value)}
                                    />
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : null}
                                {processing ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">New to the platform?</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/signup-org"
                                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out"
                            >
                                Create a new organization
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}