import { Navbar } from './Navbar';


export const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f] text-slate-100">
      <Navbar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};