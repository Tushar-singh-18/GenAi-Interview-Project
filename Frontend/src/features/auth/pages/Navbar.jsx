import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';


export const Navbar = () => {
  const { user, handlelogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handlelogout();
    navigate('/login');
  };

  return (
    <header className="border-b border-white/10 bg-[#0a0a0f]">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          aria-label="GenAi interview workspace home"
          className="group flex items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-300"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-sm font-semibold tracking-tight text-white transition-colors group-hover:bg-white/[0.08]">
            G
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold leading-5 tracking-tight text-slate-100">GenAi</span>
            <span className="text-[10px] font-medium uppercase leading-4 tracking-[0.14em] text-slate-500">Interview workspace</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex min-w-0 items-center gap-2.5">
                <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold text-slate-300">
                  {user.username?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <span className="hidden max-w-40 truncate text-sm text-slate-400 sm:inline">
                  {user.username || "Your account"}
                </span>
              </div>
              <span aria-hidden="true" className="hidden h-5 w-px bg-white/10 sm:block" />
              <button
                onClick={onLogout}
                className="rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};