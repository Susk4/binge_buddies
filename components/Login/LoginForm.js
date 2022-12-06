import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const LoginForm = (props) => {
  return (
    <div className="">
      <div>
        <LoginCard google={props.loginWithGoogle} />
      </div>
    </div>
  );
};

export default LoginForm;
