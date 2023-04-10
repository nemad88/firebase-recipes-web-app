import app from "./FirebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail as sendPasswordResetEmailFireBase,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const auth = getAuth(app);

const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
  return signOut(auth);
};

const sendPasswordResetEmail = (email) => {
  return sendPasswordResetEmailFireBase(auth, email);
};

const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (handleAuthChange) => {
  //   console.log("c", handleAuthChange);

  auth.onAuthStateChanged((user) => {
    handleAuthChange(user);
  });
};

const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendPasswordResetEmail,
  loginWithGoogle,
  subscribeToAuthChanges,
};

export default FirebaseAuthService;
