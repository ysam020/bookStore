import React, { useRef, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { validationSchema } from "../schema/AddBookSchema";
import ImageIcon from "@mui/icons-material/Image";
import { convertToBase64 } from "../utils/convertToBase64";
import { addBook } from "../utils/addBook";

const AddBookForm = (props) => {
  const [file, setFile] = useState();
  const addImageRef = useRef();

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      year: "",
      isbn: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      addBook(values, file, props.data, props.setData, props.handleClose);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="add-book-form">
      <TextField
        fullWidth
        margin="dense"
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

      <TextField
        fullWidth
        margin="dense"
        id="author"
        name="author"
        label="Author"
        value={formik.values.author}
        onChange={formik.handleChange}
        error={formik.touched.author && Boolean(formik.errors.author)}
        helperText={formik.touched.author && formik.errors.author}
      />

      <TextField
        fullWidth
        margin="dense"
        id="year"
        name="year"
        label="Year"
        value={formik.values.year}
        onChange={(e) => {
          const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
          formik.setFieldValue("year", inputValue);
        }}
        error={formik.touched.year && Boolean(formik.errors.year)}
        helperText={formik.touched.year && formik.errors.year}
        inputProps={{
          maxLength: 4,
        }}
      />

      <TextField
        margin="dense"
        fullWidth
        id="isbn"
        name="isbn"
        label="ISBN"
        value={formik.values.isbn}
        onChange={formik.handleChange}
        error={formik.touched.isbn && Boolean(formik.errors.isbn)}
        helperText={formik.touched.isbn && formik.errors.isbn}
      />

      <div
        className="add-image-btn"
        onClick={() => addImageRef.current.click()}
        style={{ marginBottom: "20px" }}
      >
        <IconButton sx={{ marginTop: "0 !important", color: "#c69090" }}>
          <ImageIcon />
        </IconButton>
        <p style={{ marginBottom: 0 }}>Add image</p>
      </div>
      <input
        ref={addImageRef}
        type="file"
        style={{ display: "none" }}
        onChange={(e) => convertToBase64(e, setFile)}
      />

      <Button fullWidth type="submit" className="submit-form-btn">
        Add Book
      </Button>
    </form>
  );
};

export default AddBookForm;
