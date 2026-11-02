import {useContext} from 'react';
import {Link} from "react-router-dom";
import {ColorModeContext} from '../../context/ColorModeContext';
import {AuthContext} from '../../context/AuthContext';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";

function NavBar() {
    const {mode, toggleColorMode} = useContext(ColorModeContext);
    const {user, logout} = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar__left">
                <div className="navbar__user-profile">
                    <FontAwesomeIcon icon={faAt} className="navbar__at-icon"/>
                    <Link to="/posts" className="navbar__user">
                        {user ? user.email.split('@')[0] : "Guest User"}
                    </Link>
                </div>
                <Link to="/posts" className="navbar__link">Blog</Link>
                {user && <Link to="/favorites" className="navbar__link">Favorites</Link>}
                {user && <Link to="/about-me" className="navbar__link">About Me</Link>}
            </div>
            <div className="navbar__right">
                {user
                    ? (
                        <button onClick={logout} className="navbar__logout-btn" title="Logout">
                            <FontAwesomeIcon icon={faRightFromBracket}/> Logout
                        </button>)
                    : (<Link to="/login" className="navbar__link">Login</Link>
                    )}
                <button className="navbar__theme-btn" onClick={toggleColorMode}>
                    {mode === 'light' ? 'Light mode' : 'Dark mode'}
                </button>
            </div>
        </nav>
    );
}

export default NavBar;