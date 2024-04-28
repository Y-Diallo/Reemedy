import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type SignInUpButtonProps = {
  proceed: () => void;
};

function SignInUpButton({ proceed }: SignInUpButtonProps) {
  return (
    <button
      onClick={() => proceed()}
      className="w-10 bg-white text-black rounded-2xl absolute right-1 bottom-1 z-20"
    >
      {" "}
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  );
}

export default SignInUpButton;
