import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import SuccessAlert from "@/Components/AlertComp/SuccessAlert";
import Navigation from "@/Layouts/Navigation";
import MemberHeader from "@/Components/Member/MemberHeader";
import MemberFilters from "@/Components/Member/MemberFilters";
import MemberTable from "@/Components/Member/MemberTable";
import AddMemberModal from "@/Components/Member/AddMemberModal";

const MemberPage = ({ user, members }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isEntering, setIsEntering] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, setData, post, reset } = useForm({
        username: '',
        email: '',
        role: 'member',
        department: '',
        phone: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        post('member/add-member', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
                setShowSuccess(true);
                setIsSubmitting(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            }
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
        requestAnimationFrame(() => {
            setIsEntering(true);
        });
    };

    const closeModal = () => {
        setIsClosing(true);
        setIsEntering(false);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosing(false);
        }, 300);
    };

    const filteredMembers = members.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = selectedRole === 'all' || member.role.toLowerCase() === selectedRole.toLowerCase();
        return matchesSearch && matchesRole;
    });

    return (
        <>
            <Head title="Members" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
                <Navigation user={user} />
                {showSuccess && (
                    <SuccessAlert
                        title="Member Added"
                        message="New member has been successfully added."
                        onClose={() => setShowSuccess(false)}
                    />
                )}
                <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
                    <MemberHeader onAddMember={openModal} />
                    <MemberFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedRole={selectedRole}
                        setSelectedRole={setSelectedRole}
                    />
                    <MemberTable members={filteredMembers} />
                    <AddMemberModal
                        isModalOpen={isModalOpen}
                        isEntering={isEntering}
                        closeModal={closeModal}
                        data={data}
                        setData={setData}
                        errors={errors}
                        isSubmitting={isSubmitting}
                        handleSubmit={handleSubmit}
                    />
                </main>
            </div>
        </>
    );
};

export default MemberPage;