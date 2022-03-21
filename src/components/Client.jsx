import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ACTIONS, PRODUCTS } from "../CONSTANTS";
import Article from "../elements/Article";
import EditArticle from "../elements/EditArticle";

function Client({ state, dispatch }) {

    let params = useParams();
    let navigate = useNavigate();

    const [clients, invoices] = state;
    const [client, setClient] = useState(clients.find(client => +client.number === +params.clientId));
    const [dispatchClients, dispatchInvoices] = dispatch;
    const [isEditMode, setIsEditMode] = useState(false)
    
    const toggleEditMode = (event) => {
        event.preventDefault();
        setIsEditMode(!isEditMode);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        let userInput = window.prompt('If you proceed, all invoices associated with this client will also be deleted from memory. Please confirm by typing "DELETE" or abort');
        if(userInput === 'DELETE') {
            invoices.filter(invoice => parseInt(invoice.client) === parseInt(client.number)).forEach(invoice => dispatchInvoices({type: ACTIONS.INVOICES.REMOVE, payload: {id: invoice.number}}));
            dispatchClients({type: ACTIONS.CLIENTS.REMOVE, payload: {id: client.number}});
            navigate("../clients");
            window.alert('Client and all related invoices were deleted from memory.');
        } else {
            window.alert('Delete process aborted.')
        }
    }

    useEffect(() => {
        setClient(clients.find(client => +client.number === +params.clientId))
        // setIsEditMode(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    return ( 
        <section>
            <header>
                <h2>Client #{params.clientId}</h2>
            </header>

            <div className="button_group">
                <button onClick={toggleEditMode} >{isEditMode ? 'Toggle edit mode off' : 'Toggle edit mode on'}</button>
                <button onClick={handleDelete}>Delete client</button>
            </div>

            <Article key='title_01' props={["First name", "Last name", "Email", "Phone"]} />
            {isEditMode ? <EditArticle props={[client, dispatch, ['firstName', 'lastName', 'email', 'tel']]} /> : <Article key='data_01' className="article_content" props={[client.firstName, client.lastName, client.email, client.tel]}/>}
            
            <Article key='title_02' props={["Street", "Postcode", "City", "Country"]} />
            {isEditMode ? <EditArticle props={[client, dispatch, ['street', 'postcode', 'city', 'country']]} /> : <Article key='client_02' className="article_content" props={[client.street, client.postcode, client.city, client.country]}/>}
            

            
            <section>
                <header>
                    <h3>Invoices</h3>
                </header>
                <Article key='invoice' props={['Number', 'Created on', 'Due date', 'Amount']} />
                {invoices.filter(invoice =>
                    (+invoice.client === +params.clientId) && (invoice.status !== 'Draft'))
                    .map(invoice => {
                        let amount = invoice.items.map(item => PRODUCTS[item.name].pricePerUnit * item.quantity).reduce((a, b) => a + b);
                        return <Article key={`${params.clientId} ${invoice.number}`} props={[`#${invoice.number}`, invoice.created, invoice.due, `€ ${amount.toFixed(2)}`]} />
                    })}
            </section>
          
        </section>

    );
}

export default Client;