import { Link } from "react-router-dom";

import Article from "../elements/Article";

import { useEffect, useState } from "react";

function InvoiceList({ state }) {

    const [clients, invoices] = state;

    const [filter, setFilter] = useState('');
    const [invoicesPerPage, setInvoicesPerPage] = useState(10);
    const [pages, setPages] = useState(new Array(Math.ceil(invoices.length / 10)).fill(0).map((value, index) => index + 1))
    const [page, setPage] = useState(1);

    const handleFilter = (event) => {
        setFilter(event.target.value);
    }

    const handlePageSelection = (event) => {
        setPage(parseInt(event.target.value))
    }

    useEffect(() => {
        setPages(new Array(Math.ceil(invoices.length / invoicesPerPage)).fill(0).map((value, index) => index + 1))
        setPage(1)
    }, [invoicesPerPage])



    return (
        <section>
            <header>
                <h2>Invoices</h2>
                <div className="button_group">
                    <select onChange={handleFilter} name="Filter by status" value={filter}>
                        <option value="">Filter by status</option>
                        <option value="Draft">Draft</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <select onChange={e => setInvoicesPerPage(e.target.value)} name="Invoices per pag" value={invoicesPerPage}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>

                <Link to="/new_invoice" >New Invoice</Link>
            </header>
            <div style={{display: "flex", justifyContent: 'space-between', paddingRight: '2rem'}}>
                <figure>There are {invoices.length} total invoices</figure>
                <label htmlFor="page">Page: <select onChange={handlePageSelection} name="page" value={page}>
                    {pages.map(pageNumber => <option value={pageNumber}>{pageNumber}</option>)}
                </select></label>

            </div>


            <Article props={['Number', 'Due date', 'Client', 'Amount', 'Status', '']} />

            {invoices.filter(invoice => filter === "" || filter === invoice.status).map((invoice, index) => {
                if(index >= (invoicesPerPage * (page - 1)) && index < (invoicesPerPage * (page))) {
                    let person = clients.find(client => client.number === +invoice.client);
                return (
                    <Article key={invoice.number}
                        props={
                            [
                                `#${invoice.number}`,
                                `Due ${invoice.due}`,
                                `${person.firstName} ${person.lastName}`,
                                `€ ${invoice.amount.toFixed(2)}`,
                                `${invoice.status}`,
                                <Link to={`/invoices/${invoice.number}`} >See more</Link>
                            ]
                        }
                    />
                )
                }
            })}

        </section>
    );
}

export default InvoiceList;