export const ACTIONS = {
  CLIENTS: {
    ADD: 'addClient',
    UPDATE: 'updateClient',
    REMOVE: 'removeClient'
  },
  INVOICES: {
    ADD: 'addInvoice',
    UPDATE: 'updateInvoice',
    REMOVE: 'removeInvoice',
    ADD_ITEM: 'addItem',
    REMOVE_ITEM: 'removeItem',
    UPDATE_ITEM: 'updateItem'
  },
  NEW_CLIENT: {
    UPDATE: 'updateNewClient',
    RESET: 'resetNewClient'
  },
  NEW_INVOICE: {
    UPDATE: 'updateNewInvoice',
    RESET: 'resetNewInvoice',
    ADD_ITEM: 'addItem',
    REMOVE_ITEM: 'removeItem',
    UPDATE_ITEM: 'updateItem'
  },
  PUSH_DATA: {
    CLIENTS: 'pushClients',
    INVOICES: 'pushInvoices'
  }
}

export const STATUS = {
  DRAFT: 'Draft',
  PENDING: 'Pending',
  PAID: 'Paid'
}

export const KEYS = {
  INVOICES: 'invoices',
  CLIENTS: 'clients',
  NEW_CLIENT: 'new_client',
  NEW_INVOICE: 'new_invoice',
  THEME: 'theme'
}

export const PRODUCTS = {
  1: {
    name: 'Product 1',
    pricePerUnit: 25.00,
  },
  2: {
    name: 'Product 2',
    pricePerUnit: 50.00,
  },
  3: {
    name: 'Product 3',
    pricePerUnit: 78.50,
  },
  4: {
    name: 'Product 4',
    pricePerUnit: 12.50,
  },
  5: {
    name: 'Product 5',
    pricePerUnit: 22.50,
  },
  6: {
    name: 'Product 6',
    pricePerUnit: 13.75,
  },
  7: {
    name: 'Product 7',
    pricePerUnit: 100.50,
  },
  8: {
    name: 'Product 8',
    pricePerUnit: 102.50,
  },
  9: {
    name: 'Product 9',
    pricePerUnit: 10.50,
  },
  10: {
    name: 'Product 10',
    pricePerUnit: 8.50,
  }
}