import { Link } from "react-router-dom";
import { PRODUCTS } from '../CONSTANTS';

import Article from "../elements/Article";

function ClientList({ state }) {

    const [clients, invoices] = state;
    
    return (
        <section className="invoice_list">
            <header>
                <h2>Clients</h2>
                <Link to="/new_client" >New Client</Link>
            </header>



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
                    sum += invoice.items.length >0 ? invoice.items.map(item => PRODUCTS[item.name].pricePerUnit * item.quantity).reduce((a, b) => a+b) : 0;
                }

                return (

                    <Article key={client.number} props={[
                        `#${client.number}`,
                        `${client.firstName} ${client.lastName}`,
                        `${getInvoices.length}`,
                        `€ ${sum.toFixed(2)}`,
                        <Link to={`/clients/${client.number}`} key={client.number}>&#62;</Link>
                    ]} />
                    
                )
            })}
        </section>
    );
}

export default ClientList;