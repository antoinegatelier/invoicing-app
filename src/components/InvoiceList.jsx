import { Link } from "react-router-dom";

import Article from "../elements/Article";

import { useState } from "react";

function InvoiceList({ state }) {

    const [filter, setFilter] = useState('');

    const [clients, invoices] = state;

    const handleFilter = (event) => {
        setFilter(event.target.value);
    }

    return (
        <section>
            <header>
                <h2>Invoices</h2>
                <select onChange={handleFilter} name="Filter by status" value={filter}>
                    <option value="">Filter by status</option>
                    <option value="Draft">Draft</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                </select>
                <Link to="/new_invoice" >New Invoice</Link>
            </header>
            <figure>There are {invoices.length} total invoices</figure>

            <Article props={['Number', 'Due date', 'Client', 'Amount', 'Status', '']} />

            {invoices.filter(invoice => filter === "" || filter === invoice.status).map(invoice => {
                let person = clients.find(client => client.number === +invoice.client);
                return (
                    <Article key={invoice.number}
                        props={
                            [
                                `#${invoice.number}`,
                                `Due ${invoice.due}`,
                                `${person.firstName} ${person.lastName}`,
                                `${invoice.currency} ${invoice.amount.toFixed(2)}`,
                                `${invoice.status}`,
                                <Link to={`/invoices/${invoice.number}`} >See more</Link>
                            ]
                        }
                    />
                )
            })}

        </section>
    );
}

export default InvoiceList;