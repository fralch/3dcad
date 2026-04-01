import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function CamionesLayout({ children, title }) {
    const { url, props } = usePage();
    const user = props.auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard Camiones', href: '/admin/camiones', icon: TruckIcon },
    ];

    const isActive = (href) => {
        return url.startsWith(href);
    };

    const handleLogout = () => {
        if (user) {
            router.post(route('logout'));
            return;
        }

        router.post(route('admin.camiones.access.logout'));
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
                        <img src="/asset/sketch3dlab-small.png" alt="Logo" className="w-8 h-8 rounded-lg" />
                        <span className="font-bold text-lg">Sketch3Dlab Admin</span>
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
                                    ? 'bg-primary-400 text-zinc-900'
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

                    {/* User menu */}
                    <Menu as="div" className="relative">
                        <Menu.Button className="flex items-center gap-2 lg:gap-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                            <span className="hidden sm:block text-sm text-gray-700">{user?.name || 'Acceso camiones'}</span>
                            <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center">
                                <span className="text-zinc-900 font-bold text-xs">
                                    {user?.name?.charAt(0).toUpperCase() || 'C'}
                                </span>
                            </div>
                            <ChevronDownIcon className="w-4 h-4 text-gray-500 hidden sm:block" />
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black/5 focus:outline-none py-1">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-900">{user?.name || 'Acceso camiones'}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email || 'Sesión protegida por PIN'}</p>
                                </div>

                                {user && (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href={route('admin.profile.edit')}
                                                className={`${active ? 'bg-gray-50' : ''} flex items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                                            >
                                                <UserIcon className="w-4 h-4" />
                                                Mi Perfil
                                            </Link>
                                        )}
                                    </Menu.Item>
                                )}

                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={handleLogout}
                                            className={`${active ? 'bg-gray-50' : ''} flex items-center gap-2 px-4 py-2 text-sm text-red-600 w-full`}
                                        >
                                            <LogoutIcon className="w-4 h-4" />
                                            {user ? 'Cerrar Sesión' : 'Cerrar acceso'}
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
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
function TruckIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17h6m-8 0a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0zM7 17V7h8v10m0 0h2a2 2 0 002-2v-3.586a1 1 0 00-.293-.707L16.414 8.414A1 1 0 0015.707 8H15" />
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

function ChevronDownIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );
}

function UserIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

function LogoutIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
