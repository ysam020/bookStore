import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import AddBook from "../components/AddBook";
import { CircularProgress, IconButton } from "@mui/material";
import Fab from "@mui/material/Fab";
import "../styles/landing.css";
import useFetch from "../customHooks/useFetch";
import { handleDeleteBook } from "../utils/deleteBook";
import { handleUpdateBook } from "../utils/updateBook";

function Landing() {
  const { data, setData, loading } = useFetch();
  const [editedBookData, setEditedBookData] = useState({
    title: "",
    author: "",
    year: "",
    isbn: "",
  });

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Container fluid className="landing-banner">
        <Row>
          <Col xl={7}></Col>
          <Col xs={12} xl={5} className="banner-content-col">
            <h1>Online book store</h1>
            <a href="#books">Explore Now</a>
          </Col>
        </Row>
      </Container>

      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <Container className="landing-books" id="books">
            <Row>
              <h2>Bestselling Books</h2>
              {data.map((book) => {
                return (
                  <Col
                    key={book.id}
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className="books-col"
                  >
                    <div style={{ position: "relative" }}>
                      <div>
                        <div className="front">
                          <img
                            src={book.url}
                            alt={book.title}
                            width="100%"
                            className="book-cover-img"
                          />

                          {/* Edit card */}
                          <div className="back">
                            <h5>Edit book</h5>
                            <input
                              type="text"
                              name="title"
                              defaultValue={book.title}
                              onChange={(e) => {
                                setEditedBookData({
                                  ...editedBookData,
                                  title: e.target.value,
                                });
                              }}
                            />
                            <input
                              type="text"
                              name="author"
                              defaultValue={book.author}
                              onChange={(e) => {
                                setEditedBookData({
                                  ...editedBookData,
                                  author: e.target.value,
                                });
                              }}
                            />

                            <input
                              type="text"
                              name="year"
                              defaultValue={book.year}
                              onChange={(e) => {
                                setEditedBookData({
                                  ...editedBookData,
                                  year: e.target.value,
                                });
                              }}
                            />

                            <input
                              type="text"
                              name="isbn"
                              defaultValue={book.isbn}
                              onChange={(e) => {
                                setEditedBookData({
                                  ...editedBookData,
                                  isbn: e.target.value,
                                });
                              }}
                            />

                            <IconButton
                              onClick={() =>
                                handleUpdateBook(setData, editedBookData, book)
                              }
                              sx={{
                                width: "100%",
                                borderRadius: "30px",
                                backgroundColor: "#6CB763",
                                color: "#fff",
                                "&:hover": { backgroundColor: "#6CB763" },
                              }}
                            >
                              <DoneRoundedIcon />
                            </IconButton>

                            <IconButton
                              sx={{
                                width: "100%",
                                borderRadius: "30px",
                                backgroundColor: "#F15C6D",
                                color: "#fff",
                                "&:hover": { backgroundColor: "#F15C6D" },
                              }}
                              onClick={() =>
                                handleDeleteBook(data, setData, book.id)
                              }
                            >
                              <DeleteRoundedIcon />
                            </IconButton>
                          </div>
                        </div>

                        <div className="book-info">
                          <h5>{book.title}</h5>
                          <p>
                            {book.author}
                            <br />
                            {book.isbn}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}

      <Fab
        sx={{
          position: "fixed",
          bottom: "50px",
          right: "20px",
          backgroundColor: "#c69090",
          color: "#fff",
          "&:hover": { backgroundColor: "#c69090" },
        }}
        onClick={() => setOpenModal(true)}
      >
        <SpeedDialIcon />
      </Fab>

      <AddBook
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={data}
        setData={setData}
      />
    </>
  );
}

export default Landing;
