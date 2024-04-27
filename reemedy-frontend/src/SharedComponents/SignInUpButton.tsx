
type SignInUpButtonProps={
  proceed : ()=>void;
}

function SignInUpButton({proceed}:SignInUpButtonProps) {
  return (
    <button onClick={()=>proceed()}
    className="w-10 rounded-2xl absolute right-1 bottom-1">👉</button>
  );
}

export default SignInUpButton;