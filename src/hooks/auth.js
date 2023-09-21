import { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { GALLERY, LOGIN } from "../lib/routes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";


export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isDataLoading, setDataLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setDataLoading(true);
      const ref = doc(db, "users", authUser.uid);
      const docSnapshot = await getDoc(ref);

      setUser(docSnapshot.data());
      setDataLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setDataLoading(false);
    }
  }, [authLoading]);

  return { user, isDataLoading, error };
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


function useLogout() {
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    const auth = getAuth();

    try {
      setIsLogoutLoading(true); 
      await signOut(auth);
      navigate(LOGIN);
      toast.success("Logout Successful!");
      setIsLogoutLoading(false);
    } catch (error) {
      setIsLogoutLoading(false);
      toast.success("Logout Unsuccessful!");
    }
  };

  return { logout, isLogoutLoading };
}

export default useLogout;