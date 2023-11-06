import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import { DispatchContext, UserStateContext } from "../../../App";
import api from "../../../utils/axiosConfig";
import { validateEmail, validatePassword } from "../../../utils/validate";
import { useMemo } from "react";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const [emailState, setEmail] = useState("");
  const [passwordState, setPassword] = useState("");
  // const [isFirst, setIsFirst] = useState(true);
  const userState = useContext(UserStateContext);

  // // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isEmailValid = useMemo(() => validateEmail(emailState), [emailState]);
  const isPasswordValid = useMemo(
    () => validatePassword(passwordState),
    [passwordState]
  );
  const isFormValid = useMemo(
    () => isEmailValid && isPasswordValid,
    [isEmailValid, isPasswordValid]
  );
  // }

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    } else if (userState.user) {
      navigate("/", { replace: true });
    }
  }, [userState.user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await api.post("user/login", {
        email: emailState,
        password: passwordState,
      });
      console.log("로그인성공", res);
      // 유저 정보는 response의 data임.
      const user = res.data;
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      // window.location.href = "/";
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loginEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="on"
                value={emailState}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {
                  // setIsFirst(false);
                  return validateEmail(emailState);
                }}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="loginPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="on"
                value={passwordState}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => {
                  // setIsFirst(false);
                  validatePassword(passwordState);
                }}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 5글자 이상입니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" disabled={!isFormValid}>
                  로그인
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="light" onClick={() => navigate("/register")}>
                  회원가입하기
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
