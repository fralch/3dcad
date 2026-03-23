import { Link, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
    const { sharedTypes, auth } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = (slug) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setActiveDropdown(slug);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 2000);
    };

    return (
        <header className="bg-primary-900 text-white sticky top-0 z-50 shadow-md shadow-primary-900/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-4">
                        <img src="/asset/sketch3dlab-small.png" alt="Logo" className="w-16 h-16 rounded-lg" />
                        <span className="text-3xl font-bold text-white">Sketch3Dlab</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        <Link href="/" className="px-4 py-2 text-primary-100 hover:text-white transition-colors font-medium">
                            Inicio
                        </Link>

                        {/* Types Dropdowns */}
                        {sharedTypes.map((type) => (
                            <div
                                key={type.id}
                                className="relative"
                                onMouseEnter={() => handleMouseEnter(type.slug)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="flex items-center gap-1 px-4 py-2 text-primary-100 hover:text-white transition-colors font-medium">
                                    {type.name}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {activeDropdown === type.slug && (
                                    <div className="absolute top-full left-0 w-80 bg-primary-800 rounded-lg shadow-xl py-2 mt-1 border border-primary-700">
                                        {type.categories.map((category) => (
                                            <div key={category.id} className="px-2">
                                                <Link
                                                    href={`/${type.slug}/${category.slug}`}
                                                    className="block px-3 py-2 text-xs font-semibold text-secondary-400 uppercase tracking-wider hover:bg-primary-700 rounded"
                                                >
                                                    {category.name}
                                                </Link>
                                                {category.subcategories.map((subcategory) => (
                                                    <Link
                                                        key={subcategory.id}
                                                        href={`/${type.slug}/${category.slug}/${subcategory.slug}`}
                                                        className="flex items-center justify-between px-3 py-2 text-primary-200 hover:bg-primary-700 hover:text-white rounded transition-colors ml-2"
                                                    >
                                                        <span>{subcategory.name}</span>
                                                        <span className="text-xs bg-primary-700 text-primary-300 px-2 py-0.5 rounded-full">
                                                            {subcategory.files_count || 0}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        ))}
                                        <div className="border-t border-primary-700 mt-2 pt-2 px-2">
                                            <Link
                                                href={`/${type.slug}`}
                                                className="flex items-center justify-center gap-2 px-3 py-2 text-secondary-400 hover:bg-primary-700 rounded transition-colors font-medium"
                                            >
                                                Ver todo {type.name}
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <Link href="/about" className="px-4 py-2 text-primary-100 hover:text-white transition-colors font-medium">
                            Acerca de
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Button */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 text-primary-100 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Upload Button */}
                        <Link
                            href="/upload"
                            className="hidden sm:flex items-center gap-2 bg-secondary-500 hover:bg-secondary-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg shadow-secondary-900/20"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Subir
                        </Link>

                        {/* Login/User */}
                        {auth?.user ? (
                            <div
                                className="relative"
                                onMouseEnter={() => handleMouseEnter('user')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="p-1 text-primary-100 hover:text-white transition-colors flex items-center gap-2">
                                    <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md">
                                        {auth.user.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                </button>

                                {/* User Dropdown */}
                                {activeDropdown === 'user' && (
                                    <div className="absolute top-full right-0 w-48 bg-primary-800 rounded-lg shadow-xl py-2 mt-1 border border-primary-700">
                                        <div className="px-4 py-2 border-b border-primary-700 mb-1">
                                            <p className="text-sm font-medium text-white truncate">{auth.user.name}</p>
                                            <p className="text-xs text-primary-300 truncate">{auth.user.email}</p>
                                        </div>
                                        <Link
                                            href={route('admin.dashboard')}
                                            className="block px-4 py-2 text-sm text-primary-100 hover:bg-primary-700 hover:text-white transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-primary-700 hover:text-red-300 transition-colors"
                                        >
                                            Cerrar Sesión
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="p-2 text-primary-100 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 text-primary-100 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                {isSearchOpen && (
                    <div className="py-4 border-t border-primary-700">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar archivos 3D, planos..."
                                className="w-full bg-primary-800 border border-primary-700 rounded-lg py-3 px-4 pl-12 text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent"
                            />
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="lg:hidden py-4 border-t border-primary-700 max-h-[70vh] overflow-y-auto">
                        <div className="flex flex-col gap-1">
                            <Link href="/" className="px-4 py-2 text-primary-100 hover:text-white hover:bg-primary-800 rounded-lg transition-colors">
                                Inicio
                            </Link>

                            {sharedTypes.map((type) => (
                                <div key={type.id}>
                                    <Link
                                        href={`/${type.slug}`}
                                        className="px-4 py-2 text-secondary-400 font-semibold text-sm uppercase tracking-wider mt-2 block hover:bg-primary-800 rounded-lg"
                                    >
                                        {type.name}
                                    </Link>
                                    {type.categories.map((category) => (
                                        <div key={category.id}>
                                            <Link
                                                href={`/${type.slug}/${category.slug}`}
                                                className="px-4 py-1 text-primary-400 text-xs uppercase block hover:text-secondary-400"
                                            >
                                                {category.name}
                                            </Link>
                                            {category.subcategories.map((subcategory) => (
                                                <Link
                                                    key={subcategory.id}
                                                    href={`/${type.slug}/${category.slug}/${subcategory.slug}`}
                                                    className="flex items-center justify-between px-6 py-2 text-primary-200 hover:text-white hover:bg-primary-800 rounded-lg transition-colors"
                                                >
                                                    <span>{subcategory.name}</span>
                                                    <span className="text-xs text-primary-500">{subcategory.files_count || 0}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}

                            <Link href="/about" className="px-4 py-2 text-primary-100 hover:text-white hover:bg-primary-800 rounded-lg transition-colors mt-2">
                                Acerca de
                            </Link>

                            {auth?.user ? (
                                <>
                                    <div className="mx-4 mt-4 pt-4 border-t border-primary-700">
                                        <p className="text-sm font-medium text-white truncate">{auth.user.name}</p>
                                        <p className="text-xs text-primary-300 truncate mb-2">{auth.user.email}</p>
                                        
                                        <Link
                                            href={route('admin.dashboard')}
                                            className="block py-2 text-sm text-primary-100 hover:text-white transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full text-left py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            Cerrar Sesión
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="mx-4 mt-4 block text-center px-4 py-2 text-primary-100 border border-primary-700 hover:bg-primary-800 hover:text-white rounded-lg transition-colors"
                                >
                                    Iniciar Sesión
                                </Link>
                            )}

                            <Link
                                href="/upload"
                                className="mx-4 mt-4 flex items-center justify-center gap-2 bg-secondary-500 hover:bg-secondary-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Subir Archivo
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
