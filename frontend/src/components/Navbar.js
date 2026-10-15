import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import { DEMO_MODE } from "../api/axios";
import RoomifyLogo from "./RoomifyLogo";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const leave = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="studio-nav">
      <div className="studio-nav-inner">
        <Link to="/rooms" aria-label="Roomify home">
          <RoomifyLogo size={42} />
        </Link>
        <nav aria-label="Main navigation" className="studio-links">
          <NavLink to="/rooms">Spaces</NavLink>
          <NavLink to="/bookings">My bookings</NavLink>
          {!DEMO_MODE && <><NavLink to="/smart-scheduler">Smart scheduler</NavLink>
          <details className="studio-more">
            <summary>More</summary>
            <div className="studio-menu">
              <Link to="/maintenance">Maintenance</Link>
              <Link to="/notifications">Notifications</Link>
              <Link to="/faq">Help & FAQ</Link>
              <Link to="/profile">My profile</Link>
              {user?.role?.toLowerCase() === "admin" && (
                <>
                  <Link to="/analytics">Analytics</Link>
                  <Link to="/users">Users</Link>
                  <Link to="/reports">Reports</Link>
                  <Link to="/audit-logs">Audit logs</Link>
                </>
              )}
            </div>
          </details></>}
        </nav>
        {DEMO_MODE ? <span className="studio-demo-persona">{user?.role === "admin" ? "Admin view" : "Member view"}</span> : <div className="studio-account">
          <Link className="studio-button studio-account-link" to="/profile">
            {user?.name?.split(" ")[0] || "My account"}
          </Link>
          <button
            type="button"
            onClick={leave}
            className="studio-icon-button"
            aria-label="Sign out"
          >
            <LogOut size={19} />
          </button>
        </div>}
      </div>
    </header>
  );
};

export default Navbar;
