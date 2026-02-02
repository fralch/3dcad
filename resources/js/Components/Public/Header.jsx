import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className="bg-zinc-900 text-white sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold">
                            <span className="text-yellow-400">3D</span>CAD
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
                            Inicio
                        </Link>
                        <Link href="/categories" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
                            Categorias
                        </Link>
                        <Link href="/files" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
                            Archivos
                        </Link>
                        <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
                            Acerca de
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Button */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Upload Button */}
                        <Link
                            href="/upload"
                            className="hidden sm:flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Subir
                        </Link>

                        {/* Login/User */}
                        <Link
                            href="/login"
                            className="p-2 text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-300 hover:text-yellow-400 transition-colors"
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
                    <div className="py-4 border-t border-zinc-700">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar archivos 3D, categorias..."
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 pl-12 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            />
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-zinc-700">
                        <div className="flex flex-col gap-2">
                            <Link href="/" className="px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-zinc-800 rounded-lg transition-colors">
                                Inicio
                            </Link>
                            <Link href="/categories" className="px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-zinc-800 rounded-lg transition-colors">
                                Categorias
                            </Link>
                            <Link href="/files" className="px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-zinc-800 rounded-lg transition-colors">
                                Archivos
                            </Link>
                            <Link href="/about" className="px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-zinc-800 rounded-lg transition-colors">
                                Acerca de
                            </Link>
                            <Link
                                href="/upload"
                                className="mx-4 mt-2 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-4 py-2 rounded-lg font-semibold transition-colors"
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
