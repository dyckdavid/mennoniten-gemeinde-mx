/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/router";
import AuthContext from '../context/AuthContext'


export const useAuthUser = () => {
    const {push, pathname } = useRouter();

    const { setisLogged } = useContext(AuthContext);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            let userLogged = user === null ? false : true;

            if (!userLogged) {
                push("/signin");
                setisLogged(false);
            } else {
                setisLogged(true);
                if (pathname === "/signin") {
                    push("/")
                }

            }
        });
    }, []);
}

