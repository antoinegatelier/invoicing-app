import bin from '../img/bin.png'

import { ACTIONS, PRODUCTS } from '../CONSTANTS';

function ItemList(props) {
    const { id, dispatch } = props;
    const [item, invoiceId] = props.state;

    const handleChange = (event) => {
        dispatch({type: ACTIONS.NEW_INVOICE.UPDATE_ITEM || ACTIONS.INVOICES.UPDATE_ITEM, payload: {invoiceId: invoiceId, itemId: id, key: event.target.name, value: event.target.value }});
    }

    const removeItem = (event) => {
        event.preventDefault();
        dispatch({type: ACTIONS.NEW_INVOICE.REMOVE_ITEM || ACTIONS.INVOICES.REMOVE_ITEM, payload: { invoiceId: invoiceId, itemId: id }})
    };

    return (
        <article>
            <p>
                <select onChange={handleChange} name='name'>
                {Object.keys(PRODUCTS).map(key => <option key={key} value={key}>{PRODUCTS[key].name}</option>)}
                </select>
            </p>
            <p><input onChange={handleChange} type="text" value={item.quantity} name='quantity' /></p>
            <p>{PRODUCTS[item.name].pricePerUnit.toFixed(2)}</p>
            <p>€ {item.quantity * PRODUCTS[item.name].pricePerUnit ? (item.quantity * PRODUCTS[item.name].pricePerUnit).toFixed(2) : '-.--'}</p>
            <p><img onClick={removeItem} src={bin} alt="icon bin" style={{ height: '1.2rem', width: '1.2rem' }} /></p>
        </article>
    );
}

export default ItemList;