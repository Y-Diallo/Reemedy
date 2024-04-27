import SignInUpButton from "../../SharedComponents/SignInUpButton";

function SignIn() {
  function doSignIn(){}
  return (
    <>
      <SignInUpButton proceed={doSignIn}/>
    </>
  );
}

export default SignIn;