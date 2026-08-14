import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from './Navbar';


export const MainLayout = ({children}) => {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};