import { useState } from "react";
import { createClient } from "../dataModels"

function ClientForm({clients, setClients}) {

    const [client, setClient] = useState(createClient(clients.length + 1))

    const handleChange = (event) => {
        setClient({...client, [event.target.id]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setClients([...clients, client]);
        alert('Client successfully created');
        setClient(createClient(clients.length + 1));
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
                        <p><input onChange={handleChange} name="title" type="text" id="title" value={client.title ? client.title : ''} /></p>
                        <p><input onChange={handleChange} name="firstName" type="text" id="firstName" value={client.firstName ? client.firstName : ''} required /></p>
                        <p><input onChange={handleChange} name="lastName" type="text" id="lastName" value={client.lastName ? client.lastName : ''} required /></p>
                    </article>
                </fieldset>
                <fieldset>
                    <legend>Address</legend>
                    <article>
                        <p><label htmlFor="street">Street</label></p>
                    </article>
                    <article>
                        <p><input onChange={handleChange} name="street" type="text" id="street" value={client.street ? client.street : ''} required /></p>
                    </article>
                    <article>
                        <p><label htmlFor="additionalInfo">Additional information</label></p>
                    </article>
                    <article>
                        <p><input onChange={handleChange} name="additionalInfo" type="text" id="additionalInfo" value={client.additionalInfo ? client.additionalInfo : ''} /></p>
                    </article>
                    <article>
                        <p><label htmlFor="city" >City</label></p>
                        <p><label htmlFor="postcode" >Post Code</label></p>
                        <p><label htmlFor="country" >Country</label></p>
                    </article>
                    <article>
                        <p><input onChange={handleChange} name="city" type="text" id="city" value={client.city ? client.city : ''} required /></p>
                        <p><input onChange={handleChange} name="postcode" type="text" id="postcode" value={client.postcode ? client.postcode : ''} required /></p>
                        <p><input onChange={handleChange} name="country" type="text" id="country" value={client.country ? client.country : ''} required /></p>
                    </article>
                </fieldset>
                <fieldset>
                    <legend>Contact details</legend>
                    <article>
                        <p><label htmlFor="email">Email</label></p>
                        <p><label htmlFor="tel">Phone</label></p>
                    </article>
                    <article>
                        <p><input onChange={handleChange} name="email" type="email" id="email" value={client.email ? client.email : ''} /></p>
                        <p><input onChange={handleChange} name="tel" type="tel" id="tel" value={client.tel ? client.tel : ''} /></p>
                    </article>
                </fieldset>
                <button onClick={handleSubmit}>Save new client</button>
            </form>
        </section>
    );
}

export default ClientForm;