import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
