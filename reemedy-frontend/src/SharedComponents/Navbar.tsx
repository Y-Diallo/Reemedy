import { Link, useLocation } from "react-router-dom";

const navbarPages : string[] = ["home", "saved", "chat", "profile"];

function Navbar() {
  const page = useLocation().pathname.split('/')[1];
  if (!navbarPages.some((p) => p.includes(page)) || ["","/"].includes(page)) {
    return null;
  }
  return (
    <nav>
      <ul className="">
        <li>
          <Link to="/home">
              <div style={page == "home" ? {color:'#000000'}:{}}/>
          </Link>
        </li>
        <li>
          <Link to="/saved">
              <div style={page == "saved" ? {color:'#000000'}:{}}/>
          </Link>
        </li>
        <li>
          <Link to="/profile">
              <div style={page == "profile" ? {color:'#000000'}:{}}/>
          </Link>
        </li>
        <li>
          <Link to="/chat">
              <div style={page == "chat" ? {color:'#000000'}:{}}/>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;