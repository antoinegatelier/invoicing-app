import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Article from "../elements/Article";

function Client({ state }) {

    const [clients, invoices] = state;
    let params = useParams();
    const [client, setClient] = useState(clients.find(client => +client.number === +params.clientId));

    useEffect(() => {
        setClient(clients.find(client => +client.number === +params.clientId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    return ( 
        <section>
            <header>
                <h2>Client #{params.clientId}</h2>
            </header>

            <Article key='title_01' props={["First name", "Last name", "Email", "Phone"]} />
            <Article key='data_01' props={[client.firstName, client.lastName, client.email, client.tel]}/>
            <Article key='title_02' props={["Street", "Postcode", "City", "Country"]} />
            <Article key='client_02' props={[client.street, client.postcode, client.city, client.country]}/>
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