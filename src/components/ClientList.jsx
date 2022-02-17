import { Link } from "react-router-dom";

import Article from "../elements/Article";

function ClientList({ state }) {

    const [clients, invoices] = state;
    
    return (
        <section className="invoice_list">
            <header>
                <h2>Clients</h2>
                
            </header>

            <button onClick={event => { event.preventDefault() }} ><Link to="/new_client" >New Client</Link></button>

            <Article key='title' props={[
                'Number',
                'Name',
                'Invoices',
                'Total',
                ''
            ]} />

            {clients.map(client => {
                const getInvoices = invoices.filter(invoice => client.number === +invoice.client);
                let sum = 0;
                for (const invoice of getInvoices) {
                    sum += invoice.amount;
                }

                return (

                    <Article key={client.number} props={[
                        `#${client.number}`,
                        `${client.firstName} ${client.lastName}`,
                        `${getInvoices.length}`,
                        `€ ${sum.toFixed(2)}`,
                        <button className="list_showmore"><Link to={`/clients/${client.number}`} key={client.number}>Show more</Link></button>
                    ]} />
                    
                )
            })}
        </section>
    );
}

export default ClientList;