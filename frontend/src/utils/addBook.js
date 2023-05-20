import cryptoRandomString from "crypto-random-string";
import axios from "axios";

export async function addBook(values, file, data, setData, handleClose) {
  let randomString = cryptoRandomString({ length: 10 });
  const { title, author, year, isbn } = values;
  const bookData = {
    id: randomString,
    file,
    title,
    author,
    year,
    isbn,
  };

  const res = await axios.post(
    "https://bookstore-0mxa.onrender.com/books",
    bookData
  );
  setData([...data, bookData]);
  handleClose();
  return res.data;
}
