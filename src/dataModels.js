export function createClient(number) {
    return ({
        title: "",
        firstName: "",
        lastName: "",
        street: "",
        additionalInfo: "",
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
            id: Date.now(),
            number: number,
            created: null,
            due: null,
            description: '',
            client: 0,
            amount: 0,
            currency: '€',
            status: 'Draft',
            items: []
        }
    )
}