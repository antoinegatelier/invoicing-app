import { Link } from "react-router-dom";

import Article from "../elements/Article";

function InvoiceList({ invoices, clients }) {

    return (
        <section>
            <header>
                <h2>Invoices</h2>
                <select name="Filter by status" id="">
                    <option value="">Filter by status</option>
                    <option value="Draft">Draft</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                </select>
                <button><Link to="/new_invoice" >New Invoice</Link></button>
            </header>
            <figure>There are {invoices.length} total invoices</figure>

            <Article props={['Number', 'Due date', 'Client', 'Amount', 'Status', '']} />

            {invoices.map(invoice => {
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
                                <button className="list_showmore"><Link to={`/invoices/${invoice.number}`} >See more</Link></button>
                            ]
                        }
                    />
                )
            })}

        </section>
    );
}

export default InvoiceList;