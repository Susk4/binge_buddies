import { getApp, getAuth } from "../config/firebase";
import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

class AuthService {
  constructor(firebaseApp) {
    this.auth = getAuth(firebaseApp);
  }

  waitForUser(callback) {
    return onAuthStateChanged(this.auth, (userCred) => {
      callback(userCred);
    });
  }

  loginWithGoogle() {
    return this.login(new GoogleAuthProvider());
  }
  loginWithFacebook() {
    return this.login(new FacebookAuthProvider());
  }
  login(provider){
    return signInWithPopup(this.auth, provider)
      .then((userCred) => {
        return {
          user: userCred.user,
        };
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/account-exists-with-different-credential") {
          return {
            error:
              "Your email is already registered with a different provider, please use that provider to login.",
          };
        }
        else if (error.code === "auth/popup-closed-by-user") {
          return {
            error:
              "Login flow was interrupted, please try again.",
          };
        }
        else {
          return {
            error:
              "Something went wrong, please try again.",
          };
        }
      });
  }

  async logout() {
    await signOut(this.auth);
  }
}

export default new AuthService(getApp());
