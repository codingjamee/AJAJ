import React, { useContext, useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import { PortfolioOwnerDataContext } from "../Portfolio";
import api from "../../../../utils/axiosConfig";

import defaultImg from "../../../common/header/logo.png";

function UserEditForm({ user, setIsEditing, setUser }) {
  const [image, setImage] = useState("");
  const [imageBase, setImageBase] = useState(defaultImg);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);

  const onAddImage = (e) => {
    console.log(e);
    setImage(e.target.files);

    // setImageBase([]);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        const base64Str = base64.toString();
        setImageBase([base64Str]);
        setImage(e.target.files[0]);
      }
    };
  };

  //제출버튼 클릭시 patch메서드 실행
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("이미지를 등록해주세요");
      return;
    }

    const userProfileData = new FormData();
    userProfileData.append("image", image);
    userProfileData.append("name", name);
    userProfileData.append("email", email);
    userProfileData.append("description", description);

    try {
      const res = await api.patch(
        `users/${portfolioOwnerData.id}`,
        userProfileData
      );

      const updatedUserImgUrl = res.userImgUrl;

      if (res.status === 200) {
        setUser((prev) => {
          return {
            ...prev,
            name,
            email,
            description,
            updatedUserImgUrl,
          };
        });
        setName("");
        setEmail("");
        setDescription("");
        setIsEditing(false);
      } else if (res.status !== 200) {
        // throw new Error("PATCH 요청이 실패하였습니다.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card border="warning" className="mb-2">
      <Card.Body>
        <Card.Subtitle
          className="mb-2 text-muted"
          style={{ width: "100%", display: "flex" }}
        >
          <img
            alt="userImage"
            src={imageBase}
            style={{ width: "100%", display: "flex" }}
          />
        </Card.Subtitle>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId="useEditPhoto" className="mb-3">
            <Form.Control type="file" onChange={(e) => onAddImage(e)} />
          </Form.Group>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col>
              <Button variant="outline-primary" type="submit" className="me-3">
                Save
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
