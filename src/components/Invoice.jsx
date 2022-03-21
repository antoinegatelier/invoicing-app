import { useNavigate, useParams } from "react-router-dom";
import { createItem } from "../dataModels";

import Article from "../elements/Article";
import ItemList from '../elements/ItemList';

import { useEffect, useState } from "react";
import { ACTIONS, PRODUCTS } from "../CONSTANTS";

function Invoice({state, dispatch}) {

    let params = useParams();
    let navigate = useNavigate();

    const [clients, invoices] = state;
    const [invoice, setInvoice] = useState(invoices.find(invoice => parseInt(invoice.number) === parseInt(params.invoiceId)));
    const client = clients.find(client => parseInt(client.number) === parseInt(invoice.client));
    const [amount, setAmount] = useState(invoice.items.length > 0 ? invoice.items.map(item => PRODUCTS[item.name] * item.quantity).reduce((a, b) => a + b) : 0);
    const [isEditMode, setIsEditMode] = useState(false)

    const toggleEditMode = (event) => {
        event.preventDefault();
        setIsEditMode(!isEditMode);
    }

    const handleChange = (event) => {
        event.preventDefault();
        dispatch({type: ACTIONS.INVOICES.UPDATE, payload: {invoiceId: invoice.number, key: event.target.name, value: event.target.value}});
    }

    const addItem = (event) => {
        event.preventDefault();
        dispatch({type: ACTIONS.INVOICES.ADD_ITEM, payload: {invoiceId: invoice.number, item: createItem(Date.now())}});
    };

    const handleDelete = (event) => {
        event.preventDefault();
        let userInput = window.prompt('Please confirm you really want to delete this invoice by typing "DELETE".');
        if(userInput === 'DELETE') {
            dispatch({type: ACTIONS.INVOICES.REMOVE, payload: { id: invoice.number }});
            navigate("../invoices");
            window.alert('Invoice successfully deleted.');
        } else {
            window.alert('Delete process aborted.');
        }
    }

    useEffect(() => {
        setInvoice(invoices.find(invoice => parseInt(invoice.number) === parseInt(params.invoiceId)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    useEffect(() => {
        invoice.items.length > 0 ?
        setAmount(invoice.items.map(item => PRODUCTS[item.name].pricePerUnit * item.quantity).reduce((a, b) => a + b)) :
        setAmount(0)
    }, [invoice.items])

    return (
        <section>
            <header>
                <h2>Invoice #{params.invoiceId}</h2>
            </header>

            <div className="button_group">
                <button onClick={toggleEditMode} >{isEditMode ? 'Toggle edit mode off' : 'Toggle edit mode on'}</button>
                <button onClick={handleDelete}>Delete invoice</button>
            </div>

            <Article props={['Client', 'Creation date', 'Due date', 'Project','Amount']}/>
            {isEditMode ? <article>
                <p>{client.firstName} {client.lastName}</p>
                <input type="date" name="created" value={invoice.created} onChange={handleChange} />
                <input type="date" name="due" value={invoice.due} onChange={handleChange} />
                <input type="text" name="description" value={invoice.description} onChange={handleChange} />
                <p>€ {parseInt(amount).toFixed(2)}</p>
            </article> : <Article props={[`${client.firstName} ${client.lastName}`, invoice.created, invoice.due, invoice.description,`€ ${amount.toFixed(2)}`]} />}

            <section>
                <h3>Item list</h3>
                <Article props={['Item name', 'Quantity', 'Price per Unit', 'Total']} />
                {isEditMode ?
                    invoice.items?.map(item => <ItemList key={item.id} id={item.id} dispatch={dispatch} state={[item, invoice.number]} />)
                    : invoice.items?.map(item =>
                        <article>
                            <p>{PRODUCTS[item.name].name}</p>
                            <p>{item.quantity}</p>
                            <p>{PRODUCTS[item.name].pricePerUnit.toFixed(2)}</p>
                            <p>{'€ ' + (PRODUCTS[item.name].pricePerUnit * item.quantity).toFixed(2)}</p>
                        </article>)
                }
                {isEditMode ? <button onClick={addItem}>+ Add New Item</button> : null }
            </section>


        </section>
    );
}

export default Invoice;