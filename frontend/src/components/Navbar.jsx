import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const links = [
    {
      to: "/",
      label: "Dashboard",
      icon: (
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
    },
    {
      to: "/add-student",
      label: "Add Student",
      icon: (
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
      ),
    },
    
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

        .nav-root {
          font-family: 'Inter', sans-serif;
          background: #0A0F1E;
          border-bottom: 1px solid #1E293B;
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(12px);
        }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2.5rem;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
        }

        .nav-brand-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 12px rgba(99,102,241,0.4);
          flex-shrink: 0;
        }

        .nav-brand-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #F1F5F9;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }

        .nav-brand-name span {
          color: #6366F1;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 500;
          color: #64748B;
          text-decoration: none;
          transition: all 0.15s ease;
          border: 1px solid transparent;
          letter-spacing: 0.005em;
        }

        .nav-link:hover {
          color: #CBD5E1;
          background: #1E293B;
        }

        .nav-link.active {
          color: #A5B4FC;
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.25);
        }

        @media (max-width: 640px) {
          .nav-inner { padding: 0 1.25rem; }
          .nav-brand-name { display: none; }
          .nav-link span { display: none; }
          .nav-link { padding: 0.5rem; }
        }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">

          <Link to="/" className="nav-brand">
            <div className="nav-brand-icon">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <span className="nav-brand-name">Student <span>MS</span></span>
          </Link>

          <div className="nav-links">
            {links.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link${location.pathname === to ? " active" : ""}`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;
