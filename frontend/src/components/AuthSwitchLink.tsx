interface Prop {
  isRegisterPage: boolean;
}
function AuthSwitchLink({ isRegisterPage }: Prop) {
  const haveAnAccount = isRegisterPage ? "Already" : "Don't";
  const redirectLink = isRegisterPage ? "login" : "register";
  const otherPageName = isRegisterPage ? "Login" : "Register";
  return (
    <p className="text-sm text-center text-amber-700 mt-6">
      {haveAnAccount} have an account?{" "}
      <a
        className="underline text-amber-900 hover:text-amber-700"
        href={`/${redirectLink}`}
      >
        {otherPageName}
      </a>
    </p>
  );
}

export default AuthSwitchLink;
