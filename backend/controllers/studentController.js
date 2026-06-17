const pool = require("../db");

// Create Student
const createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const result = await pool.query(
      "INSERT INTO students (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name, email, age]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get All Students + Marks
const getStudents = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        s.id,
        s.name,
        s.email,
        s.age,
        s.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'subject', m.subject,
              'marks', m.marks
            )
          ) FILTER (WHERE m.id IS NOT NULL),
          '[]'
        ) AS marks
      FROM students s
      LEFT JOIN marks m
      ON s.id = m.student_id
      GROUP BY s.id
      ORDER BY s.id
    `);

    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get Student By ID
const getStudentById = async (req, res) => {
  try {
    const studentResult = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [req.params.id]
    );

    const marksResult = await pool.query(
      "SELECT subject, marks FROM marks WHERE student_id = $1",
      [req.params.id]
    );

    res.json({
      ...studentResult.rows[0],
      marks: marksResult.rows
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update Student
const updateStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const result = await pool.query(
      "UPDATE students SET name=$1,email=$2,age=$3 WHERE id=$4 RETURNING *",
      [name, email, age, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Delete Student
const deleteStudent = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM students WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Student Deleted Successfully"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Add Marks
const addMarks = async (req, res) => {
  try {
    const { subject, marks } = req.body;

    const result = await pool.query(
      "INSERT INTO marks (student_id, subject, marks) VALUES ($1,$2,$3) RETURNING *",
      [req.params.id, subject, marks]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  addMarks
};