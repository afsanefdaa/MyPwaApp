import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UseBookSearch(q, page) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHastMore] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => { setBooks([]); }, [q]);

  useEffect(() => {
    let cancel;
    if (q && page) {
      setLoading(true);
      setError(false);

      axios({
        method: 'GET',
        url: 'http://openlibrary.org/search.json',
        params: {
          q,
          page,
          limit: 10,
        },
        // eslint-disable-next-line no-return-assign
        cancelToken: new axios.CancelToken((c) => cancel = c),
      })
        .then((res) => {
          // with set duplicates are not allowed
          setBooks((prevState) => [...new Set([...prevState, ...res.data.docs])]);
          setHastMore(res.data.docs.length > 0);
        })
        .catch((err) => {
          // eslint-disable-next-line no-useless-return
          if (axios.isCancel(err)) return;
          setError(true);
        });
    }
    return () => cancel && cancel();
  }, [q, page]);
  return {
    loading, error, books, hasMore,
  };
}
