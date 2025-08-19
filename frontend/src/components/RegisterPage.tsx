import PageLayout from "./PageLayout";
import AuthForm from "./AuthForm";
import { api } from "../api";
import AuthSwitchLink from "./AuthSwitchLink";
import WelcomeLogo from "./WelcomeLogo";

function RegisterPage() {
  const handleSubmit = async (username: string, pwd: string) => {
    const res = await api.post("/auth/register", {
      username: username,
      password: pwd,
    });
    console.log("Registered, ", res);
  };
  return (
    <PageLayout>
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <WelcomeLogo />
        <AuthForm handleAuthSubmit={handleSubmit} buttonLabel="Register" />
        <AuthSwitchLink isRegisterPage={true}></AuthSwitchLink>
      </div>
    </PageLayout>
  );
}

export default RegisterPage;
