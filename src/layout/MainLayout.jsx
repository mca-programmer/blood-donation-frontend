import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';


export default function MainLayout(){
return (
<div className="min-h-screen flex flex-col">
<Navbar />
<main className="flex-1 container mx-auto p-4">
<Outlet />
</main>
<Footer />
</div>
);
}