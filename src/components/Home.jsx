import { Link } from "react-router-dom"

function Home({clients, invoices}) {

    const due = invoices.filter(invoice => invoice.status === 'Pending');
    const paid = invoices.filter(invoice => invoice.status === 'Paid');
    const draft = invoices.filter(invoice => invoice.status === 'Draft');


    return (
        <section>
            <header>
                <h2>Home</h2>
            </header>
            <h3>Invoices overview</h3>
            <figure>There {due.length > 1 ? 'are' : 'is'} {due.length} due invoice{due.length > 1 ? 's' : ''}.</figure>
            <figure>There {paid.length > 1 ? 'are' : 'is'} {paid.length} paid invoice{paid.length > 1 ? 's' : ''}.</figure>
            <figure>There {draft.length > 1 ? 'are' : 'is'} {draft.length} invoice{draft.length > 1 ? 's' : ''} in your drafts.</figure>
            <button><Link to="/invoices" >See all invoices</Link></button>
            <h3>Clients overview</h3>
            <figure>You have {clients.length} client{clients.length > 1 ? 's' : ''}.</figure>
            <button><Link to="/clients" >See all clients</Link></button>
        </section>
    );
}

export default Home;