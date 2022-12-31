import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, updateProfile, } from "firebase/auth";
import { auth, db } from "../firebase-config";
import Loader from "../Composant/Loader"
import Toast from "../Composant/Toast";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext()



export function UserContextProvider(props) {

    const navigate = useNavigate()

    const [currentUser, setcurrentUser] = useState()
    const [loadingData, setLoadingData] = useState(true)
    const [notify, setNotify] = useState({
        isTrue: false
    })
    const provider = new GoogleAuthProvider()

    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)
    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)
    const signInWithGoogle = () => signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user", user)
        console.log("credential", credential)
        console.log("token", token)
        setcurrentUser(user)
        return;

    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });




    const updateProfilePseudo = (pseudo) => {
        if (pseudo !== "" || null || undefined) {
            updateProfile(currentUser, {
                displayName: pseudo
            })
        }
    }

    const addFavoris = async (pseudo, description, imageLink, uuid) => {
        try {
            const cred = await setDoc(doc(db, currentUser.email, uuid), {
                pseudo: pseudo,
                description: description,
                imageLink: imageLink,
                uuid: uuid
            })
            console.log(cred)
        } catch (err) {

        }

    }

    const removeFavoris = async (uuid) => {
        try {
            const cred = await deleteDoc(doc(db, currentUser.email, uuid))
            console.log(cred)
        } catch (err) {

        }

    }

    const getFavoris = async () => {
        const querySnapshot = await getDocs(collection(db, currentUser.email));
        var favoris = []
        querySnapshot.forEach((doc) => {

            favoris.push(doc.data())
        });
        return favoris

    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setcurrentUser(currentUser)
            setLoadingData(false)

        })
        return unsubscribe;
    }, [])
    return (
        <UserContext.Provider value={{ signIn, signUp, currentUser, updateProfilePseudo, setNotify, addFavoris, getFavoris, removeFavoris, signInWithGoogle }}>
            <Toast notify={notify} setNotify={setNotify} />
            {!loadingData ? props.children : <Loader />}
        </UserContext.Provider>




    )

}
