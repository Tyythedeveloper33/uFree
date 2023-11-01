import { React } from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

// import AccountButton from "../AccountButton";
import LogoutButton from "../LogoutButton";
// contains the elements that will be present inside the header
// element ids with DEBUG are dev only elements and should be removed in working product
const HeaderNavBar = ({ logoutFunc, loggedIn }) => {
    console.log();
    return (
        <nav id="content_header_nav">
            <Link to="/" className="nav_brand">uFree</Link>
            {/* <Link to="/"><div id="DEBUG_button_homepage" className="header_nav_button">Home</div></Link> */}
            {/* <Link to="/login"><div id="button_login" className="header_nav_button">Login</div></Link> */}
            {/* <Link to="/signup"><div id="button_login" className="header_nav_button">Sign Up</div></Link> */}
            {/* <Link to="/dashboard"><div id="DEBUG_button_dashboard" className="header_nav_button">Dashboard</div></Link> */}
            {/* <Link to="/events/create"><div id="button_createEvent"className="header_nav_button">Create Event</div></Link> */}
            {/* <Link to="/events"><div id="DEBUG_button_eventPage" className="header_nav_button">Search Event</div></Link> */}
            {loggedIn && (
                <div style={{
                    display: 'flex',
                }}>
                    <span className="account_button">{Auth.getProfile().data.username}</span>
                    <LogoutButton logoutFunc={logoutFunc} />
                </div>
            )}
        </nav>
    )
}

export default HeaderNavBar;