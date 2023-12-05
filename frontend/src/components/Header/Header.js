import AuthForm from "../AuthForm/AuthForm";
import classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <h1>Bookstore</h1>
      <AuthForm />
    </header>
  );
}

export default Header;
