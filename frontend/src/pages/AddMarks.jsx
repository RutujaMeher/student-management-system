import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api";

function AddMarks() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await API.post(`/${id}/marks`, { subject, marks });
    alert("Marks added successfully!");
    navigate(`/student/${id}`);
    setLoading(false);
  };

  const marksNum = Number(marks);
  const hasMarks = marks !== "";
  const getScoreColor = () => {
    if (!hasMarks) return { color: "#475569", bg: "transparent" };
    if (marksNum >= 80) return { color: "#34D399", bg: "rgba(52,211,153,0.1)" };
    if (marksNum >= 60) return { color: "#22D3EE", bg: "rgba(34,211,238,0.1)" };
    if (marksNum >= 40) return { color: "#FBBF24", bg: "rgba(251,191,36,0.1)" };
    return { color: "#F87171", bg: "rgba(248,113,113,0.1)" };
  };
  const scoreColor = getScoreColor();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

        .am2-page {
          min-height: 100vh;
          background: #0A0F1E;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
        }

        .am2-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.25rem;
        }

        .am2-card {
          width: 100%;
          max-width: 420px;
          background: #111827;
          border: 1px solid #1E293B;
          border-radius: 20px;
          overflow: hidden;
        }

        .am2-card-top {
          padding: 2rem 2rem 1.5rem;
          border-bottom: 1px solid #1E293B;
          position: relative;
        }

        .am2-card-top::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366F1, #8B5CF6, #22D3EE);
          border-radius: 20px 20px 0 0;
        }

        .am2-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.1rem;
        }

        .am2-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818CF8;
        }

        .am2-id-chip {
          font-size: 0.68rem;
          font-weight: 600;
          color: #6366F1;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.22);
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          letter-spacing: 0.06em;
        }

        .am2-card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #F1F5F9;
          letter-spacing: -0.02em;
          margin: 0 0 0.25rem;
        }

        .am2-card-sub {
          font-size: 0.8rem;
          color: #475569;
          margin: 0;
        }

        .am2-form {
          padding: 1.75rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .am2-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .am2-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #475569;
        }

        .am2-input-wrap {
          position: relative;
        }

        .am2-input-icon {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: #475569;
          pointer-events: none;
          z-index: 1;
          transition: color 0.15s;
        }

        .am2-input-wrap:focus-within .am2-input-icon {
          color: #818CF8;
        }

        .am2-input {
          width: 100%;
          background: #0A0F1E;
          border: 1px solid #1E293B;
          border-radius: 10px;
          padding: 0.7rem 0.9rem 0.7rem 2.5rem;
          font-size: 0.875rem;
          color: #E2E8F0;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }

        .am2-input::placeholder { color: #334155; }

        .am2-input:focus {
          border-color: #6366F1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        .am2-input[type=number]::-webkit-inner-spin-button,
        .am2-input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        .am2-input[type=number] { -moz-appearance: textfield; }

        /* live score preview */
        .am2-score-preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #0A0F1E;
          border: 1px solid #1E293B;
          border-radius: 10px;
          padding: 0.65rem 1rem;
          transition: border-color 0.2s;
        }

        .am2-score-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #334155;
        }

        .am2-score-bar-bg {
          flex: 1;
          height: 4px;
          background: #1E293B;
          border-radius: 99px;
          overflow: hidden;
          margin: 0 0.85rem;
        }

        .am2-score-bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.3s ease, background 0.3s ease;
        }

        .am2-score-val {
          font-size: 0.82rem;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          min-width: 36px;
          text-align: right;
          transition: color 0.2s;
        }

        .am2-divider {
          height: 1px;
          background: #1E293B;
          margin: 0.2rem 0;
        }

        .am2-btn-row {
          display: flex;
          gap: 0.6rem;
        }

        .am2-submit {
          flex: 1;
          padding: 0.8rem;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 0 20px rgba(99,102,241,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          letter-spacing: 0.01em;
        }

        .am2-submit:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 24px rgba(99,102,241,0.4);
        }

        .am2-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .am2-cancel {
          padding: 0.8rem 1.1rem;
          border-radius: 10px;
          border: 1px solid #1E293B;
          background: transparent;
          color: #64748B;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          white-space: nowrap;
        }

        .am2-cancel:hover {
          background: #1E293B;
          color: #CBD5E1;
          border-color: #334155;
        }

        .am2-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: am2-spin 0.6s linear infinite;
        }

        @keyframes am2-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="am2-page">
        <Navbar />

        <div className="am2-body">
          <div className="am2-card">

            <div className="am2-card-top">
              <div className="am2-top-row">
                <div className="am2-icon-wrap">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                </div>
                <span className="am2-id-chip">Student #{id}</span>
              </div>
              <h2 className="am2-card-title">Add Marks</h2>
              <p className="am2-card-sub">Record a subject score for this student</p>
            </div>

            <form onSubmit={handleSubmit} className="am2-form">

              {/* Subject */}
              <div className="am2-field">
                <label className="am2-label">Subject</label>
                <div className="am2-input-wrap">
                  <span className="am2-input-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Mathematics"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="am2-input"
                  />
                </div>
              </div>

              {/* Marks */}
              <div className="am2-field">
                <label className="am2-label">Marks</label>
                <div className="am2-input-wrap">
                  <span className="am2-input-icon">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </span>
                  <input
                    type="number"
                    placeholder="0 – 100"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    required
                    min="0"
                    max="100"
                    className="am2-input"
                  />
                </div>
              </div>

              {/* Live score preview */}
              <div className="am2-score-preview" style={{ borderColor: hasMarks ? scoreColor.color + "33" : "#1E293B" }}>
                <span className="am2-score-label">Score</span>
                <div className="am2-score-bar-bg">
                  <div
                    className="am2-score-bar-fill"
                    style={{
                      width: hasMarks ? `${Math.min(marksNum, 100)}%` : "0%",
                      background: scoreColor.color,
                    }}
                  />
                </div>
                <span className="am2-score-val" style={{ color: hasMarks ? scoreColor.color : "#334155" }}>
                  {hasMarks ? `${marksNum}%` : "—"}
                </span>
              </div>

              <div className="am2-divider" />

              <div className="am2-btn-row">
                <button type="submit" className="am2-submit" disabled={loading}>
                  {loading ? (
                    <><div className="am2-spinner" /> Saving...</>
                  ) : (
                    <>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Save Marks
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="am2-cancel"
                  onClick={() => navigate(`/student/${id}`)}
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMarks;
