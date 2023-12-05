import { authorize } from "../../services/endpoints/users";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import Button from "../Button/Button";

function AuthForm() {
  const { authorized, setAuthorized } = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const loginData = {
      login: event.target.login.value,
      password: event.target.password.value,
    };

    authorize(loginData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setAuthorized(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOutHandler = () => {
    setAuthorized(false);
    localStorage.removeItem("token");
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {!authorized && (
        <>
          <div className={classes.control}>
            <input
              className={classes.input}
              type="login"
              name="login"
              placeholder="Login"
              required
            />
            <input
              className={classes.input}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </>
      )}
      {authorized && (
        <Button variant="warning" type="button" onClick={logOutHandler}>
          Log out
        </Button>
      )}
    </form>
  );
}

export default AuthForm;
