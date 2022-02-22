import { ACTIONS } from "../CONSTANTS";

function EditArticle(props) {

    const [client, dispatch, keys] = props.props;
    const [dispatchClients] = dispatch;
    return ( 
        <article>
            {keys.map((key, index) => <input key={index} type={key === 'text' ? 'text' : key} value={client[key]} onChange={e => dispatchClients({type: ACTIONS.CLIENTS.UPDATE, payload: {id: client.number, key: key, value: e.target.value}})} />)}
        </article>
     );
}

export default EditArticle;