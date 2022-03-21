import { Link } from "react-router-dom";

import { PRODUCTS } from "../CONSTANTS";

import Article from "../elements/Article";

import { useEffect, useState } from "react";

function InvoiceList({ state }) {

    const [clients, invoices] = state;

    const [filter, setFilter] = useState('');
    const [invoicesPerPage, setInvoicesPerPage] = useState(10);
    const [pages, setPages] = useState(new Array(Math.ceil(invoices.length / 10)).fill(0).map((_value, index) => index + 1))
    const [page, setPage] = useState(1);

    const handleFilter = (event) => {
        setFilter(event.target.value);
    }

    const handlePageSelection = (event) => {
        setPage(parseInt(event.target.value))
    }

    useEffect(() => {
        setPages(new Array(Math.ceil(invoices.length / invoicesPerPage)).fill(0).map((_value, index) => index + 1))
        setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoicesPerPage])



    return (
        <section>
            <header>
                <h2>Invoices</h2>
                <div className="button_group" style={{display: 'grid', gridTemplateColumns: "repeat(3, 1fr))", columnGap: "1rem"}}>
                    <label htmlFor="Filter by status" style={{width: "auto", margin: "0 auto", borderRadius: ".30rem",border: '2px var(--primary-background-200) solid'}}>Filter by status:
                        <select onChange={handleFilter} name="Filter by status" value={filter}>
                            <option value="">-</option>
                            <option value="Draft">Draft</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </label>

                    <label htmlFor="Invoices per page" style={{width: "auto", margin: "0 auto", borderRadius: ".30rem",border: '2px var(--primary-background-200) solid'}}>Invoices per page:
                        <select onChange={e => setInvoicesPerPage(e.target.value)} name="Invoices per page" value={invoicesPerPage}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </label>
                    <label htmlFor="page" style={{width: "auto", margin: "0 auto", borderRadius: ".30rem",border: '2px var(--primary-background-200) solid'}}>Page:
                        <select onChange={handlePageSelection} name="page" value={page}>
                            {pages.map(pageNumber => <option key={pageNumber} value={pageNumber}>{pageNumber}</option>)}
                        </select>
                    </label>
                </div>

                <Link to="/new_invoice" >New Invoice</Link>
            </header>

            <figure>There are {invoices.length} total invoices</figure>

            <Article props={['Number', 'Due date', 'Client', 'Amount', 'Status', '']} />

            {invoices.filter((invoice => filter === "" || filter === invoice.status))
            .filter((_invoice, index) => index >= (invoicesPerPage * (page - 1)) && index < (invoicesPerPage * (page)))
            .map(invoice => {
                let person = clients.find(client => client.number === +invoice.client);
                let amount = invoice.items.length > 0 ? invoice.items.map(item => PRODUCTS[item.name].pricePerUnit * item.quantity).reduce((a, b) => a + b) : 0;
                return (
                    <Article key={invoice.number}
                        props={
                            [
                                `#${invoice.number}`,
                                `Due ${invoice.due}`,
                                `${person.firstName} ${person.lastName}`,
                                `€ ${amount.toFixed(2)}`,
                                `${invoice.status}`,
                                <Link to={`/invoices/${invoice.number}`} >See more</Link>
                            ]
                        }
                    />
                )                
            })
            }

        </section>
    );
}

export default InvoiceList;