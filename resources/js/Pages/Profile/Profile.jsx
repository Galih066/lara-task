import { Head, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import Navigation from "@/Layouts/Navigation";
import ErrorAlert from "@/Components/AlertComp/ErrorAlert";
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Profile({ user, errors = {}, success }) {
    const [data, setData] = useState({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        birth_date: user.birth_date || '',
        gender: user.gender || '',
        job_title: user.job_title || '',
        department: user.department || '',
        employee_id: user.employee_id || '',
        join_date: user.join_date || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        postal_code: user.postal_code || '',
        emergency_contact_name: user.emergency_contact_name || '',
        emergency_contact_relation: user.emergency_contact_relation || '',
        emergency_contact_phone: user.emergency_contact_phone || '',
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (section, e) => {
        e.preventDefault();
        
        const endpoints = {
            personal: '/profile/update/personal',
            work: '/profile/update/work',
            contact: '/profile/update/contact',
            emergency: '/profile/update/emergency',
            password: '/profile/update/password',
        };

        const sectionData = {
            personal: ['name', 'email', 'phone', 'birth_date', 'gender'],
            work: ['job_title', 'department', 'employee_id', 'join_date'],
            contact: ['address', 'city', 'state', 'country', 'postal_code'],
            emergency: ['emergency_contact_name', 'emergency_contact_relation', 'emergency_contact_phone'],
            password: ['current_password', 'password', 'password_confirmation'],
        };

        const formData = {};
        sectionData[section].forEach(field => {
            formData[field] = data[field];
        });

        router.post(endpoints[section], formData);
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

                <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">Profile Settings</h1>
                        <p className="mt-2 text-gray-500">Manage your account information and preferences.</p>
                    </motion.div>

                    {errors.update && (
                        <ErrorAlert
                            title="Update Failed"
                            description={errors.update}
                            duration={5000}
                            onClose={() => delete errors.update}
                        />
                    )}

                    {/* Profile Preview Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-6 backdrop-blur-sm bg-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            {/* Profile Image */}
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-xl bg-gradient-to-r from-blue-500/10 to-sky-500/10 flex items-center justify-center text-2xl font-semibold text-blue-600">
                                    {data.name.charAt(0).toUpperCase()}
                                </div>
                                <button
                                    type="button"
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">{data.name}</h2>
                                        <p className="text-gray-500">{data.job_title || 'No job title set'}</p>
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
                                
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-sm font-medium text-gray-900">{data.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="text-sm font-medium text-gray-900">{data.phone || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {[data.city, data.state, data.country].filter(Boolean).join(', ') || 'Not set'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Employee ID</p>
                                        <p className="text-sm font-medium text-gray-900">{data.employee_id || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Join Date</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {data.join_date ? new Date(data.join_date).toLocaleDateString() : 'Not set'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 space-y-6"
                    >
                        <form onSubmit={(e) => handleSubmit('personal', e)} className="space-y-8">
                            {/* Personal Information Section */}
                            <div className="backdrop-blur-sm bg-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
                                {renderSection("Personal Information", "Your basic personal information",
                                    <>
                                        {renderField("Full Name", "name", "text", true)}
                                        {renderField("Email Address", "email", "email", true)}
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
                                                className="mt-1 block w-full px-4 py-2.5 text-gray-700 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </>
                                )}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Save Personal Information
                                    </button>
                                </div>
                            </div>
                        </form>

                        <form onSubmit={(e) => handleSubmit('work', e)} className="space-y-8">
                            {/* Work Information Section */}
                            <div className="backdrop-blur-sm bg-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
                                {renderSection("Work Information", "Your employment details",
                                    <>
                                        {renderField("Job Title", "job_title")}
                                        {renderField("Department", "department")}
                                        {renderField("Employee ID", "employee_id")}
                                        {renderField("Join Date", "join_date", "date")}
                                    </>
                                )}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Save Work Information
                                    </button>
                                </div>
                            </div>
                        </form>

                        <form onSubmit={(e) => handleSubmit('contact', e)} className="space-y-8">
                            {/* Contact Information Section */}
                            <div className="backdrop-blur-sm bg-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
                                {renderSection("Contact Information", "Your address and contact details",
                                    <>
                                        {renderField("Address", "address")}
                                        {renderField("City", "city")}
                                        {renderField("State/Province", "state")}
                                        {renderField("Country", "country")}
                                        {renderField("Postal Code", "postal_code")}
                                    </>
                                )}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Save Contact Information
                                    </button>
                                </div>
                            </div>
                        </form>

                        <form onSubmit={(e) => handleSubmit('emergency', e)} className="space-y-8">
                            {/* Emergency Contact Section */}
                            <div className="backdrop-blur-sm bg-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
                                {renderSection("Emergency Contact", "Contact person in case of emergency",
                                    <>
                                        {renderField("Contact Name", "emergency_contact_name")}
                                        {renderField("Relationship", "emergency_contact_relation")}
                                        {renderField("Contact Phone", "emergency_contact_phone", "tel")}
                                    </>
                                )}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Save Emergency Contact
                                    </button>
                                </div>
                            </div>
                        </form>

                        <form onSubmit={(e) => handleSubmit('password', e)} className="space-y-8">
                            {/* Password Section */}
                            <div className="backdrop-blur-sm bg-white/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
                                {renderSection("Change Password", "Update your account password",
                                    <>
                                        {renderField("Current Password", "current_password", "password")}
                                        {renderField("New Password", "password", "password")}
                                        {renderField("Confirm New Password", "password_confirmation", "password")}
                                    </>
                                )}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
