import SignInUpButton from "../../SharedComponents/SignInUpButton";

function SignUp() {
  function doSignUp(){}
  return (
    <>
      <SignInUpButton proceed={doSignUp}/>
    </>
  );
}

export default SignUp;