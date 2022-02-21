import { STATUS } from "./CONSTANTS";

export const fetchClients = async () => {
    const clients = await fetch('https://fakerapi.it/api/v1/custom?_quantity=15&_locale=de_DE&firstName=firstName&lastName=lastName&street=streetAddress&postcode=postcode&city=city&email=email&tel=phone').then(response => response.json());
    return clients.data.map((client, index) => ({...client, number: index + 1}));
}

export const fetchInvoices = async () => {
    const invoices = await fetch('https://fakerapi.it/api/v1/custom?_quantity=45&_locale=de_DE&created=date&due=date&description=company_name&amount=number').then(response => response.json());
    let status = () => {
        const status = [STATUS.DRAFT, STATUS.PAID, STATUS.PENDING];
        let rand = () => Math.ceil(Math.random() * 3) - 1;
        return status[rand()];
    }
    let client = () => {
        return Math.ceil(Math.random() * 15);
    }
        return invoices.data.map((invoice, index) => ({...invoice, number: index + 1, status: status(), client: client()}));
}

