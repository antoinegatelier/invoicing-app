import { STATUS } from './CONSTANTS';

export function createClient(number = undefined) {
    return ({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        postcode: "",
        country: "",
        email: "",
        number: number,
        tel: ""
    })
}

export function createItem(id) {
    return (
        {
            id: id,
            name: '',
            quantity: 0,
            pricePerUnit: 0
        }
    )
}

export function createInvoice(number) {
    return (
        {
            number: number + 1,
            created: null,
            due: null,
            description: '',
            client: 0,
            amount: 0,
            status: STATUS.DRAFT,
            items: []
        }
    )
}