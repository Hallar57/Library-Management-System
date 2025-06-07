const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Connected Successfully........Running on PORT ${PORT}`);
});

app.get("/", async (req, res) => {
  try {
    res.json("hi");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const result = await pool.query("select * from books");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    const {
      book_id,
      title,
      author_id,
      publisher_id,
      category_id,
      isbn,
      published_year,
      available_copies,
    } = req.body;

    const newBook = await pool.query(
      `INSERT INTO books (book_id, title, author_id, publisher_id, category_id, isbn, published_year, available_copies)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        book_id,
        title,
        author_id,
        publisher_id,
        category_id,
        isbn,
        published_year,
        available_copies,
      ]
    );

    res.status(201).json(newBook.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/authors", async (req, res) => {
  try {
    const result = await pool.query("select * from authors");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post("/authors", async (req, res) => {
  try {
    const { author_id, author_name, nationality, date_of_birth } = req.body;

    const newAuthor = await pool.query(
      `INSERT INTO books (author_id, author_name, nationality, date_of_birth)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [author_id, author_name, nationality, date_of_birth]
    );

    res.status(201).json(newAuthor.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const result = await pool.query("select * from categories");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post("/categories", async (req, res) => {
  try {
    const { category_id, category_name } = req.body;

    const newCategory = await pool.query(
      `INSERT INTO books (category_id, category_name,)
       VALUES ($1, $2) RETURNING *`,
      [category_id, category_name]
    );

    res.status(201).json(newCategory.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/staff", async (req, res) => {
  try {
    const result = await pool.query("select * from staff");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post("/staff", async (req, res) => {
  try {
    const { staff_id, staff_name, role, email } = req.body;

    const newStaff = await pool.query(
      `INSERT INTO books (staff_id, staff_name, role, email)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [staff_id, staff_name, role, email]
    );

    res.status(201).json(newStaff.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/members", async (req, res) => {
  try {
    const result = await pool.query("select * from members");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post("/members", async (req, res) => {
  try {
    const { member_id, member_name, email, membership_date, member_type_id } =
      req.body;

    const newMember = await pool.query(
      `INSERT INTO books (member_id, member_name, email, membership_date, member_type_id,)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [member_id, member_name, email, membership_date, member_type_id]
    );

    res.status(201).json(newMember.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/loans", async (req, res) => {
  try {
    const result = await pool.query("select * from loans");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post("/loans", async (req, res) => {
  try {
    const {
      loan_id,
      book_id,
      member_id,
      staff_id,
      loan_date,
      due_date,
      return_date,
    } = req.body;

    const newLoan = await pool.query(
      `INSERT INTO books (loan_id, book_id, member_id, staff_id, loan_date, due_date, return_date,)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [loan_id, book_id, member_id, staff_id, loan_date, due_date, return_date]
    );

    res.status(201).json(newLoan.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/fines", async (req, res) => {
  try {
    const result = await pool.query("select * from fines");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post("/fines", async (req, res) => {
  try {
    const { fine_id, loan_id, amount, paid_status } = req.body;

    const newFine = await pool.query(
      `INSERT INTO books (fine_id, loan_id, amount, paid_status,) VALUES ($1, $2, $3, $4) RETURNING *`,
      [fine_id, loan_id, amount, paid_status]
    );

    res.status(201).json(newFine.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/reservations", async (req, res) => {
  try {
    const result = await pool.query("select * from reservations");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post("/reservations", async (req, res) => {
  try {
    const { reservation_id, book_id, member_id, rservation_date, status } = req.body;

    const newReservations = await pool.query(
      `INSERT INTO books ( reservation_id, book_id, member_id, rservation_date, status,) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [ reservation_id, book_id, member_id, rservation_date, status,]
    );

    res.status(201).json(newReservations.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/publishers", async (req, res) => {
  try {
    const result = await pool.query("select * from publishers");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post("/publishers", async (req, res) => {
  try {
    const { publisher_id, publisher_name, } = req.body;

    const newPublishers = await pool.query(
      `INSERT INTO books ( publisher_id, publisher_name,) VALUES ($1, $2) RETURNING *`,
      [ publisher_id, publisher_name, ]
    );

    res.status(201).json(newPublishers.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/membership_type", async (req, res) => {
  try {
    const result = await pool.query("select * from membership_type");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

app.post("/membership_type", async (req, res) => {
  try {
    const { membership_type_id, membership_type_name, } = req.body;

    const newMembership_type = await pool.query(
      `INSERT INTO books ( membership_type_id, membership_type_name,) VALUES ($1, $2) RETURNING *`,
      [ membership_type_id, membership_type_name, ]
    );

    res.status(201).json(newMembership_type.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});