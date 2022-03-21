/* eslint-disable react-hooks/exhaustive-deps */
import ItemList from '../elements/ItemList';
import Article from '../elements/Article';
import { createInvoice, createItem } from '../dataModels.js';

import { useEffect } from 'react';

import useLocalStorage from '../useLocalStorage';
import { newInvoiceReducer } from '../reducers';

import { ACTIONS, KEYS, STATUS } from '../CONSTANTS';

function InvoiceForm({state, dispatch}) {

    const [clients, invoices] = state;

    const [invoice, dispatchInvoice] = useLocalStorage(newInvoiceReducer, KEYS.NEW_INVOICE, createInvoice(invoices.length))

    const initiateClientState = () => {
        let data = clients.find(entry => parseInt(entry.number) === parseInt(invoice.client));
        if(data) {return data} else {return []}
    };

    let client = initiateClientState();

    const addItem = (event) => {
        event.preventDefault();
        dispatchInvoice({type: ACTIONS.NEW_INVOICE.ADD_ITEM, payload: createItem(Date.now())});
    };

    const handleChange = event => {
        const payload = { key: event.target.id, value: event.target.value }
        dispatchInvoice({type: ACTIONS.NEW_INVOICE.UPDATE, payload: payload});
    };

    const handleReset = event => {
        event.preventDefault();
        dispatchInvoice({type: ACTIONS.NEW_INVOICE.RESET, payload: createInvoice(invoices.length)})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.target.name === STATUS.DRAFT ? dispatch({type: ACTIONS.INVOICES.ADD, payload: invoice}) : dispatch({type: ACTIONS.INVOICES.ADD, payload: {...invoice, 'status': STATUS.PENDING}});
        dispatchInvoice({type: ACTIONS.NEW_INVOICE.RESET, payload: createInvoice(invoices.length)})
    }

    const getClientOptions = () => {
        let clientList = [<option key={0} value={0} defaultValue>Select a client</option>];
        for (const client of clients) {
            clientList.push(<option key={client.number} value={client.number}>{client.firstName} {client.lastName}</option>)
        }
        return clientList;
    }

    let clientOptions = getClientOptions();

    useEffect(() => {
        client = initiateClientState();
    }, [invoice.client]);

    useEffect(() => {
        let sum = invoice.items.length > 0 ? invoice.items.map(item => parseFloat(item.pricePerUnit) * parseInt(item.quantity)).reduce((a, b) => a + b) : 0;
        dispatchInvoice({type: ACTIONS.NEW_INVOICE.UPDATE, payload: {key: 'amount', value: sum }})
    }, [invoice.items])

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
                        <p>Price per unit</p>
                        <p>Total</p>
                        <p></p>
                    </article>
                        {invoice.items.map(item => <ItemList id={item.id} key={item.id} dispatch={dispatchInvoice} state={[item]} />)}
                    <button onClick={addItem}>+ Add New Item</button>
                </fieldset>
            </form>

            <section className='button_group'>
                <button onClick={handleReset} disabled={invoice.status !== STATUS.DRAFT ? true : false}>Reset</button>
                <button onClick={handleSubmit} name={STATUS.DRAFT} disabled={invoice.status === STATUS.DRAFT ? false : true} >Save as draft</button>
                <button onClick={handleSubmit} name={STATUS.PENDING}>Send as Pending</button>
            </section>
            
        </section>
     );
}

export default InvoiceForm;