import React from "react";
import { Button } from "react-bootstrap";

const ButtonCommon = (props) => {
  const {
    variant,
    type = "",
    className,
    onClickHandler,
    size = "",
    text,
  } = props;
  return (
    <Button
      variant={variant}
      type={type}
      className={className}
      onClick={onClickHandler}
      size={size}
    >
      {text}
    </Button>
  );
};

export default ButtonCommon;
