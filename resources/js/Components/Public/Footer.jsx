import { Link } from '@inertiajs/react';
import { typesData, getTotalFiles } from '@/data/categories';

export default function Footer() {
    return (
        <footer className="bg-primary-900 text-primary-100 pt-16 pb-8 border-t border-primary-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/asset/sketch3dlab-small.png" alt="Logo" className="w-10 h-10 rounded-lg" />
                            <span className="text-xl font-bold text-white">Sketch3Dlab</span>
                        </Link>
                        <p className="text-sm leading-relaxed text-primary-200">
                            La mejor plataforma para compartir y descargar archivos 3D CAD y planos técnicos.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-social-twitter hover:bg-[#0c85d0] rounded-lg flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-social-facebook hover:bg-[#2d4373] rounded-lg flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Types Links */}
                    {typesData.types.map((type) => (
                        <div key={type.id}>
                            <h4 className="text-white font-semibold mb-4">{type.name}</h4>
                            <ul className="space-y-3">
                                {type.categories.map((category) => (
                                    <li key={category.id}>
                                        <Link
                                            href={`/${type.slug}/${category.slug}`}
                                            className="text-xs text-primary-400 uppercase hover:text-secondary-400 transition-colors"
                                        >
                                            {category.name}
                                        </Link>
                                        <ul className="mt-1 space-y-1">
                                            {category.subcategories.slice(0, 3).map((sub) => (
                                                <li key={sub.id}>
                                                    <Link
                                                        href={`/${type.slug}/${category.slug}/${sub.slug}`}
                                                        className="text-sm hover:text-secondary-400 transition-colors"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contacto</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                contacto@sketch3dlab.com
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Lima, Perú
                            </li>
                        </ul>

                        <div className="mt-6 p-4 bg-primary-800 rounded-lg border border-primary-700">
                            <div className="text-2xl font-bold text-secondary-400">{getTotalFiles()}</div>
                            <div className="text-sm text-primary-300">Archivos disponibles</div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-primary-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-primary-400">
                        &copy; {new Date().getFullYear()} Sketch3Dlab. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy" className="hover:text-secondary-400 transition-colors">Privacidad</Link>
                        <Link href="/terms" className="hover:text-secondary-400 transition-colors">Términos</Link>
                        <Link href="/about" className="hover:text-secondary-400 transition-colors">Acerca de</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
