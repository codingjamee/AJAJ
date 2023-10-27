import { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { UserStateContext } from "../../../App";
import { Image } from "react-bootstrap";
import ButtonCommon from "../../common/ButtonCommon";
import { useNavigate } from "react-router-dom";

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
        <Image src="http://placekitten.com/200/200" />
        <Card.Text style={{ marginTop: "30px" }}>당신의 상태</Card.Text>
        <Card.Text>{userState?.user?.description}</Card.Text>
        <ButtonCommon
          variant="primary"
          onClickHandler={onClick}
          text="마이페이지"
        />
      </Card.Body>
    </Card>
  );
};

export default Home;
