import { useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/router";
import AuthContext from '../context/AuthContext'

export const useAuthUser = () => {
  const { push, pathname } = useRouter();

  const { isLogged, setisLogged } = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      let userLogged = user === null ? false : true;

      if (!userLogged) {
        push("/signin");
        setisLogged(false);
      } else {
        setisLogged(true);
        if (pathname === "/signin") {
          push("/");
        }
      }
    });
  }, []);

  return { isLogged }; // Add this line to return the isLogged property as part of an object
}
