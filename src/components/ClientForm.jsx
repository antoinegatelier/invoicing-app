import { createClient } from "../dataModels"
import { newClientReducer } from "../reducers";

import useLocalStorage from "../useLocalStorage";

import { ACTIONS, KEYS } from '../CONSTANTS';

function ClientForm({ state, dispatch }) {

    const [clients, invoices] = state;

    const [client, dispatchClient] = useLocalStorage(newClientReducer, KEYS.NEW_CLIENT, createClient(clients.length + 1))

    const handleChange = (event) => {
        const payload = { key: event.target.id, value: event.target.value };
        dispatchClient({ type: ACTIONS.NEW_CLIENT.UPDATE, payload: payload })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: ACTIONS.CLIENTS.ADD, payload: client })
        alert('Client successfully created');
        dispatchClient({ type: ACTIONS.NEW_CLIENT.RESET, payload: createClient(clients.length + 1) });
    }

    return (
        <section>
            <header>
                <h2>New client</h2>
            </header>
            <form>
                <fieldset>
                    <legend>Name</legend>
                    <article>
                        <label htmlFor="title" ><p>Title</p></label>
                        <label htmlFor="firstName" ><p>First name</p></label>
                        <label htmlFor="lastName" ><p>Last name</p></label>
                    </article>
                    <article>
                        <p><input onChange={handleChange} name="title" type="text" id="title" value={client.title} /></p>
                        <p><input onChange={handleChange} name="firstName" type="text" id="firstName" value={client.firstName} required /></p>
                        <p><input onChange={handleChange} name="lastName" type="text" id="lastName" value={client.lastName} required /></p>
                    </article>
                </fieldset>
                <fieldset>
                    <legend>Address</legend>
                    <article>
                        <p><label htmlFor="street">Street</label></p>
                    </article>
                    <article>
                        <p><input onChange={handleChange} name="street" type="text" id="street" value={client.street} required /></p>
                    </article>
                    <article>
                        <p><label htmlFor="additionalInfo">Additional information</label></p>
                    </article>
                    <article>
                        <p><input onChange={handleChange} name="additionalInfo" type="text" id="additionalInfo" value={client.additionalInfo} /></p>
                    </article>
                    <article>
                        <p><label htmlFor="city" >City</label></p>
                        <p><label htmlFor="postcode" >Post Code</label></p>
                        <p><label htmlFor="country" >Country</label></p>
                    </article>
                    <article>
                        <p><input onChange={handleChange} name="city" type="text" id="city" value={client.city} required /></p>
                        <p><input onChange={handleChange} name="postcode" type="text" id="postcode" value={client.postcode} required /></p>
                        <p><input onChange={handleChange} name="country" type="text" id="country" value={client.country} required /></p>
                    </article>
                </fieldset>
                <fieldset>
                    <legend>Contact details</legend>
                    <article>
                        <p><label htmlFor="email">Email</label></p>
                        <p><label htmlFor="tel">Phone</label></p>
                    </article>
                    <article>
                        <p><input onChange={handleChange} name="email" type="email" id="email" value={client.email} /></p>
                        <p><input onChange={handleChange} name="tel" type="tel" id="tel" value={client.tel} /></p>
                    </article>
                </fieldset>
                <button onClick={handleSubmit}>Save new client</button>
            </form>
        </section>
    );
}

export default ClientForm;