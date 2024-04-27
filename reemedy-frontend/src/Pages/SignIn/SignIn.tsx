import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SignInUpButton from "../../SharedComponents/SignInUpButton";
import { userContext } from "../../scripts/contexts";
import { setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../scripts/firebase";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
	const { setUser } = useContext(userContext);

  const navigate = useNavigate();
  function doSignIn(){
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // successful sign-in
				setUser(userCredential.user);
        navigate("/home");
      })
    })
    .catch((error) => {
      console.warn(error);
    });
  }
  return (
    <>
      <div>
          <div>Email</div>
          <input onChange={(e)=>setEmail(e.target.value)} type="email" name="email"/>
      </div>
      <div>
          <div>Password</div>
          <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" />
      </div>
      <SignInUpButton proceed={doSignIn}/>
    </>
  );
}

export default SignIn;