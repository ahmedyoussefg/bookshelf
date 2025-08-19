import PageLayout from "./PageLayout";
import AuthForm from "./AuthForm";
import { api } from "../api";
import AuthSwitchLink from "./AuthSwitchLink";
import WelcomeLogo from "./WelcomeLogo";

function LoginPage() {
  const handleSubmit = async (username: string, pwd: string) => {
    const res = await api.post("/auth/login", {
      username: username,
      password: pwd,
    });
    console.log("Logged in, ", res);
  };
  return (
    <PageLayout>
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <WelcomeLogo />
        <AuthForm handleAuthSubmit={handleSubmit} buttonLabel="Log In" />
        <AuthSwitchLink isRegisterPage={false}></AuthSwitchLink>
      </div>
    </PageLayout>
  );
}

export default LoginPage;
