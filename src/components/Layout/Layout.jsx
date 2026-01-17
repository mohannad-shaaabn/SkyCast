import React from 'react';
import Navbar from './../Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './../Footer/Footer';

export default function Layout() {
  const location = useLocation();

  // نتحقق إذا الصفحة الحالية هي Contact
  const hideFooter = location.pathname === '/contact'; // ضع path الصحيح لصفحة Contact

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-grow'>
        <Outlet />
      </div>

      {/* إذا الصفحة ليست Contact نعرض Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
}
