import bin from '../img/bin.png'

function ItemList(props) {

    const handleClick = (event) => {
        event.preventDefault();
        if (props.status !== 'Draft') return;
        props.removeItem(props.id);
    }

    const handleChange = (event) => {
        if (props.status !== 'Draft') return;
        props.handleItemChange(event)
    }

    return (
        <article>
            <p><input onChange={handleChange} type="text" value={props.state.name} id={`${props.id}_name`} /></p>
            <p><input onChange={handleChange} type="text" value={props.state.quantity} id={`${props.id}_quantity`} /></p>
            <p><input onChange={handleChange} type="text" value={props.state.pricePerUnit} id={`${props.id}_pricePerUnit`} /></p>
            <p>€ {props.state.quantity * props.state.pricePerUnit ? (props.state.quantity * props.state.pricePerUnit).toFixed(2) : '-.--'}</p>
            <p><img onClick={handleClick} src={bin} alt="icon bin" style={{ height: '1.2rem', width: '1.2rem' }} /></p>
        </article>
    );
}

export default ItemList;