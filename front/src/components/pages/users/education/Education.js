import React from "react";
import EducationForm from "./EducationForm";

const Education = ({portfolioOwnerId, isEditable, setEdu}) => {
  return <EducationForm {...portfolioOwnerId, isEditable, setEdu}/>;
};

export default Education;
