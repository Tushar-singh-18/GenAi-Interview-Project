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
    <header className="sticky top-0 z-10 border-b border-[#e4ded3] bg-[#f3efe7]/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          aria-label="GenAi interview workspace home"
          className="group flex items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#60745e]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#49624d] text-sm font-semibold tracking-tight text-white transition-colors group-hover:bg-[#3b5140]">
            G
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold leading-5 tracking-tight text-[#292d29]">GenAi</span>
            <span className="text-[10px] font-medium uppercase leading-4 tracking-[0.14em] text-[#85857b]">Interview workspace</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex min-w-0 items-center gap-2.5">
                <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#dce2d7] bg-[#edf1e9] text-xs font-semibold text-[#49624d]">
                  {user.username?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <span className="hidden max-w-40 truncate text-sm text-[#686a62] sm:inline">
                  {user.username || "Your account"}
                </span>
              </div>
              <span aria-hidden="true" className="hidden h-5 w-px bg-[#ded8cd] sm:block" />
              <button
                onClick={onLogout}
                className="rounded-lg border border-[#d8d2c7] px-3 py-2 text-sm font-medium text-[#555b53] transition-colors hover:border-[#b8c5b1] hover:bg-white/70 hover:text-[#292d29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60745e]"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg border border-[#d8d2c7] px-3 py-2 text-sm font-medium text-[#555b53] transition-colors hover:border-[#b8c5b1] hover:bg-white/70 hover:text-[#292d29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60745e]"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};