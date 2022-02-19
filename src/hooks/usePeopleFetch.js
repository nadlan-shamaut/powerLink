import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (pageNumber) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(async () => {
    setIsLoading(true);
    let cancel;
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?results=25&page=${pageNumber}`,
        { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
      );

      setUsers((prevState) => [...prevState, ...response.data.results]);
      setHasMore(response.data.results.length > 0);
      setIsLoading(false);
    } catch (err) {
      // console.log(err);
      //send alert to ourself that there was an error fetching data of our users
    }
    return () => cancel();
  }, [pageNumber]);

  return { users, isLoading, hasMore };
};
