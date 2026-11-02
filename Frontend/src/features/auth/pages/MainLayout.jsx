import { Navbar } from './Navbar';


export const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f3efe7] text-[#292d29]">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};