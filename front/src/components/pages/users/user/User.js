import React, { useState, useEffect, useContext } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../../utils/api";
import { PortfolioOwnerDataContext } from "../Portfolio";

function User({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);
  const [user, setUser] = useState(portfolioOwnerData);

  // console.log("User", portfolioOwnerData);

  return (
    <>
      {isEditing ? (
        <UserEditForm
          user={portfolioOwnerData}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      ) : (
        <UserCard
          user={portfolioOwnerData}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default User;
