import { Link } from "react-router-dom";
import { fetchClients, fetchInvoices } from "../fetchData";

import { ACTIONS, STATUS } from '../CONSTANTS';

function Home({ state, actions }) {

    const [clients, invoices] = state;
    const {dispatchInvoices, dispatchClients} = actions;

    const due = invoices.filter(invoice => invoice.status === STATUS.PENDING);
    const paid = invoices.filter(invoice => invoice.status === STATUS.PAID);
    const draft = invoices.filter(invoice => invoice.status === STATUS.DRAFT);

    const handleDataPush = async (event, id) => {
        event.preventDefault();
        
        const feedClients = await fetchClients();
        const feedInvoices = await fetchInvoices();
        switch(id) {
            case('clients'):
                dispatchClients({type: ACTIONS.PUSH_DATA.CLIENTS, payload: feedClients});
                break;
            case('invoices'):
                dispatchInvoices({type: ACTIONS.PUSH_DATA.INVOICES, payload: feedInvoices});
                break;
            default:
                throw new Error(`Data push failed`);
        }
    }


    return (
        <section>
            <header>
                <h2>Home</h2>
            </header>
            <h3>Invoices overview</h3>
            <figure data-testid="dueInvoices">There {due.length > 1 ? 'are' : 'is'} {due.length} due invoice{due.length > 1 ? 's' : ''}.</figure>
            <figure>There {paid.length > 1 ? 'are' : 'is'} {paid.length} paid invoice{paid.length > 1 ? 's' : ''}.</figure>
            <figure>There {draft.length > 1 ? 'are' : 'is'} {draft.length} invoice{draft.length > 1 ? 's' : ''} in your drafts.</figure>
            <div className="button_group">
                {invoices.length === 0 ? <button onClick={event => handleDataPush(event, 'invoices')}>Import placeholder data</button> : null}
                <Link to="/invoices" >See all invoices</Link>
            </div>

            <h3>Clients overview</h3>
            <figure>You have {clients.length} client{clients.length > 1 ? 's' : ''}.</figure>
            <div className="button_group">
                {clients.length === 0 ? <button onClick={event => handleDataPush(event, 'clients')}>Import placeholder data</button> : null}
                <Link to="/clients" >See all clients</Link>
            </div>

        </section>
    );
}

export default Home;