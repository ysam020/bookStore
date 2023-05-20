import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.urlencoded());
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");

    const bookSchema = new mongoose.Schema({
      id: { type: String, required: true, trim: true },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      author: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      year: {
        type: String,
        trim: true,
      },
      isbn: {
        type: String,
        required: true,
        trim: true,
      },
      url: {
        type: String,
      },
    });

    const Book = new mongoose.model("Book", bookSchema);

    // Get books
    app.get("/books", async (req, res) => {
      try {
        const books = await Book.find({});
        res.json(books);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    });

    // Add book
    app.post("/books", async (req, res) => {
      const { id, title, author, year, isbn, file } = req.body;

      try {
        const newBook = new Book({
          id,
          title,
          author,
          year,
          isbn,
          url: file,
        });

        const savedBook = await newBook.save();

        res.status(200).json(savedBook);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
    });

    // Delete a book
    app.delete("/books/:id", async (req, res) => {
      const bookId = req.params.id;

      try {
        const deletedBook = await Book.findOneAndDelete({ id: bookId });

        if (!deletedBook) {
          return res.status(404).json({ message: "Book not found" });
        }

        return res.json({ message: "Book deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
    });

    // Update book
    app.put("/books/:id", async (req, res) => {
      const bookId = req.params.id;
      const { title, author, year, isbn } = req.body;

      try {
        const existingBook = await Book.findOne({ id: bookId });

        if (!existingBook) {
          return res.status(404).json({ message: "Book not found" });
        }

        // Update book properties if they are not undefined
        if (title !== undefined) {
          existingBook.title = title;
        }
        if (author !== undefined) {
          existingBook.author = author;
        }
        if (year !== undefined) {
          existingBook.year = year;
        }
        if (isbn !== undefined) {
          existingBook.isbn = isbn;
        }

        const updatedBook = await existingBook.save();

        return res.json(updatedBook);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
    });

    app.listen(9002, () => {
      console.log("BE started at port 9002");
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));
