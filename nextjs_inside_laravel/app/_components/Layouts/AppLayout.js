"use client";
import Navigation from '@/app/_components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { Suspense } from 'react';

const AppLayout = ({ header=null, children }) => {

    return (
        <div className="min-h-screen bg-gray-100">
            <Suspense>
            <Navigation />
            </Suspense>
            {/* Page Heading */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
