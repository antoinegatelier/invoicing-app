import { useParams } from "react-router-dom";

import Article from "../elements/Article";

import { useState } from "react";

function Invoice({state}) {

    const [clients, invoices] = state;

    let params = useParams();
    const [invoice, setInvoice] = useState(invoices.find(invoice => +invoice.number === +params.invoiceId))

    return (
        <section>
            <header>
                <h2>Invoice #{params.invoiceId}</h2>
            </header>

            <Article props={[invoice.created, invoice.due, `${invoice.currency} ${invoice.amount.toFixed(2)}`]}/>
        </section>
    );
}

export default Invoice;