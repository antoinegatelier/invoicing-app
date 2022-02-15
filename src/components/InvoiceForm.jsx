import ItemList from '../elements/ItemList';
import Article from '../elements/Article';
import { createInvoice, createItem } from '../dataModels.js';

import { useEffect, useState } from 'react';

function InvoiceForm({invoices, clients, setInvoices}) {

    const inititalState = createInvoice(invoices.length + 1);
    const initiateClientState = () => {
        let data = clients.filter(entry => +(entry.number) === +(invoice.client))[0];
        if(data) {return data} else {return []}
    };

    const [invoice, setInvoice] = useState(inititalState);
    const [client, setClient] = useState(initiateClientState());

    const removeItem = (id) => {
        setInvoice({...invoice, items: invoice.items.filter(item => item.id !== id)})
    }

    const addItem = (event) => {
        event.preventDefault();
        setInvoice({ ...invoice, items: [...invoice.items, createItem(Date.now())] })
    };

    const handleChange = event => setInvoice( { ...invoice, [event.target.id]: event.target.value } );

    const handleItemChange = (event) => {
        const [id, tag] = event.target.id.split('_');
        setInvoice({
            ...invoice,
            items: invoice.items.map(item => item.id !== +id ? item : { ...item, [tag]: event.target.value })
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setInvoice({
            ...invoice,
            client: Number(invoice.client),
            amount: invoice.items.map(item => +(item.quantity) * +(item.pricePerUnit)).reduce((a, b) => a + b)
        });
        const checkExistingInvoice = invoices.filter(entry => entry.number !== invoice.number);
        setInvoices(checkExistingInvoice.concat([invoice]));
    }

    const sendInvoice = (event) => {
        event.preventDefault();
        setInvoice({...invoice, status: 'Pending'})
        handleSubmit(event);
        setInvoice(inititalState);
    }

    const enableEdit = (event) => {
        event.preventDefault();
        setInvoice({...invoice, status: 'Draft'})
    }

    const getClientOptions = () => {
        let clientList = [<option key={0} value={0} defaultValue>Select a client</option>];
        for (const client of clients) {
            clientList.push(<option key={client.number} value={client.number}>{client.firstName} {client.lastName}</option>)
        }
        return clientList;
    }

    const clientOptions = getClientOptions();

    useEffect(() => {
        setClient(initiateClientState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoice]);

    return ( 
        <section className='invoice_form' >
            <h2>New invoice</h2>
            <form>
                <fieldset>
                    <legend>Client</legend>
                    <article>
                        <p><label htmlFor="client">Select client</label></p>
                        <select onChange={handleChange} id="client" name="client" value={invoice.client}>
                            {clientOptions}
                        </select>
                    </article>

                    {invoice.client ? [<Article key="clientInfo1" props={['Title', 'First name', 'Last name', 'E-mail', 'Phone']} />,
                        <Article key="clientInfo2" props={[client.title, client.firstName, client.lastName, client.email, client.tel]} />,
                        <Article key="clientInfo3" props={['Street', 'Additional Information', 'Postcode', 'City', 'Country']} />,
                        <Article key="clientInfo4" props={[client.street, client.additionalInfo, client.postcode, client.city, client.country]} />
                    ] : null }
                    
                </fieldset>
                <fieldset>
                    <article>
                        <p><label htmlFor="description" >Project Description</label></p>
                        <p><label htmlFor="created" >Invoice Date</label></p>
                        <p><label htmlFor="due" >Due Date</label></p>
                    </article>
                    <article>
                        <p><input onChange={handleChange} name="description" type="text" id='description' value={invoice.description} /></p>
                        <p><input onChange={handleChange} name="created" type="date" id="created" value={invoice.created} /></p>
                        <p><input onChange={handleChange} name="due" type="date" id="due" value={invoice.due} /></p>
                    </article>
                </fieldset>
                <fieldset>
                    <legend>Item List</legend>
                    <article>
                        <p>Item name</p>
                        <p>Qty.</p>
                        <p>Price</p>
                        <p>Total</p>
                        <p></p>
                    </article>
                        {invoice.items.map(item => <ItemList id={item.id} key={item.id} removeItem={removeItem} handleItemChange={handleItemChange} state={item} status={invoice.status} />)}
                    <button onClick={addItem}>+ Add New Item</button>
                </fieldset>
            </form>
            <div className='button_group'>
                <button onClick={enableEdit}>Edit invoice</button>
                <button onClick={handleSubmit} disabled={invoice.status === 'Draft' ? false : true} >Save Changes</button>
                <button onClick={sendInvoice}>Send invoice</button>
            </div>
            
        </section>
     );
}

export default InvoiceForm;