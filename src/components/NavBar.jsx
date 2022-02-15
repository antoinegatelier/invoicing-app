import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav className="nav_bar">
            <div className='button_group'>
                <button><Link to="/">Home</Link></button>
                <button><Link to="clients">Clients</Link></button>
                <button><Link to="invoices">Invoices</Link></button>
            </div>

            <div className='button_group'>
                <button><Link to="settings">Settings</Link></button>
                <button><Link to="profile">Profile</Link></button>
            </div>

        </nav>
    );
}

export default NavBar;