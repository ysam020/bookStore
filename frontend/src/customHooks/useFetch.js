import { useEffect, useState } from "react";
import axios from "axios";

function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getBooks() {
      setLoading(true);
      const res = await axios.get("https://bookstore-0mxa.onrender.com/books");
      setData(res.data);
      setLoading(false);
    }
    getBooks();
  }, []);
  return { data, setData, loading };
}

export default useFetch;
