import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            {/* Panel izquierdo - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-12 flex-col justify-between">
                <div>
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/asset/sketch3dlab-small.png" alt="Logo" className="w-12 h-12 rounded-xl" />
                        <span className="text-2xl font-bold text-white">Sketch3Dlab</span>
                    </Link>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-white leading-tight">
                        Tu biblioteca de archivos CAD y modelos 3D
                    </h1>
                    <p className="text-primary-100 text-lg">
                        Accede a miles de archivos CAD, planos y modelos 3D para tus proyectos de ingeniería y arquitectura.
                    </p>
                    <div className="flex gap-8 pt-4">
                        <div>
                            <div className="text-3xl font-bold text-white">500+</div>
                            <div className="text-primary-200 text-sm">Archivos CAD</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">9</div>
                            <div className="text-primary-200 text-sm">Categorías</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">100%</div>
                            <div className="text-primary-200 text-sm">Gratis</div>
                        </div>
                    </div>
                </div>



                <div className="text-primary-200 text-sm">
                    © 2024 Sketch3Dlab. Todos los derechos reservados.
                </div>
            </div>

            {/* Panel derecho - Formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Logo móvil */}
                    <div className="lg:hidden mb-8 text-center">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <img src="/asset/sketch3dlab-small.png" alt="Logo" className="w-10 h-10 rounded-xl" />
                            <span className="text-xl font-bold text-gray-900">Sketch3Dlab</span>
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
