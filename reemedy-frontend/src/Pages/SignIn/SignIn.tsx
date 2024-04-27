import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignInUpButton from "../../SharedComponents/SignInUpButton";
import { userContext } from "../../scripts/contexts";
import blobImage from "../../assets/Blob_Shape.png";

import {
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../scripts/firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);

  const navigate = useNavigate();
  function routeToSignUp() {
    navigate("/signUp")
  }
  function doSignIn() {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // successful sign-in
            setUser(userCredential.user);
            navigate("/home");
          }
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
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
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
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-green-600 hover:text-green"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={doSignIn}
                >
                  Sign in
                </button>
              </div>
            </form>
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

export default SignIn;
