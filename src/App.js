import InvoiceList from "./components/InvoiceList";
import NavBar from "./components/NavBar";
import Invoice from "./components/Invoice";
import InvoiceForm from "./components/InvoiceForm";
import Client from "./components/Client";
import ClientList from "./components/ClientList";
import Home from "./components/Home";
import ClientForm from "./components/ClientForm";

import useLocalStorage from './useLocalStorage';
import { invoicesReducer, clientsReducer, themeReducer } from './reducers';

import { Routes, Route } from "react-router-dom";
import { KEYS } from "./CONSTANTS";

import './App.css'

const getPreferredColorScheme = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function App() {

  const [theme, dispatchTheme] = useLocalStorage(themeReducer, KEYS.THEME, getPreferredColorScheme())

  const [invoices, dispatchInvoices] = useLocalStorage(invoicesReducer, KEYS.INVOICES , []);
  const [clients, dispatchClients] = useLocalStorage(clientsReducer, KEYS.CLIENTS, [])

  return (
    <div className={`App ${theme}`}>
      <NavBar theme={theme} dispatch={dispatchTheme} dispatchClients={dispatchClients} dispatchInvoices={dispatchInvoices}/>
      <Routes>
        <Route path='/' element={<Home state={[clients, invoices]} actions={{dispatchClients: dispatchClients, dispatchInvoices: dispatchInvoices}} />} />
        <Route path='invoices' element={<InvoiceList state={[clients, invoices]} />} />
        <Route path='/invoices/:invoiceId' element={<Invoice state={[clients, invoices]} />} />
        <Route path="clients" element={<ClientList state={[clients, invoices]} />} />
        <Route path="/clients/:clientId" element={<Client state={[clients, invoices]} />} />  
        <Route path="new_invoice" element={<InvoiceForm state={[clients, invoices]} dispatch={dispatchInvoices}/>} />
        <Route path="new_client" element={<ClientForm state={clients} dispatch={dispatchClients} />} />
        <Route path="*" element={<section><article><p>Error 404 - Page not found</p></article></section>} />
      </Routes>
    </div>
  );
}

export default App;
