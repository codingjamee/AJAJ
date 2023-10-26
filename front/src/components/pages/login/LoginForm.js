import React, { useState, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../utils/api";
import { DispatchContext, UserStateContext } from "../../../App";
import {
  emailValidateReducer,
  paswordValidateReducer,
} from "../../hooks/validatorReducer";
import api from "../../utils/axiosConfig";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const [emailState, dispatchEmail] = useReducer(emailValidateReducer, {
    value: "",
    isEmailValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(paswordValidateReducer, {
    value: "",
    isPasswordValid: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const userState = useContext(UserStateContext);

  // // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const { isEmailValid, value: emailValue } = emailState;
  const { isPasswordValid, value: passwordValue } = passwordState;

  useEffect(() => {
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: false });
      return;
    } else if (userState.user) {
      navigate("/", { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "user/login" 엔드포인트로 post요청함.
    const res = await api.post("user/login", {
      email: emailValue,
      password: passwordValue,
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
                value={emailState.value}
                onChange={(e) =>
                  dispatchEmail({
                    type: "EMAIL_VALIDATOR",
                    value: e.target.value || "",
                  })
                }
                onBlur={() => dispatchEmail({ type: "INPUT_BLUR" })}
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
                value={passwordState.value}
                onChange={(e) =>
                  dispatchPassword({
                    type: "PASSWORD_VALIDATOR",
                    value: e.target.value || "",
                  })
                }
                onBlur={() => dispatchPassword({ type: "INPUT_BLUR" })}
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
