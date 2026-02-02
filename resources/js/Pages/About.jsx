import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function About() {
    const team = [
        { name: 'Juan Rodriguez', role: 'Fundador & CEO', avatar: null },
        { name: 'Maria Garcia', role: 'Directora de Tecnologia', avatar: null },
        { name: 'Carlos Martinez', role: 'Disenador Principal', avatar: null },
        { name: 'Ana Lopez', role: 'Community Manager', avatar: null },
    ];

    return (
        <MainLayout>
            <Head title="Acerca de" />

            {/* Hero */}
            <div className="bg-zinc-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Acerca de <span className="text-yellow-400">3DCAD</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        La plataforma lider para compartir y descargar modelos 3D CAD de alta calidad.
                    </p>
                </div>
            </div>

            {/* Mission */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Mision</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    En 3DCAD creemos que el conocimiento debe ser accesible para todos.
                                    Nuestra mision es crear la biblioteca mas completa de modelos 3D CAD,
                                    donde ingenieros, arquitectos y disenadores puedan compartir su trabajo
                                    y aprender de otros.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Desde nuestra fundacion en 2020, hemos ayudado a miles de profesionales
                                    a encontrar los modelos que necesitan para sus proyectos, ahorrando
                                    tiempo y recursos valiosos.
                                </p>
                            </div>
                            <div className="bg-gray-100 rounded-2xl p-8">
                                <div className="grid grid-cols-2 gap-6 text-center">
                                    <div>
                                        <div className="text-4xl font-bold text-yellow-500 mb-2">10K+</div>
                                        <div className="text-gray-600">Archivos</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-yellow-500 mb-2">5K+</div>
                                        <div className="text-gray-600">Usuarios</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-yellow-500 mb-2">50+</div>
                                        <div className="text-gray-600">Categorias</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-yellow-500 mb-2">100K+</div>
                                        <div className="text-gray-600">Descargas</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nuestros Valores</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Comunidad</h3>
                            <p className="text-gray-600">
                                Creemos en el poder de la comunidad para impulsar la innovacion y el aprendizaje.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Calidad</h3>
                            <p className="text-gray-600">
                                Nos comprometemos a mantener altos estandares de calidad en todos nuestros modelos.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Accesibilidad</h3>
                            <p className="text-gray-600">
                                Hacemos que los recursos 3D sean accesibles para profesionales de todo el mundo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Nuestro Equipo</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Un equipo apasionado por la tecnologia y el diseno 3D
                    </p>
                    <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {team.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl font-bold text-zinc-900">
                                        {member.name.charAt(0)}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Unete a la Comunidad</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Se parte de miles de profesionales que comparten y descargan modelos 3D todos los dias.
                    </p>
                    <a
                        href="/register"
                        className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-8 py-3 rounded-lg font-bold text-lg transition-all hover:shadow-lg"
                    >
                        Crear Cuenta Gratis
                    </a>
                </div>
            </section>
        </MainLayout>
    );
}
