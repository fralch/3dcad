import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children, title }) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: HomeIcon },
        { name: 'Archivos', href: '/admin/files', icon: FileIcon },
        { name: 'Subir Archivo', href: '/admin/files/upload', icon: UploadIcon },
        { name: 'Tipos', href: '/admin/types', icon: CubeIcon },
        { name: 'Categorías', href: '/admin/categories', icon: FolderIcon },
        { name: 'Subcategorías', href: '/admin/subcategories', icon: TagIcon },
    ];

    const isActive = (href) => {
        if (href === '/admin') return url === '/admin';
        return url.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-zinc-900 text-white z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                            <span className="text-zinc-900 font-bold text-sm">3D</span>
                        </div>
                        <span className="font-bold text-lg">Admin</span>
                    </Link>
                    {/* Close button - mobile only */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive(item.href)
                                    ? 'bg-yellow-400 text-zinc-900'
                                    : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                            }`}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span className="truncate">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* Back to site */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800 bg-zinc-900">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 flex-shrink-0" />
                        <span>Volver al sitio</span>
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Header */}
                <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
                    <div className="flex items-center gap-4">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            <MenuIcon className="w-6 h-6" />
                        </button>
                        <h1 className="text-lg lg:text-xl font-semibold text-gray-900 truncate">{title}</h1>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-4">
                        <span className="hidden sm:block text-sm text-gray-500">Admin</span>
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-zinc-900 font-bold text-xs">A</span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

// Icons
function HomeIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    );
}

function CubeIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    );
}

function FolderIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
    );
}

function TagIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
    );
}

function ArrowLeftIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    );
}

function UploadIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
    );
}

function FileIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
}

function MenuIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
}

function XIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}
