import { ErrorBoundary } from "react-error-boundary";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <ErrorBoundary fallback={<div>로그인에 실패했습니다</div>}>
      <LoginForm />
    </ErrorBoundary>
  );
};
export default Login;
