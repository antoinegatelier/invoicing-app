import bin from '../img/bin.png'

import { ACTIONS, STATUS } from '../CONSTANTS';

function ItemList(props) {
    const { id, dispatch } = props;
    const [item, status] = props.state;

    const handleChange = (event) => {
        if (status !== STATUS.DRAFT ) return;
        dispatch({type: ACTIONS.NEW_INVOICE.UPDATE_ITEM, payload: {id: id, key: event.target.name, value: event.target.value }});
    }

    const removeItem = (event) => {
        event.preventDefault();
        if (status !== STATUS.DRAFT) return;
        dispatch({type: ACTIONS.NEW_INVOICE.REMOVE_ITEM, payload: { id: id}})
    };

    return (
        <article>
            <p><input onChange={handleChange} type="text" value={item.name} name='name' /></p>
            <p><input onChange={handleChange} type="text" value={item.quantity} name='quantity' /></p>
            <p><input onChange={handleChange} type="text" value={item.pricePerUnit} name='pricePerUnit' /></p>
            <p>€ {item.quantity * item.pricePerUnit ? (item.quantity * item.pricePerUnit).toFixed(2) : '-.--'}</p>
            {dispatch ? <p><img onClick={event => removeItem(event)} src={bin} alt="icon bin" style={{ height: '1.2rem', width: '1.2rem' }} /></p> : null}
        </article>
    );
}

export default ItemList;