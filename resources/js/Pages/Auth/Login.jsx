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
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {errorsLogin.login && 
                        <ErrorAlert 
                            title="Login Failed" 
                            description={errorsLogin.login}
                            duration={7000}
                            onClose={() => delete errorsLogin.login}
                        />
                    }
                    <form onSubmit={handleSubmit} method="POST" className="space-y-6 mt-3">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    className="block w-full rounded-sm border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={e => setData('email', e.target.value)}
                                />
                            </div>
                            {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    className="block w-full rounded-sm border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={e => setData('password', e.target.value)}
                                />
                            </div>
                            {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-sm bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={processing}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have organization yet?&nbsp;
                        <Link href="/signup-org" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Create organization here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}