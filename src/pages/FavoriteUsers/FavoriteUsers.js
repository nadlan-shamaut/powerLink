import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";

const FavoriteUsers = ({ users, isLoading, favoritesByEmail, setFavoritesByEmail }) => {
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorite Users
          </Text>
        </S.Header>
        <UserList
          users={users}
          isLoading={isLoading}
          favoritesByEmail={favoritesByEmail}
          setFavoritesByEmail={setFavoritesByEmail}
        />
      </S.Content>
    </S.Home>
  );
};

export default FavoriteUsers;
