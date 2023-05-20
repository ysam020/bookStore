import axios from "axios";

export const handleDeleteBook = async (data, setData, bookId) => {
  // Send DELETE request to delete the book
  await axios
    .delete(`https://bookstore-0mxa.onrender.com/books/${bookId}`)
    .then((response) => {
      console.log(response.data); // Book deleted successfully message
      // Remove the deleted book from the state
      setData(data.filter((book) => book.id !== bookId));
    })
    .catch((error) => {
      console.error(error);
    });
};
