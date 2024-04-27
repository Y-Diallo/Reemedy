import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./Pages/Home/App";
import Chat from "./Pages/Chat/Chat";

function BaseRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default BaseRouter;
