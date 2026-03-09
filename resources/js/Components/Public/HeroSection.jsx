import { Link } from '@inertiajs/react';
import { getTotalFiles, getTotalSubcategories, typesData } from '@/data/categories';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, OrbitControls } from '@react-three/drei';

function MechanicalPart() {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2;
            groupRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Base Cylinder */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[2, 2, 0.5, 32]} />
                <meshStandardMaterial color="#27272a" transparent opacity={0.9} />
                <Edges scale={1} threshold={15} color="#fbbf24" />
            </mesh>

            {/* Inner hole */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.8, 0.8, 0.52, 32]} />
                <meshStandardMaterial color="#18181b" />
                <Edges scale={1} threshold={15} color="#3b82f6" />
            </mesh>

            {/* Gear Teeth */}
            {Array.from({ length: 16 }).map((_, index) => {
                const angle = (index / 16) * Math.PI * 2;
                const radius = 2.05;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                    <mesh key={index} position={[x, y, 0]} rotation={[0, 0, angle]}>
                        <boxGeometry args={[0.4, 0.4, 0.5]} />
                        <meshStandardMaterial color="#27272a" />
                        <Edges scale={1} threshold={15} color="#fbbf24" />
                    </mesh>
                );
            })}

            {/* Central Shaft */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 3, 16]} />
                <meshStandardMaterial color="#27272a" />
                <Edges scale={1} threshold={15} color="#3b82f6" />
            </mesh>
            
            {/* Side rings */}
            <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.8, 0.1, 16, 32]} />
                <meshStandardMaterial color="#27272a" />
                <Edges scale={1} threshold={15} color="#fbbf24" />
            </mesh>
            <mesh position={[0, 0, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.8, 0.1, 16, 32]} />
                <meshStandardMaterial color="#27272a" />
                <Edges scale={1} threshold={15} color="#fbbf24" />
            </mesh>

            {/* Connectors */}
            {Array.from({ length: 4 }).map((_, index) => {
                const angle = (index / 4) * Math.PI * 2;
                return (
                    <mesh key={`conn-${index}`} position={[Math.cos(angle)*0.55, Math.sin(angle)*0.55, 0]} rotation={[0, 0, angle]}>
                        <boxGeometry args={[0.5, 0.1, 0.4]} />
                        <meshStandardMaterial color="#27272a" />
                        <Edges scale={1} threshold={15} color="#60a5fa" />
                    </mesh>
                );
            })}
        </group>
    );
}

export default function HeroSection() {
    const totalFiles = getTotalFiles();
    const totalSubcategories = getTotalSubcategories();

    return (
        <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                            Comparte y Descarga
                            <span className="block text-white">Archivos 3D CAD y Planos</span>
                        </h1>
                        <p className="text-lg text-primary-100 mb-8 leading-relaxed max-w-2xl">
                            La plataforma más completa para compartir modelos 3D y planos técnicos.
                            Encuentra archivos de mecánica, arquitectura, instalaciones MEP y más.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="/3d"
                                className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-400 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1 shadow-primary-900/20"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Explorar 3D
                            </Link>
                            <Link
                                href="/planos"
                                className="inline-flex items-center justify-center gap-2 bg-secondary-500 hover:bg-secondary-400 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1 shadow-secondary-900/20"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Ver Planos
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{totalFiles}</div>
                                <div className="text-sm text-primary-200">Archivos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{totalSubcategories}</div>
                                <div className="text-sm text-primary-200">Subcategorías</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{typesData.types.length}</div>
                                <div className="text-sm text-primary-200">Tipos</div>
                            </div>
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="flex-1 relative">
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-full cursor-grab active:cursor-grabbing font-sans">
                                    <Canvas camera={{ position: [4, 4, 5], fov: 45 }}>
                                        <ambientLight intensity={0.5} />
                                        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                                        <directionalLight position={[-10, 10, -10]} intensity={1} color="#3b82f6" />
                                        
                                        <MechanicalPart />
                                        
                                        <OrbitControls 
                                            enableZoom={false} 
                                            autoRotate={true}
                                            autoRotateSpeed={1.5}
                                        />
                                    </Canvas>
                                </div>
                                <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                                    <p className="text-primary-100 text-xs font-mono bg-primary-900/80 inline-block px-4 py-2 rounded-full backdrop-blur-md border border-primary-700 shadow-xl">
                                        <span className="text-secondary-400 mr-2">●</span> Modelo CAD Interactivo
                                    </p>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-500 rounded-xl shadow-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">3D</span>
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-secondary-500 rounded-xl shadow-lg flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
