export const ACTIONS = {
  CLIENTS: {
    ADD: 'addClient',
    UPDATE: 'updateClient',
    REMOVE: 'removeClient'
  },
  INVOICES: {
    ADD: 'addInvoice',
    UPDATE: 'updateInvoice',
    REMOVE: 'removeInvoice'
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