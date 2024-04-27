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
import { userContext } from "./scripts/contexts";

function BaseRouter() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <userContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={
            user == null? <SignIn/>:<Home/>}/>
          <Route path="/saved" element={
            user == null? <SignIn/>:<SavedRemedies/>}/>
          <Route path="/chat" element={
            user == null? <SignIn/>:<Chat/>}/>
          <Route path="/profile" element={
            user == null? <SignIn/>:<Profile/>}/>
        </Routes>
        {user && (
          <Navbar />
        )}
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default BaseRouter;
