import { Link } from "react-router-dom"

import Toggle from "../elements/Toggle";

function NavBar({theme, dispatch}) {

    const toggleColorTheme = () => {
        dispatch({type: theme === 'dark' ? 'light' : 'dark'});
    }

    return (
        <nav className="nav_bar">
            <div className='button_group'>
                <Link to="/">Home</Link>
                <Link to="clients">Clients</Link>
                <Link to="invoices">Invoices</Link>
            </div>

            <div className='button_group'>
                <Toggle toggleColorTheme={toggleColorTheme} />
                <Link to="profile">Profile</Link>
            </div>

        </nav>
    );
}

export default NavBar;