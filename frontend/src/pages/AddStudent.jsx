import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api";

function AddStudent() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: "", email: "", age: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await API.post("/", student);
    alert("Student Added Successfully");
    navigate("/");
    setLoading(false);
  };

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Full name",
      label: "Student Name",
      icon: (
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      name: "email",
      type: "email",
      placeholder: "name@example.com",
      label: "Email Address",
      icon: (
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      name: "age",
      type: "number",
      placeholder: "e.g. 20",
      label: "Age",
      icon: (
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

        .as-page {
          min-height: 100vh;
          background: #0A0F1E;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
        }

        .as-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.25rem;
        }

        .as-card {
          width: 100%;
          max-width: 420px;
          background: #111827;
          border: 1px solid #1E293B;
          border-radius: 20px;
          overflow: hidden;
        }

        .as-card-top {
          padding: 2rem 2rem 1.5rem;
          border-bottom: 1px solid #1E293B;
          position: relative;
        }

        .as-card-top::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366F1, #8B5CF6, #22D3EE);
          border-radius: 20px 20px 0 0;
        }

        .as-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818CF8;
          margin-bottom: 1.1rem;
        }

        .as-card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #F1F5F9;
          letter-spacing: -0.02em;
          margin: 0 0 0.25rem;
        }

        .as-card-sub {
          font-size: 0.8rem;
          color: #475569;
          margin: 0;
        }

        .as-form {
          padding: 1.75rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .as-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .as-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #475569;
        }

        .as-input-wrap {
          position: relative;
        }

        .as-input-icon {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: #475569;
          pointer-events: none;
          transition: color 0.15s;
        }

        .as-input {
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

        .as-input::placeholder {
          color: #334155;
        }

        .as-input:focus {
          border-color: #6366F1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }

        .as-input:focus + .as-input-icon,
        .as-input-wrap:focus-within .as-input-icon {
          color: #818CF8;
        }

        /* fix icon layering — icon must be after input in DOM or use wrap approach */
        .as-input-wrap .as-input-icon {
          z-index: 1;
        }

        .as-submit {
          margin-top: 0.4rem;
          width: 100%;
          padding: 0.8rem;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 0 20px rgba(99,102,241,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          letter-spacing: 0.01em;
        }

        .as-submit:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 24px rgba(99,102,241,0.45);
        }

        .as-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .as-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="as-page">
        <Navbar />

        <div className="as-body">
          <div className="as-card">

            <div className="as-card-top">
              <div className="as-icon-wrap">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              </div>
              <h2 className="as-card-title">Add New Student</h2>
              <p className="as-card-sub">Fill in the details to enrol a student</p>
            </div>

            <form onSubmit={handleSubmit} className="as-form">
              {fields.map(({ name, type, placeholder, label, icon }) => (
                <div className="as-field" key={name}>
                  <label className="as-label">{label}</label>
                  <div className="as-input-wrap">
                    <span className="as-input-icon">{icon}</span>
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      className="as-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              ))}

              <button type="submit" className="as-submit" disabled={loading}>
                {loading ? (
                  <><div className="as-spinner" /> Adding...</>
                ) : (
                  <>
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Student
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}

export default AddStudent;
