import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Chat from "./Pages/Chat/Chat";
import Profile from "./Pages/Profile/Profile";
import SavedRemedies from "./Pages/SavedRemedies/SavedRemedies";
import Landing from "./Pages/Landing/Landing";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Navbar from "./SharedComponents/Navbar";
import { useState } from "react";
import { User } from "firebase/auth";
import { Remedy } from "./scripts/types";
import { userContext } from "./scripts/contexts";
import RemedyPopup from "./Pages/SavedRemedies/RemedyPopup";
import Disclaimer from "./Pages/Disclaimer";

function BaseRouter() {
  const [user, setUser] = useState<User | null>(null);
  const [remedy, setRemedy] = useState<Remedy | null>(null);
  return (
    <userContext.Provider value={{ user, setUser, remedy, setRemedy }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/home" element={user == null ? <SignIn /> : <Home />} />
          <Route
            path="/saved"
            element={user == null ? <SignIn /> : <SavedRemedies />}
          />
          <Route path="/chat" element={user == null ? <SignIn /> : <Chat />} />
          <Route
            path="/profile"
            element={user == null ? <SignIn /> : <Profile />}
          />
          <Route
            path="/remedy"
            element={user == null ? <SignIn /> : <RemedyPopup />}
          />
        </Routes>
        {user && <Navbar />}
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default BaseRouter;
