import { useParams } from "react-router-dom";

import Article from "../elements/Article";
import ItemList from '../elements/ItemList';

import { useState } from "react";

function Invoice({state}) {

    const [clients, invoices] = state;

    let params = useParams();
    const [invoice, setInvoice] = useState(invoices.find(invoice => parseInt(invoice.number) === parseInt(params.invoiceId)));
    const client = clients.find(client => parseInt(client.number) === parseInt(invoice.client));


    return (
        <section>
            <header>
                <h2>Invoice #{params.invoiceId}</h2>
            </header>

            <Article props={['Client', 'Creation date', 'Due date', 'Project','Amount']}/>
            <Article props={[`${client.firstName} ${client.lastName}`, invoice.created, invoice.due, invoice.description,`${invoice.currency} ${invoice.amount.toFixed(2)}`]}/>

            <section>
                <h3>Item list</h3>
                <Article props={['Item name', 'Quantity', 'Price per Unit', 'Total']} />
                {invoice.items.map(item => <ItemList state={[item, invoice.status]} />) || <p>'No items to show.'</p>}
            </section>


        </section>
    );
}

export default Invoice;