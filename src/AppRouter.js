import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { usePeopleFetch } from "hooks";

//Pages
import { Home } from "pages";
import { FavoriteUsers } from "pages";

const AppRouter = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { users, isLoading, hasMore } = usePeopleFetch(pageNumber);
  const [favoritesByEmail, setFavoritesByEmail] = useState([]);

  useEffect(() => {
    const storedFavoritesByEmail = JSON.parse(localStorage.getItem("favoritesByEmail"));
    if (storedFavoritesByEmail && Array.isArray(storedFavoritesByEmail)) {
      setFavoritesByEmail(storedFavoritesByEmail);
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home
              hasMore={hasMore}
              users={users}
              setPageNumber={setPageNumber}
              isLoading={isLoading}
              favoritesByEmail={favoritesByEmail}
              setFavoritesByEmail={setFavoritesByEmail}
            />
          </Route>
          <Route exact path="/favorites">
            <FavoriteUsers
              users={users.filter((user) => favoritesByEmail.includes(user.email))}
              isLoading={isLoading}
              favoritesByEmail={favoritesByEmail}
              setFavoritesByEmail={setFavoritesByEmail}
            />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
