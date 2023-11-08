import { ErrorBoundary } from "react-error-boundary";
import LoginForm from "./LoginForm";
import img from "../../../components/common/header/logo0.png";

const Login = () => {
  return (
    <ErrorBoundary
      fallback={
        <>
          <h1>
            로그인에 실패했습니다
            <img src={img} alt="err" />
            ...
          </h1>
        </>
      }
    >
      <LoginForm />
    </ErrorBoundary>
  );
};
export default Login;
