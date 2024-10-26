import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useToast } from "../../Components/ToastComp/ToastContext";

export default function SignUpOrg() {
    const { errors } = usePage().props
    const { addToast } = useToast()
    const { data, setData, post, processing } = useForm({
        org_name: "",
        username: "",
        email: "",
        password: "",
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        post('/sent-org', {
            preserveScroll: true,
            onSuccess: () => addToast('Successfully added organization', 'green')
        })
    }

    return (
        <>
            <Head title="Sign up Organization" />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your organization
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                        <div className="mb-1">
                            <label htmlFor="org_name" className="block text-sm font-medium leading-6 text-gray-900">
                                Organization Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="org_name"
                                    name="org_name"
                                    type="text"
                                    value={data.org_name}
                                    className="block w-full rounded-sm border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={e => setData('org_name', e.target.value)}
                                />
                            </div>
                            {errors.org_name && <span className="text-sm text-red-500">{errors.org_name}</span>}
                        </div>

                        <div className="mb-1">
                            <div className="flex items-center justify-between">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                            </div>
                            <div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={data.username}
                                    className="block w-full rounded-sm border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={e => setData('username', e.target.value)}
                                />
                            </div>
                            {errors.username && <span className="text-sm text-red-500">{errors.username}</span>}
                        </div>

                        <div className="mb-1">
                            <div className="flex items-center justify-between">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                            </div>
                            <div>
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

                        <div className="mb-1">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div>
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
                                disabled={processing}
                                className="flex w-full justify-center rounded-sm bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create Organization
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have account?&nbsp;
                        <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Back to login page
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}