import Header from '@/Components/Public/Header';
import Footer from '@/Components/Public/Footer';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
