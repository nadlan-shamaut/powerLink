import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";

const Home = ({
  users,
  isLoading,
  favoritesByEmail,
  setFavoritesByEmail,
  hasMore,
  setPageNumber,
}) => {
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList
          users={users}
          hasMore={hasMore}
          setPageNumber={setPageNumber}
          isLoading={isLoading}
          setFavoritesByEmail={setFavoritesByEmail}
          favoritesByEmail={favoritesByEmail}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
