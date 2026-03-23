import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { stats = {}, sharedTypes = [] } = usePage().props;
    const totalFiles = stats.totalFiles ?? 0;

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
                            <a href="https://www.youtube.com/channel/UCc_QbMMhi8i9wKU8mDs6SKA" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#FF0000] hover:bg-[#CC0000] rounded-lg flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.086 0 12 0 12s0 3.914.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.914 24 12 24 12s0-3.914-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                            <a href="https://web.facebook.com/profile.php?id=61577418326548" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-social-facebook hover:bg-[#2d4373] rounded-lg flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="https://www.tiktok.com/@sketch3dlab" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#000000] hover:bg-[#333333] rounded-lg flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Types Links */}
                    {sharedTypes.map((type) => (
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
                            
                        </ul>

                        <div className="mt-6 p-4 bg-primary-800 rounded-lg border border-primary-700">
                            <div className="text-2xl font-bold text-secondary-400">{totalFiles}</div>
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
