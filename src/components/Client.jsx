import { useState } from "react";
import { useParams } from "react-router-dom";
import Article from "../elements/Article";

function Client({clients, invoices}) {

    let params = useParams();
    const [client, setClient] = useState(clients.filter(client => +client.number === +params.clientId)[0]);



    return ( 
        <section>
            <header>
                <h2>Client #{params.clientId}</h2>
            </header>

            <Article key='client' props={[client.firstName, client.lastName, client.email, client.tel]}/>
            <section>
                <header>
                    <h3>Invoices</h3>
                </header>
                  <Article key='invoice' props={['Number', 'Created on', 'Due date', 'Amount']}/>
                {invoices.filter(invoice => (+invoice.client === +params.clientId) && (invoice.status !== 'Draft') ).map(invoice => <Article key={params.clientId} props={[`#${invoice.number}`, invoice.created, invoice.due, `${invoice.currency} ${invoice.amount}`]} />)}
            </section>
          
        </section>

    );
}

export default Client;