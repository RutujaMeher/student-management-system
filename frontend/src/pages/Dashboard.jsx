import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StudentTable from "../components/StudentTable";
import API from "../api";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [averageMarks, setAverageMarks] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/");
      const studentData = res.data;
      setStudents(studentData);

      setTotalStudents(studentData.length);

      const subjects = new Set();
      studentData.forEach((student) => {
        if (student.marks) {
          student.marks.forEach((mark) => {
            subjects.add(mark.subject);
          });
        }
      });
      setTotalSubjects(subjects.size);

      let total = 0;
      let count = 0;
      studentData.forEach((student) => {
        if (student.marks) {
          student.marks.forEach((mark) => {
            total += Number(mark.marks);
            count++;
          });
        }
      });
      setAverageMarks(count > 0 ? (total / count).toFixed(1) : 0);
    } catch (error) {
      console.log(error);
    }
  };

  const stats = [
    {
      label: "Total Students",
      value: totalStudents,
      suffix: "",
      accent: "#22D3EE",
      glow: "rgba(34,211,238,0.15)",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 11-2-3.46" />
        </svg>
      ),
    },
    {
      label: "Total Subjects",
      value: totalSubjects,
      suffix: "",
      accent: "#A78BFA",
      glow: "rgba(167,139,250,0.15)",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      label: "Average Marks",
      value: averageMarks,
      suffix: "%",
      accent: "#34D399",
      glow: "rgba(52,211,153,0.15)",
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

        .dash-root {
          min-height: 100vh;
          background: #0A0F1E;
          font-family: 'Inter', sans-serif;
          color: #E2E8F0;
        }

        .dash-body {
          padding: 2.5rem 2.5rem 4rem;
          max-width: 1280px;
          margin: 0 auto;
        }

        .dash-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6366F1;
          margin-bottom: 0.75rem;
        }

        .dash-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6366F1;
          box-shadow: 0 0 8px #6366F1;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .dash-title {
          font-size: 2.25rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #F8FAFC;
          margin: 0 0 0.4rem;
        }

        .dash-subtitle {
          font-size: 0.95rem;
          color: #64748B;
          margin: 0 0 2.5rem;
          font-weight: 400;
        }

        .stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 768px) {
          .stat-grid { grid-template-columns: 1fr; }
          .dash-body { padding: 1.5rem 1.25rem 3rem; }
          .dash-title { font-size: 1.75rem; }
        }

        .stat-card {
          position: relative;
          background: #111827;
          border-radius: 16px;
          padding: 1.75rem;
          border: 1px solid #1E293B;
          overflow: hidden;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          border-radius: 16px 16px 0 0;
        }

        .stat-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at top left, var(--glow) 0%, transparent 65%);
          pointer-events: none;
        }

        .stat-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--glow);
          color: var(--accent);
          margin-bottom: 1.1rem;
          border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #64748B;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 2.75rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
          color: #F8FAFC;
        }

        .stat-suffix {
          font-size: 1.5rem;
          font-weight: 700;
          color: #94A3B8;
          margin-left: 2px;
        }

        .table-section {
          background: #111827;
          border-radius: 16px;
          border: 1px solid #1E293B;
          overflow: hidden;
        }

        .table-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid #1E293B;
        }

        .table-section-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #CBD5E1;
          letter-spacing: -0.01em;
        }

        .table-section-badge {
          font-size: 0.7rem;
          font-weight: 600;
          color: #6366F1;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          letter-spacing: 0.04em;
        }

        .table-section-inner {
          padding: 0;
        }
      `}</style>

      <div className="dash-root">
        <Navbar />

        <div className="dash-body">

          <div className="dash-eyebrow">
            <span className="dash-eyebrow-dot" />
            Academic Overview
          </div>

          <h1 className="dash-title">Student Dashboard</h1>
          <p className="dash-subtitle">Manage students and academic records</p>

          <div className="stat-grid">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-card"
                style={{ "--accent": stat.accent, "--glow": stat.glow }}
              >
                <div className="stat-icon-wrap">{stat.icon}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">
                  {stat.value}
                  {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="table-section">
            <div className="table-section-header">
              <span className="table-section-title">All Students</span>
              <span className="table-section-badge">{totalStudents} records</span>
            </div>
            <div className="table-section-inner">
              <StudentTable students={students} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
