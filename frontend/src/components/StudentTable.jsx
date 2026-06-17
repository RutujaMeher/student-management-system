import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function StudentTable() {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    const res = await API.get("/");
    setStudents(res.data);
  };

  const deleteStudent = async (id) => {
    await API.delete(`/${id}`);
    loadStudents();
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

        .st-wrap {
          font-family: 'Inter', sans-serif;
          background: #111827;
          border-radius: 16px;
          border: 1px solid #1E293B;
          overflow: hidden;
        }

        .st-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid #1E293B;
        }

        .st-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #CBD5E1;
          letter-spacing: -0.01em;
        }

        .st-badge {
          font-size: 0.7rem;
          font-weight: 600;
          color: #6366F1;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          padding: 0.25rem 0.65rem;
          border-radius: 20px;
          letter-spacing: 0.04em;
        }

        .st-table {
          width: 100%;
          border-collapse: collapse;
        }

        .st-table thead tr {
          border-bottom: 1px solid #1E293B;
        }

        .st-table th {
          padding: 0.75rem 1.75rem;
          text-align: left;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
        }

        .st-table tbody tr {
          border-bottom: 1px solid #1E293B;
          transition: background 0.15s ease;
        }

        .st-table tbody tr:last-child {
          border-bottom: none;
        }

        .st-table tbody tr:hover {
          background: rgba(99,102,241,0.04);
        }

        .st-table td {
          padding: 1rem 1.75rem;
          font-size: 0.875rem;
          color: #CBD5E1;
          vertical-align: middle;
        }

        .st-id {
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.05em;
        }

        .st-name {
          font-weight: 600;
          color: #F1F5F9;
        }

        .st-email {
          color: #64748B;
          font-size: 0.825rem;
        }

        .st-age {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1E293B;
          border: 1px solid #334155;
          font-size: 0.8rem;
          font-weight: 600;
          color: #94A3B8;
        }

        .st-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .st-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          border: 1px solid transparent;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.15s ease;
          letter-spacing: 0.01em;
          line-height: 1;
          font-family: 'Inter', sans-serif;
        }

        .st-btn-view {
          background: rgba(34,211,238,0.08);
          color: #22D3EE;
          border-color: rgba(34,211,238,0.2);
        }
        .st-btn-view:hover {
          background: rgba(34,211,238,0.15);
          border-color: rgba(34,211,238,0.4);
        }

        .st-btn-edit {
          background: rgba(167,139,250,0.08);
          color: #A78BFA;
          border-color: rgba(167,139,250,0.2);
        }
        .st-btn-edit:hover {
          background: rgba(167,139,250,0.15);
          border-color: rgba(167,139,250,0.4);
        }

        .st-btn-delete {
          background: rgba(248,113,113,0.08);
          color: #F87171;
          border-color: rgba(248,113,113,0.2);
        }
        .st-btn-delete:hover {
          background: rgba(248,113,113,0.15);
          border-color: rgba(248,113,113,0.4);
        }

        .st-empty {
          text-align: center;
          padding: 4rem 2rem;
          color: #475569;
          font-size: 0.875rem;
        }

        .st-empty-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
          opacity: 0.4;
        }
      `}</style>

      <div className="st-wrap">
        <div className="st-header">
          <span className="st-title">Students List</span>
          <span className="st-badge">{students.length} records</span>
        </div>

        <table className="st-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="st-empty">
                    <div className="st-empty-icon">📭</div>
                    No students found
                  </div>
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td><span className="st-id">#{student.id}</span></td>
                  <td><span className="st-name">{student.name}</span></td>
                  <td><span className="st-email">{student.email}</span></td>
                  <td><span className="st-age">{student.age}</span></td>
                  <td>
                    <div className="st-actions">
                      <Link to={`/student/${student.id}`} className="st-btn st-btn-view">
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        View
                      </Link>
                      <Link to={`/edit-student/${student.id}`} className="st-btn st-btn-edit">
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                        </svg>
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteStudent(student.id)}
                        className="st-btn st-btn-delete"
                      >
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StudentTable;
