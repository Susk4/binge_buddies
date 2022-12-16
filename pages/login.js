import LoginForm from "../components/Login/LoginForm";
import { withPublic } from "../src/hook/route";

 function Login({auth}) {
  
  const {loginWithGoogle, error} = auth;
  return (
    <div className="">
      <div className="">
        <LoginForm loginWithGoogle={loginWithGoogle}/>
      </div>
      
    </div>
  );
}

export default withPublic(Login);