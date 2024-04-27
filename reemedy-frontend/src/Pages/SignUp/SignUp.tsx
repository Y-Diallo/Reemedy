import { useNavigate } from "react-router-dom";
import SignInUpButton from "../../SharedComponents/SignInUpButton";
import { useState, useContext } from "react";
import { userContext } from "../../scripts/contexts";
import { setPersistence, browserSessionPersistence, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, signUp } from "../../scripts/firebase";

function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
	const { setUser } = useContext(userContext);

  const navigate = useNavigate();
  function doSignUp(){
    //add validation
    if (password !== retypePassword) {
			//passwords aren't matching
			return;
		}
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return createUserWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
        //successful sign-up
				setUser(userCredential.user);
        //TODO signUp is an unimplemented cloud function
        console.log("newSignUp: " + signUp({email: email, name: name}));
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
          <div>Name</div>
          <input onChange={(e)=>setName(e.target.value)} type="text" name="name"/>
      </div>
      <div>
          <div>Email</div>
          <input onChange={(e)=>setEmail(e.target.value)} type="email" name="email"/>
      </div>
      <div>
          <div>Password</div>
          <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password"/>
      </div>
      <div>
          <div>Retype-Password</div>
          <input onChange={(e)=>setRetypePassword(e.target.value)} type="password" name="retype_password"/>
      </div>
      <SignInUpButton proceed={doSignUp}/>
    </>
  );
}

export default SignUp;