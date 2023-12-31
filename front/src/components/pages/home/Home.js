import { useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import { Image } from "react-bootstrap";
import ButtonCommon from "../../common/ButtonCommon";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../common/header/logo0.png";
import { useSelector } from "react-redux";

const Home = () => {
  const userState = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const btnRef = useRef(null);
  const onClick = () => {
    navigate(`/users/${userState.userInfo?.id}`);
  };
  useEffect(() => {
    if (!userState.userInfo?.id) {
      navigate("/login", { replace: true });
      return;
    }

    btnRef.current.focus();
  }, [userState.userInfo?.id]);
  return (
    <Card
      border="warning"
      style={{
        width: "18rem",
        margin: "0 auto",
        marginTop: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "10px",
        }}
      >
        <Card.Title>{userState?.userInfo?.name}님의 홈페이지</Card.Title>
        <Image src={userState?.userInfo?.userImgUrl || defaultImg} />
        <Card.Text style={{ marginTop: "30px" }}>당신의 상태</Card.Text>
        <Card.Text>{userState?.userInfo?.description}</Card.Text>
        <ButtonCommon
          variant="outline-secondary"
          onClickHandler={onClick}
          text="My Page"
          ref={btnRef}
        />
      </Card.Body>
    </Card>
  );
};

export default Home;
