import { useEffect, useRef, useState, type FormEvent } from "react";
import Button from "./Button";

interface Prop {
  handleAuthSubmit: (username: string, pwd: string) => void;
  buttonLabel: string;
}

function AuthForm({ handleAuthSubmit, buttonLabel }: Prop) {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const usernameRef = useRef<HTMLInputElement | null>(null);

  // to focus on input of username when first rendering the component
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAuthSubmit(username, pwd);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-amber-800 mb-1"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          required
          className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600"
          ref={usernameRef}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-amber-800 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600"
          required
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
      </div>
      <Button type="submit">{buttonLabel}</Button>
    </form>
  );
}

export default AuthForm;
