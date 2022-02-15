import InvoiceList from "./components/InvoiceList";
import NavBar from "./components/NavBar";
import Invoice from "./components/Invoice";
import InvoiceForm from "./components/InvoiceForm";
import Profile from "./components/Profile";
import Client from "./components/Client";
import ClientList from "./components/ClientList";
import Settings from "./components/Settings";
import Home from "./components/Home";
import ClientForm from "./components/ClientForm";
import data from "./data.json";


import { Routes, Route } from "react-router-dom";

import './App.css'
import { useState } from "react";

function App() {

  const [clients, setClients] = useState(data.clients);
  const [invoices, setInvoices] = useState(data.invoices);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home clients={clients} invoices={invoices} />} />
        <Route path='invoices' element={<InvoiceList invoices={invoices} clients={clients} />} />
        <Route path='/invoices/:invoiceId' element={<Invoice clients={clients} invoices={invoices} />} />
        <Route path="clients" element={<ClientList invoices={invoices} clients={clients} />} />
        <Route path="/clients/:clientId" element={<Client clients={clients} invoices={invoices} />} />  
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="new_invoice" element={<InvoiceForm invoices={invoices} clients={clients} setInvoices={setInvoices} />} />
        <Route path="new_client" element={<ClientForm clients={clients} setClients={setClients} />} />
        <Route path="*" element={<section><article><p>Error 404 - Page not found</p></article></section>} />
      </Routes>
    </div>
  );
}

export default App;
