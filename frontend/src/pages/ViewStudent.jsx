import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api";

function ViewStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    const res = await API.get(`/${id}`);
    setStudent(res.data);
  };

  const getScoreColor = (marks) => {
    const m = Number(marks);
    if (m >= 80) return { color: "#34D399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.22)" };
    if (m >= 60) return { color: "#22D3EE", bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.22)" };
    if (m >= 40) return { color: "#FBBF24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.22)" };
    return { color: "#F87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.22)" };
  };

  const average =
    student?.marks?.length
      ? (student.marks.reduce((s, m) => s + Number(m.marks), 0) / student.marks.length).toFixed(1)
      : null;

  if (!student) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        .vs-loading {
          min-height: 100vh; background: #0A0F1E; display: flex;
          align-items: center; justify-content: center;
          font-family: 'Inter', sans-serif; color: #475569; font-size: 0.875rem;
        }
        .vs-loading-spinner {
          width: 20px; height: 20px; border: 2px solid #1E293B;
          border-top-color: #6366F1; border-radius: 50%;
          animation: vs-spin 0.7s linear infinite; margin-right: 0.75rem;
        }
        @keyframes vs-spin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="vs-loading">
        <div className="vs-loading-spinner" /> Loading student…
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

        .vs-page {
          min-height: 100vh;
          background: #0A0F1E;
          font-family: 'Inter', sans-serif;
          color: #E2E8F0;
        }

        .vs-body {
          max-width: 860px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 4rem;
        }

        /* ── Breadcrumb ── */
        .vs-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: #475569;
          margin-bottom: 1.75rem;
          text-decoration: none;
        }
        .vs-breadcrumb a {
          color: #475569;
          text-decoration: none;
          transition: color 0.15s;
        }
        .vs-breadcrumb a:hover { color: #CBD5E1; }
        .vs-breadcrumb-sep { color: #334155; }
        .vs-breadcrumb-cur { color: #94A3B8; font-weight: 500; }

        /* ── Student card ── */
        .vs-card {
          background: #111827;
          border: 1px solid #1E293B;
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: 1.25rem;
          position: relative;
        }

        .vs-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366F1, #8B5CF6, #22D3EE);
        }

        .vs-card-inner {
          padding: 1.75rem;
        }

        .vs-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .vs-avatar-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .vs-avatar {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
          box-shadow: 0 0 16px rgba(99,102,241,0.3);
          letter-spacing: -0.02em;
        }

        .vs-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #F1F5F9;
          letter-spacing: -0.02em;
          margin-bottom: 0.2rem;
        }

        .vs-id-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.68rem;
          font-weight: 600;
          color: #6366F1;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.22);
          padding: 0.2rem 0.55rem;
          border-radius: 20px;
          letter-spacing: 0.06em;
        }

        .vs-add-marks-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.55rem 1rem;
          border-radius: 10px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.28);
          color: #A5B4FC;
          text-decoration: none;
          transition: all 0.15s;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
          flex-shrink: 0;
        }
        .vs-add-marks-btn:hover {
          background: rgba(99,102,241,0.2);
          border-color: rgba(99,102,241,0.45);
          color: #C7D2FE;
        }

        .vs-meta-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        @media (max-width: 540px) {
          .vs-meta-grid { grid-template-columns: 1fr; }
          .vs-card-header { flex-direction: column; }
        }

        .vs-meta-item {
          background: #0A0F1E;
          border: 1px solid #1E293B;
          border-radius: 10px;
          padding: 0.85rem 1rem;
        }

        .vs-meta-label {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 0.35rem;
        }

        .vs-meta-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #CBD5E1;
          word-break: break-all;
        }

        /* ── Marks table card ── */
        .vs-marks-card {
          background: #111827;
          border: 1px solid #1E293B;
          border-radius: 18px;
          overflow: hidden;
        }

        .vs-marks-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.75rem;
          border-bottom: 1px solid #1E293B;
        }

        .vs-marks-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #CBD5E1;
          letter-spacing: -0.01em;
        }

        .vs-avg-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 600;
          color: #34D399;
          background: rgba(52,211,153,0.1);
          border: 1px solid rgba(52,211,153,0.22);
          padding: 0.25rem 0.65rem;
          border-radius: 20px;
          letter-spacing: 0.03em;
        }

        .vs-table {
          width: 100%;
          border-collapse: collapse;
        }

        .vs-table thead tr {
          border-bottom: 1px solid #1E293B;
        }

        .vs-table th {
          padding: 0.7rem 1.75rem;
          text-align: left;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
        }

        .vs-table tbody tr {
          border-bottom: 1px solid #1E293B;
          transition: background 0.15s;
        }

        .vs-table tbody tr:last-child { border-bottom: none; }
        .vs-table tbody tr:hover { background: rgba(99,102,241,0.03); }

        .vs-table td {
          padding: 0.95rem 1.75rem;
          font-size: 0.875rem;
          color: #CBD5E1;
          vertical-align: middle;
        }

        .vs-subject {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .vs-subject-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6366F1;
          flex-shrink: 0;
        }

        .vs-score-chip {
          display: inline-flex;
          align-items: center;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 8px;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.02em;
        }

        .vs-score-bar-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .vs-score-bar-bg {
          flex: 1;
          height: 4px;
          background: #1E293B;
          border-radius: 99px;
          overflow: hidden;
          max-width: 120px;
        }

        .vs-score-bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.4s ease;
        }

        .vs-empty {
          padding: 3.5rem 2rem;
          text-align: center;
          color: #475569;
          font-size: 0.875rem;
        }

        .vs-empty-icon {
          font-size: 1.75rem;
          margin-bottom: 0.6rem;
          opacity: 0.4;
        }
      `}</style>

      <div className="vs-page">
        <Navbar />

        <div className="vs-body">

          {/* Breadcrumb */}
          <div className="vs-breadcrumb">
            <Link to="/">Dashboard</Link>
            <span className="vs-breadcrumb-sep">›</span>
            <span className="vs-breadcrumb-cur">{student.name}</span>
          </div>

          {/* Student card */}
          <div className="vs-card">
            <div className="vs-card-inner">
              <div className="vs-card-header">
                <div className="vs-avatar-row">
                  <div className="vs-avatar">
                    {student.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="vs-name">{student.name}</div>
                    <span className="vs-id-chip">ID #{id}</span>
                  </div>
                </div>
                <Link to={`/student/${id}/add-marks`} className="vs-add-marks-btn">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add Marks
                </Link>
              </div>

              <div className="vs-meta-grid">
                <div className="vs-meta-item">
                  <div className="vs-meta-label">Email</div>
                  <div className="vs-meta-value">{student.email}</div>
                </div>
                <div className="vs-meta-item">
                  <div className="vs-meta-label">Age</div>
                  <div className="vs-meta-value">{student.age} yrs</div>
                </div>
                <div className="vs-meta-item">
                  <div className="vs-meta-label">Subjects</div>
                  <div className="vs-meta-value">{student.marks?.length ?? 0}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Marks table */}
          <div className="vs-marks-card">
            <div className="vs-marks-header">
              <span className="vs-marks-title">Marks Report</span>
              {average && (
                <span className="vs-avg-chip">
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                  Avg {average}%
                </span>
              )}
            </div>

            {student.marks?.length > 0 ? (
              <table className="vs-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {student.marks.map((m, i) => {
                    const clr = getScoreColor(m.marks);
                    return (
                      <tr key={i}>
                        <td>
                          <div className="vs-subject">
                            <span className="vs-subject-dot" style={{ background: clr.color }} />
                            {m.subject}
                          </div>
                        </td>
                        <td>
                          <div className="vs-score-bar-wrap">
                            <span
                              className="vs-score-chip"
                              style={{ color: clr.color, background: clr.bg, border: `1px solid ${clr.border}` }}
                            >
                              {m.marks}%
                            </span>
                            <div className="vs-score-bar-bg">
                              <div
                                className="vs-score-bar-fill"
                                style={{ width: `${Math.min(Number(m.marks), 100)}%`, background: clr.color }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="vs-empty">
                <div className="vs-empty-icon">📋</div>
                No marks added yet
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default ViewStudent;
