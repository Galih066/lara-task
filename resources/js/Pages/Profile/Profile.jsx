import { useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import Navigation from "@/Layouts/Navigation";
import ErrorAlert from "@/Components/AlertComp/ErrorAlert";
import SuccessAlert from "@/Components/AlertComp/SuccessAlert";

export default function Profile({ user }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const { errors } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        birth_date: user.birth_date || '',
        gender: user.gender || '',
        job_title: user.job_title || '',
        department: user.department || '',
        join_date: user.join_date || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        postal_code: user.postal_code || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (section, e) => {
        e.preventDefault();

        const endpoints = {
            personal: '/profile/update/personal',
            work: '/profile/update/work',
            contact: '/profile/update/contact',
        };

        const sectionData = {
            personal: ['first_name', 'last_name', 'phone', 'birth_date', 'gender'],
            work: ['job_title', 'department', 'join_date'],
            contact: ['address', 'city', 'state', 'country', 'postal_code'],
        };

        const formData = {};
        sectionData[section].forEach(field => {
            formData[field] = data[field];
        });

        post(endpoints[section], {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
            },
            onError: () => {
                setShowSuccess(false);
            }
        });
    };

    const renderField = (label, id, type = "text", required = false) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                value={data[id]}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2.5 text-gray-700 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                disabled={processing}
            />
            {errors[id] && <p className="mt-1 text-sm text-red-500">{errors[id]}</p>}
        </div>
    );

    const renderSection = (title, description, children) => (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    );

    return (
        <>
            <Head title="Profile" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 animate-gradient-x">
                <Navigation user={user} />
                
                {showSuccess && (
                    <SuccessAlert
                        title="Profile Updated"
                        message="Your profile has been successfully updated."
                        onClose={() => setShowSuccess(false)}
                    />
                )}

                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {errors.update && (
                        <ErrorAlert
                            title="Update Failed"
                            description={errors.update}
                            onClose={() => delete errors.update}
                        />
                    )}

                    {/* Profile Header */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Profile Image */}
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-xl bg-gradient-to-r from-blue-500/10 to-sky-500/10 flex items-center justify-center text-2xl font-semibold text-blue-600">
                                    {data.first_name ? data.first_name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-900">
                                            {data.first_name} {data.last_name}
                                        </h2>
                                        <p className="text-gray-600">{data.job_title || 'No job title set'}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-50 text-blue-700">
                                            <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                                            Active
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700">
                                            {data.department || 'No department'}
                                        </span>
                                    </div>
                                </div>

                                {/* Quick Info Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="text-sm font-medium text-gray-900">{data.phone || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Join Date</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {data.join_date ? new Date(data.join_date).toLocaleDateString() : 'Not set'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {data.city && data.country ? `${data.city}, ${data.country}` : 'Not set'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Forms Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Personal Information Form */}
                            <form onSubmit={(e) => handleSubmit('personal', e)} className="bg-white rounded-xl shadow-sm">
                                <div className="p-6">
                                    {renderSection("Personal Information", "Your basic personal information",
                                        <>
                                            {renderField("First Name", "first_name", "text", true)}
                                            {renderField("Last Name", "last_name", "text", true)}
                                            {renderField("Phone Number", "phone", "tel")}
                                            {renderField("Date of Birth", "birth_date", "date")}
                                            <div>
                                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                                    Gender
                                                </label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    value={data.gender}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full px-4 py-2.5 text-gray-700 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Personal Information'}
                                    </button>
                                </div>
                            </form>

                            {/* Work Information Form */}
                            <form onSubmit={(e) => handleSubmit('work', e)} className="bg-white rounded-xl shadow-sm">
                                <div className="p-6">
                                    {renderSection("Work Information", "Your employment details",
                                        <>
                                            {renderField("Job Title", "job_title")}
                                            {renderField("Department", "department")}
                                            {renderField("Join Date", "join_date", "date")}
                                        </>
                                    )}
                                </div>
                                <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Work Information'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Contact Information Form */}
                            <form onSubmit={(e) => handleSubmit('contact', e)} className="bg-white rounded-xl shadow-sm">
                                <div className="p-6">
                                    {renderSection("Contact Information", "Your contact and address details",
                                        <>
                                            {renderField("Address", "address")}
                                            {renderField("City", "city")}
                                            {renderField("State/Province", "state")}
                                            {renderField("Country", "country")}
                                            {renderField("Postal Code", "postal_code")}
                                        </>
                                    )}
                                </div>
                                <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Contact Information'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
