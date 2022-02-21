import { Link } from "react-router-dom"
import { ACTIONS } from "../CONSTANTS";

import Toggle from "../elements/Toggle";

function NavBar({theme, dispatch, dispatchClients, dispatchInvoices}) {

    const toggleColorTheme = () => {
        dispatch({type: theme === 'dark' ? 'light' : 'dark'});
    }

    const resetData = (event) => {
        event.preventDefault();
        let userInput = window.prompt('If you really want to reset your data, please write "DELETE" in the following field:');
        if(userInput === 'DELETE') {
            dispatchClients({type: ACTIONS.PUSH_DATA.CLIENTS, payload: []});
            dispatchInvoices({type: ACTIONS.PUSH_DATA.INVOICES, payload: []})
            window.alert('Reset successfull');
        } else {
            window.alert('Reset aborted');
        }
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
                <button onClick={resetData}>Reset data</button>
            </div>

        </nav>
    );
}

export default NavBar;