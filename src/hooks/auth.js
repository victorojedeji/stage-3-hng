import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { GALLERY, LOGIN } from "../lib/routes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export function useAuth() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser.uid);
      } else {
        setUser(null);
      }
      setUserLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, userLoading };
}

export function useLogin() {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = GALLERY }) {
    setIsLoginLoading(true);
    // const emailInUse = await isEmailInUse(email);
    
    // if (!emailInUse) {
    //   toast.error("Email does not exit!");
    //   setIsLoginLoading(false);
    // } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login Successful!");
        navigate(redirectTo);
      } catch (error) {
        toast.error("Login Failed!");
        setIsLoginLoading(false);
      }
      return false;
  
      setIsLoginLoading(false);
      return true;
    }
    
    return { login, isLoginLoading };
  }

// }

// export function useRegister() {
//   const [isRegisterLoading, setIsRegisterLoading] = useState(false);
//   const navigate = useNavigate();

//   async function register({
//     username,
//     email,
//     password,
//     redirectTo = DASHBOARD,
//   }) {
//     setIsRegisterLoading(true);

//     const usernameExists = await isUserExist(username);

//     if (usernameExists) {
//       toast.error("Username already exists!");
//       setIsRegisterLoading(false);
//     } else {
//       try {
//         const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF5733", "#33FF57"];
//         const randomColor = colors[Math.floor(Math.random() * colors.length)];

//         const response = await createUserWithEmailAndPassword(auth, email, password);

//         await setDoc(doc(db, "users", response.user.uid), {
//           id: response.user.uid,
//           username: username.toLowerCase(),
//           avatar: "",
//           bio: "",
//           date: Date.now(),
//           bgColor: randomColor, 
//           email: email,
//         });

//         toast.success("Registration Successful!");

//         navigate(redirectTo);
//       } catch (error) {
//         if (error) throw error;
//         toast.error("Registration Failed!");
//       } finally {
//         setIsRegisterLoading(false);
//       }
//     }
//   }

//   return { register, isRegisterLoading };
// }


export function useLogout() {
  const [signOut, isLogoutLoading] = useSignOut(auth);
  const navigate = useNavigate();

  async function logout() {
    if (await signOut()) {
      toast.success("Logout Successful!");
      navigate(LOGIN);
    } else {
      toast.error("Logout Unsuccessful!"); 
    }
  }

  return { logout, isLogoutLoading };
}