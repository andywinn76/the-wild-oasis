import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini"

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, isLoading} = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({email, password}, {
      onSettled: () => {
        setEmail('');
        setPassword('');
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isLoading}>{!isLoading ? "Login" : <SpinnerMini /> }</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
