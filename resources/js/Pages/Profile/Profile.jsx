import { useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import Navigation from "@/Layouts/Navigation";
import ErrorAlert from "@/Components/AlertComp/ErrorAlert";
import SuccessAlert from "@/Components/AlertComp/SuccessAlert";

export default function Profile({ user }) {
    const [profileData, setProfileData] = useState(user);
    console.log(profileData);
    const { profile } = profileData
    const [showSuccess, setShowSuccess] = useState(false);
    const { errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        birth_date: profile.birth_date || '',
        gender: profile.gender || '',
        job_title: profile.job_title || '',
        department: profile.department || '',
        join_date: profile.join_date || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        country: profile.country || '',
        postal_code: profile.postal_code || '',
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
            onSuccess: (response) => {
                setShowSuccess(true);
                // Update the profile data with the latest response
                if (response?.props?.user) {
                    setProfileData(response.props.user);
                }
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

                {errors.update && (
                    <ErrorAlert
                        title="Update Failed"
                        description={errors.update}
                        onClose={() => delete errors.update}
                    />
                )}

                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Profile Header */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
                        {/* Cover Image */}
                        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>

                        <div className="p-6">
                            <div className="sm:flex sm:items-center sm:justify-between">
                                <div className="sm:flex sm:space-x-5">
                                    {/* Profile Image */}
                                    <div className="-mt-16 relative">
                                        <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl bg-white flex items-center justify-center text-2xl md:text-3xl font-semibold text-blue-600 border-4 border-white shadow-md relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-sky-500/10"></div>
                                            <span className="relative z-10">{profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}</span>
                                        </div>
                                    </div>
                                    {/* Basic Info */}
                                    <div className="mt-4 sm:mt-0 text-center sm:pt-1 sm:text-left">
                                        <p className="text-sm text-gray-500">Welcome back,</p>
                                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                            {
                                                profile.first_name && profile.last_name
                                                    ? `${profile.first_name} ${profile.last_name}`
                                                    : profileData.name
                                            }
                                        </h2>
                                        <p className="text-sm font-medium text-gray-600">
                                            {profileData.job_title || 'No job title set'} {profileData.department && `at ${data.department}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5 flex justify-center sm:mt-0">
                                    <div className="flex flex-wrap gap-2">
                                        {
                                            profile.is_active === 1
                                                ? (<span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-green-50 text-green-700">
                                                    <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                                                    Active Employee
                                                </span>)
                                                : (<span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-red-50 text-red-700">
                                                    <span className="w-2 h-2 rounded-full bg-red-400 mr-2"></span>
                                                    Inactive Employee
                                                </span>)
                                        }
                                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700">
                                            {profile.department || 'No department'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Info Grid */}
                            <div className="mt-8 grid grid-cols-1 gap-6 divide-y divide-gray-200 md:grid-cols-3 md:gap-8 md:divide-y-0">
                                {/* Contact Details */}
                                <div className="pt-6 md:pt-0">
                                    <div className="flex items-center text-gray-500 text-sm font-medium">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Contact Information
                                    </div>
                                    <div className="mt-3 space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="mt-1 text-sm font-medium text-gray-900">{profileData.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="mt-1 text-sm font-medium text-gray-900">{profile.phone || 'Not set'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Location</p>
                                            <p className="mt-1 text-sm font-medium text-gray-900">
                                                {[profile.address, profile.city, profile.state, profile.country].filter(Boolean).join(', ') || 'Not set'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Details */}
                                <div className="pt-6 md:pt-0">
                                    <div className="flex items-center text-gray-500 text-sm font-medium">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Personal Details
                                    </div>
                                    <div className="mt-3 space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Birth Date</p>
                                            <p className="mt-1 text-sm font-medium text-gray-900">
                                                {profile.birth_date ? new Date(profile.birth_date).toLocaleDateString() : 'Not set'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Gender</p>
                                            <p className="mt-1 text-sm font-medium text-gray-900">
                                                {profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : 'Not set'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Work Details */}
                                <div className="pt-6 md:pt-0">
                                    <div className="flex items-center text-gray-500 text-sm font-medium">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Work Details
                                    </div>
                                    <div className="mt-3 space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Department</p>
                                            <p className="mt-1 text-sm font-medium text-gray-900">{profile.department || 'Not set'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Join Date</p>
                                            <p className="mt-1 text-sm font-medium text-gray-900">
                                                {profile.join_date ? new Date(profile.join_date).toLocaleDateString() : 'Not set'}
                                            </p>
                                        </div>
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
                                                    value={profile.gender}
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
