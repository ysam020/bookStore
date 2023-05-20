import axios from "axios";

export const handleUpdateBook = async (setData, editedBookData, book) => {
  console.log(book);
  const { title, author, year, isbn } = book;
  console.log(editedBookData);
  const data = {
    title: editedBookData.title === "" ? title : editedBookData.title,
    author: editedBookData.author === "" ? author : editedBookData.author,
    year: editedBookData.year === "" ? year : editedBookData.year,
    isbn: editedBookData.isbn === "" ? isbn : editedBookData.isbn,
  };

  try {
    const response = await axios.put(
      `https://bookstore-0mxa.onrender.com/books/${book.id}`,
      data
    );

    // Update the state with the updated book
    setData((prevState) => {
      const updatedData = prevState.map((item) => {
        if (item.id === book.id) {
          return { ...item, ...response.data };
        }
        return item;
      });
      return updatedData;
    });
  } catch (error) {
    console.error(error);
  }
};
