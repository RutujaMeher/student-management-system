import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: "", email: "", age: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    const res = await API.get(`/${id}`);
    setStudent(res.data);
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await API.put(`/${id}`, student);
    alert("Student Updated");
    navigate("/");
    setLoading(false);
  };

  const fields = [
    {
      name: "name",
      type: "text",
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

        .es-page {
          min-height: 100vh;
          background: #0A0F1E;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
        }

        .es-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.25rem;
        }

        .es-card {
          width: 100%;
          max-width: 420px;
          background: #111827;
          border: 1px solid #1E293B;
          border-radius: 20px;
          overflow: hidden;
        }

        .es-card-top {
          padding: 2rem 2rem 1.5rem;
          border-bottom: 1px solid #1E293B;
          position: relative;
        }

        .es-card-top::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #FBBF24, #F59E0B, #FCD34D);
          border-radius: 20px 20px 0 0;
        }

        .es-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.1rem;
        }

        .es-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(251,191,36,0.1);
          border: 1px solid rgba(251,191,36,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FBBF24;
        }

        .es-id-chip {
          font-size: 0.68rem;
          font-weight: 600;
          color: #FBBF24;
          background: rgba(251,191,36,0.1);
          border: 1px solid rgba(251,191,36,0.22);
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          letter-spacing: 0.06em;
        }

        .es-card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #F1F5F9;
          letter-spacing: -0.02em;
          margin: 0 0 0.25rem;
        }

        .es-card-sub {
          font-size: 0.8rem;
          color: #475569;
          margin: 0;
        }

        .es-form {
          padding: 1.75rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .es-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .es-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #475569;
        }

        .es-input-wrap {
          position: relative;
        }

        .es-input-icon {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: #475569;
          pointer-events: none;
          z-index: 1;
          transition: color 0.15s;
        }

        .es-input-wrap:focus-within .es-input-icon {
          color: #FBBF24;
        }

        .es-input {
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

        .es-input::placeholder { color: #334155; }

        .es-input:focus {
          border-color: #FBBF24;
          box-shadow: 0 0 0 3px rgba(251,191,36,0.12);
        }

        .es-input[type=number]::-webkit-inner-spin-button,
        .es-input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        .es-input[type=number] { -moz-appearance: textfield; }

        .es-divider {
          height: 1px;
          background: #1E293B;
          margin: 0.2rem 0;
        }

        .es-submit {
          margin-top: 0.4rem;
          width: 100%;
          padding: 0.8rem;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #FBBF24, #F59E0B);
          color: #0A0F1E;
          font-size: 0.875rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 0 20px rgba(251,191,36,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          letter-spacing: 0.01em;
        }

        .es-submit:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 24px rgba(251,191,36,0.38);
        }

        .es-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .es-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(10,15,30,0.3);
          border-top-color: #0A0F1E;
          border-radius: 50%;
          animation: es-spin 0.6s linear infinite;
        }

        @keyframes es-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="es-page">
        <Navbar />

        <div className="es-body">
          <div className="es-card">

            <div className="es-card-top">
              <div className="es-top-row">
                <div className="es-icon-wrap">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                </div>
                <span className="es-id-chip">ID #{id}</span>
              </div>
              <h2 className="es-card-title">Edit Student</h2>
              <p className="es-card-sub">Update the details for this student record</p>
            </div>

            <form onSubmit={handleSubmit} className="es-form">
              {fields.map(({ name, type, label, icon }) => (
                <div className="es-field" key={name}>
                  <label className="es-label">{label}</label>
                  <div className="es-input-wrap">
                    <span className="es-input-icon">{icon}</span>
                    <input
                      name={name}
                      type={type}
                      value={student[name]}
                      className="es-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              ))}

              <div className="es-divider" />

              <button type="submit" className="es-submit" disabled={loading}>
                {loading ? (
                  <><div className="es-spinner" /> Saving...</>
                ) : (
                  <>
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Update Student
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

export default EditStudent;
