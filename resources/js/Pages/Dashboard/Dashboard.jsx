import { Head } from "@inertiajs/react"

const DashboardPage = () => {
    return (
        <>
            <Head title="Dashboard" />
            <header class="bg-gray-900 text-white py-4">
                <div class="container mx-auto flex items-center justify-between px-4">

                    <div class="flex items-center space-x-4">

                        <div class="bg-indigo-500 w-8 h-8 rounded-full"></div>

                        <nav class="hidden md:flex space-x-4">
                            <a href="#" class="text-white font-semibold">Dashboard</a>
                            <a href="#" class="text-gray-300 hover:text-white">Team</a>
                            <a href="#" class="text-gray-300 hover:text-white">Projects</a>
                            <a href="#" class="text-gray-300 hover:text-white">Calendar</a>
                            <a href="#" class="text-gray-300 hover:text-white">Reports</a>
                        </nav>
                    </div>

                    <div class="flex items-center space-x-4">
                        <button class="text-gray-300 hover:text-white md:hidden">

                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <button class="hidden md:block text-gray-300 hover:text-white">

                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2a7 7 0 00-7 7v5H3v2h18v-2h-2V9a7 7 0 00-7-7zM5 16v-6a7 7 0 1114 0v6h-4v2h-6v-2H5z" />
                            </svg>
                        </button>
                        <img src="https://via.placeholder.com/32" alt="Profile" class="w-8 h-8 rounded-full" />
                    </div>
                </div>
            </header>


            <main class="container mx-auto py-8 px-4">
                <h1 class="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
                <div class="bg-white rounded-lg shadow-md p-8">
                    <div class="border-2 border-dashed border-gray-300 h-64 bg-gray-50 flex items-center justify-center">

                        <div class="text-gray-400 text-center">Content goes here</div>
                    </div>
                </div>
            </main>

            <nav class="md:hidden bg-gray-800 text-white px-4 py-2 fixed bottom-0 w-full flex justify-around">
                <a href="#" class="flex flex-col items-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span class="text-xs">Dashboard</span>
                </a>
                <a href="#" class="flex flex-col items-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a7 7 0 00-7 7v5H3v2h18v-2h-2V9a7 7 0 00-7-7zM5 16v-6a7 7 0 1114 0v6h-4v2h-6v-2H5z" />
                    </svg>
                    <span class="text-xs">Team</span>
                </a>
                <a href="#" class="flex flex-col items-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a7 7 0 00-7 7v5H3v2h18v-2h-2V9a7 7 0 00-7-7zM5 16v-6a7 7 0 1114 0v6h-4v2h-6v-2H5z" />
                    </svg>
                    <span class="text-xs">Projects</span>
                </a>
                <a href="#" class="flex flex-col items-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a7 7 0 00-7 7v5H3v2h18v-2h-2V9a7 7 0 00-7-7zM5 16v-6a7 7 0 1114 0v6h-4v2h-6v-2H5z" />
                    </svg>
                    <span class="text-xs">Calendar</span>
                </a>
                <a href="#" class="flex flex-col items-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a7 7 0 00-7 7v5H3v2h18v-2h-2V9a7 7 0 00-7-7zM5 16v-6a7 7 0 1114 0v6h-4v2h-6v-2H5z" />
                    </svg>
                    <span class="text-xs">Reports</span>
                </a>
            </nav>
        </>
    )
}

export default DashboardPage