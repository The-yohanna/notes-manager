import { ButtonPrimary } from "../../components/ButtonPrimary/ButtonPrimary";
import { Input } from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import s from "./style.module.css";
import { AuthLayout } from "../../layout/AuthLayout/AuthLayout";
import { useState } from "react";
import { AuthAPI } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/auth/auth-slice";
import { toast } from "../../utils/sweet-alerts";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await AuthAPI.signin(email, password);
      dispatch(setUser(user));
      await toast("success", "Authentication successful");
      navigate("/");
    } catch (err) {
      toast("error", err.message);
    }
  };

  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Signin <br />
        to access your team notes
      </h2>
      <form onSubmit={submit} className={s.formGroup}>
        <Input placeholder={"Email"} onTextChange={setEmail} />
        <Input
          placeholder={"Password"}
          type="password"
          onTextChange={setPassword}
        />
        <ButtonPrimary type="submit" className={s.button}>
          Sign in!
        </ButtonPrimary>
        <span>
          Don't have an account yet ? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
    </div>
  );
  return <AuthLayout>{form}</AuthLayout>;
}
