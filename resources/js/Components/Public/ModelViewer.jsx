import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, useGLTF, Html, Stage } from '@react-three/drei';

function Model({ url }) {
    const { scene } = useGLTF(url);
    // clone the scene to avoid mutations, though usually fine.
    return <primitive object={scene} />;
}

export default function ModelViewer({ url, thumbnail }) {
    return (
        <div className="w-full h-full relative bg-gray-100 overflow-hidden group">
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Suspense
                    fallback={
                        <Html center>
                            {thumbnail ? (
                                <img
                                    src={thumbnail}
                                    alt="Loading..."
                                    className="w-full h-full object-cover blur-sm opacity-50"
                                />
                            ) : (
                                <div className="text-gray-400 font-medium">Cargando 3D...</div>
                            )}
                        </Html>
                    }
                >
                    <Stage environment="city" intensity={0.6}>
                        <Model url={url} />
                    </Stage>
                </Suspense>
                <OrbitControls autoRotate autoRotateSpeed={2} enablePan={true} makeDefault />
            </Canvas>
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                3D Interactivo (Arrastra para girar)
            </div>
        </div>
    );
}

// Preload the specific model if possible, though since the URL is dynamic we don't call it globally here.
