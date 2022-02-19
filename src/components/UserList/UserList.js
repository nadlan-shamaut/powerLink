import React, { useRef, useState, useCallback } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({
  users,
  isLoading,
  favoritesByEmail,
  setFavoritesByEmail,
  hasMore,
  setPageNumber,
}) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [selectedCountries, setSelectedCountries] = useState([]);

  const observer = useRef();

  //

  /**
   * @description -  This is a callback function that will be called when the user scrolls to the bottom of the page.
   * @param {object} node - The node object that is passed to the callback function.
   * @returns {void}
   * @link https://www.youtube.com/watch?v=NZKUirTtxcg&t=1257s
   */
  const lastElement = useCallback(
    (node) => {
      if (isLoading || !setPageNumber) return; // we do not pass the setPageNumber in the favorites page
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevState) => prevState + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const handleCheckBoxChange = (value) => {
    if (value) {
      if (selectedCountries.includes(value)) {
        setSelectedCountries(selectedCountries.filter((country) => country !== value));
      } else {
        let newSelectedCountries = [...selectedCountries, value];
        newSelectedCountries = [...new Set(newSelectedCountries)];
        setSelectedCountries(newSelectedCountries);
      }
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  /**
   * @description - This function is used to add or remove a user from the favorites list
   * @param {string} userEmail - The email of the user
   * We use the email to identify the user in the favorites list assuming that the email is unique
   */
  const handleFavoriteClick = (userEmail) => {
    let nextFavoritesByEmail = favoritesByEmail;
    if (!nextFavoritesByEmail) {
      // if it does not exists we create a new one
      nextFavoritesByEmail = [userEmail];
    } else if (nextFavoritesByEmail && Array.isArray(nextFavoritesByEmail)) {
      if (nextFavoritesByEmail.includes(userEmail)) {
        // if it exists we remove it
        nextFavoritesByEmail = nextFavoritesByEmail.filter(
          (email) => email !== userEmail
        );
      } else {
        // if it does not exists we add it
        nextFavoritesByEmail.push(userEmail);
        nextFavoritesByEmail = [...new Set(nextFavoritesByEmail)];
      }
    }
    setFavoritesByEmail(nextFavoritesByEmail);
    localStorage.setItem("favoritesByEmail", JSON.stringify(nextFavoritesByEmail));
  };

  const filteredUsers = users.filter(({ nat }) =>
    selectedCountries?.length > 0 ? selectedCountries.includes(nat) : true
  );

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleCheckBoxChange} />
        <CheckBox value="AU" label="Australia" onChange={handleCheckBoxChange} />
        <CheckBox value="CA" label="Canada" onChange={handleCheckBoxChange} />
        <CheckBox value="DE" label="Germany" onChange={handleCheckBoxChange} />
        <CheckBox value="FI" label="Finland" onChange={handleCheckBoxChange} />
      </S.Filters>
      <S.List>
        {filteredUsers.map((user, index) => {
          return (
            <S.User
              ref={filteredUsers.length === index + 1 ? lastElement : undefined}
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {user.nat}
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                isVisible={
                  index === hoveredUserId || favoritesByEmail.includes(user.email)
                }
              >
                <IconButton onClick={() => handleFavoriteClick(user.email)}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
