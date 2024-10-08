import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { userContext } from "../../scripts/contexts";
import {
  setPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, signUp } from "../../scripts/firebase";
import blobImage from "../../assets/Blob_Shape.png";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const { setUser } = useContext(userContext);

  const navigate = useNavigate();
  function routeToSignUp() {
    navigate("/signIn");
  }
  function doSignUp() {
    console.log("reached");
    //add validation
    if (password !== retypePassword) {
      //passwords aren't matching
      return;
    }
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            //successful sign-up
            setUser(userCredential.user);
            //TODO signUp is an unimplemented cloud function
            console.log("newSignUp: " + signUp({ email: email, name: name }));
            navigate("/disclaimer");
          },
        );
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  return (
    <>
      <div className="relative text-black w-screen h-screen flex flex-col justify-center p-8 overflow-hidden">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm z-20">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create An Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm z-20">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Retype Password
                </label>
                <div className="mt-2">
                  <input
                    id="password2"
                    name="password"
                    type="password"
                    required
                    className="block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setRetypePassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={doSignUp}
                >
                  Sign Up
                </button>
              </div>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              <div
                className="font-semibold leading-6 text-green-600 hover:text-green-500"
                onClick={routeToSignUp}
              >
                Need to Sign Up?
              </div>
            </p>
          </div>
        </div>

        <img
          src={blobImage}
          className="absolute left-0 object-cover transform scale-150 -top-80 -left-20 z-2"
          alt="Blob 1"
        />
        <img
          src={blobImage}
          className="absolute -bottom-80 -right-40 object-cover transform scale-150 mb-0 mr-0 mb-0 z-1"
          alt="Blob 2"
        />
      </div>
    </>
  );
}

export default SignUp;
