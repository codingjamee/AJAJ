import { useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { UserStateContext } from "../../../App";
import { Image } from "react-bootstrap";
import ButtonCommon from "../../common/ButtonCommon";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../common/header/logo0.png";

const Home = () => {
  const userState = useContext(UserStateContext);
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/userState/${userState.user.id}`);
  };
  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [userState.user]);
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
      <Card.Body>
        <Card.Title>{userState?.user?.name}님의 홈페이지</Card.Title>
        <Image src={userState?.user?.userImgUrl || defaultImg} />
        <Card.Text style={{ marginTop: "30px" }}>당신의 상태</Card.Text>
        <Card.Text>{userState?.user?.description}</Card.Text>
        <ButtonCommon
          variant="outline-secondary"
          onClickHandler={onClick}
          text="My Page"
        />
      </Card.Body>
    </Card>
  );
};

export default Home;
