import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function FilePreviewModal({ isOpen, onClose, file }) {
    if (!file) return null;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                    <div>
                                        <Dialog.Title className="text-xl font-bold text-gray-900">
                                            {file.title}
                                        </Dialog.Title>
                                        <p className="text-sm text-gray-500 mt-1">
                                            por {file.author} en {file.category}
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Preview Area */}
                                <div className="flex flex-col md:flex-row">
                                    {/* 3D Preview */}
                                    <div className="flex-1 bg-gray-100 aspect-video md:aspect-auto md:min-h-[400px] flex items-center justify-center">
                                        {file.thumbnail ? (
                                            <img
                                                src={file.thumbnail}
                                                alt={file.title}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        ) : (
                                            <div className="text-center p-8">
                                                <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                </svg>
                                                <p className="text-gray-400">Vista previa 3D no disponible</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info Sidebar */}
                                    <div className="w-full md:w-80 p-6 border-l border-gray-100">
                                        {/* File Info */}
                                        <div className="space-y-4 mb-6">
                                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-500">Formato</span>
                                                <span className="font-medium text-gray-900">{file.format}</span>
                                            </div>
                                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-500">Tamano</span>
                                                <span className="font-medium text-gray-900">{file.size || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-500">Descargas</span>
                                                <span className="font-medium text-gray-900">{file.downloads}</span>
                                            </div>
                                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-500">Likes</span>
                                                <span className="font-medium text-gray-900">{file.likes}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="space-y-3">
                                            <button className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 py-3 rounded-lg font-bold transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Descargar
                                            </button>
                                            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-600 py-3 rounded-lg font-medium transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                Agregar a Favoritos
                                            </button>
                                        </div>

                                        {/* Share */}
                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <p className="text-sm font-medium text-gray-700 mb-3">Compartir</p>
                                            <div className="flex gap-2">
                                                <button className="flex-1 p-2 bg-social-twitter hover:brightness-105 text-white rounded-lg transition-all">
                                                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                                    </svg>
                                                </button>
                                                <button className="flex-1 p-2 bg-social-facebook hover:brightness-105 text-white rounded-lg transition-all">
                                                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                    </svg>
                                                </button>
                                                <button className="flex-1 p-2 bg-gray-600 hover:brightness-105 text-white rounded-lg transition-all">
                                                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
