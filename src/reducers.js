import { ACTIONS } from './CONSTANTS';

export function invoicesReducer(state, action) {
    switch (action.type) {
      case(ACTIONS.INVOICES.ADD):
        return [...state, action.payload];
      case(ACTIONS.INVOICES.REMOVE):
        return state.filter(invoice => invoice.number !== action.payload.id);
      case(ACTIONS.INVOICES.UPDATE):
        return state.map(invoice => {
          if(invoice.number !== action.payload.invoiceId) return invoice;
          return {...invoice, [action.payload.key]: action.payload.value};
        });
      case (ACTIONS.INVOICES.ADD_ITEM):
        return state.map(invoice => {
          if(invoice.number !== action.payload.invoiceId) return invoice;
          return {...invoice, items: [...invoice.items, action.payload.item]}
        });
      case (ACTIONS.INVOICES.REMOVE_ITEM):
        return state.map(invoice => {
          if(invoice.number !== action.payload.invoiceId) return invoice;
          return {...invoice, items: invoice.items.filter(item => item.id !== action.payload.itemId)}
        });
      case (ACTIONS.INVOICES.UPDATE_ITEM):
        return state.map(invoice => {
          if(invoice.number !== action.payload.invoiceId) return invoice;
          return {...invoice, items: invoice.items.map(item => item.id !== action.payload.itemId ? item : {...item, [action.payload.key]: action.payload.value})}
        });
      case(ACTIONS.PUSH_DATA.INVOICES):
        return action.payload;
      default:
        throw new Error(`invoicesReducer: Action ${action.type} is not valid`);
    }
  }
  
  export function clientsReducer(state, action) {
    switch (action.type) {
      case(ACTIONS.CLIENTS.ADD):
        return [...state, action.payload];
      case(ACTIONS.CLIENTS.REMOVE):
        return state.filter(client => client.number !== action.payload.id);
      case(ACTIONS.CLIENTS.UPDATE):
        return state.map(client => {
          if(client.number !== action.payload.id) return client;
          return {...client, [action.payload.key]: action.payload.value};
        });
      case(ACTIONS.PUSH_DATA.CLIENTS):
          return action.payload;
      default:
        throw new Error(`clientsReducer: Action ${action.type} is not valid`);
    }
  }

  export function newClientReducer(state, action) {
    switch (action.type) {
      case(ACTIONS.NEW_CLIENT.UPDATE):
        return {...state, [action.payload.key]: action.payload.value};
      case(ACTIONS.NEW_CLIENT.RESET):
        return action.payload;
      default:
        throw new Error(`newClientReducer: Action ${action.type} is not valid`);
    }
  }

  export function newInvoiceReducer(state, action) {
    switch (action.type) {
      case(ACTIONS.NEW_INVOICE.UPDATE):
        return {...state, [action.payload.key]: action.payload.value};
      case(ACTIONS.NEW_INVOICE.RESET):
        return action.payload;
      case(ACTIONS.NEW_INVOICE.ADD_ITEM):
        return {...state, items: [...state.items, action.payload]};
      case(ACTIONS.NEW_INVOICE.REMOVE_ITEM):
        return {...state, items: state.items.filter(item => item.id !== action.payload.itemId)};
      case(ACTIONS.NEW_INVOICE.UPDATE_ITEM):
        return {...state, items: state.items.map(item => {
          if(item.id !== action.payload.itemId) return item;
          return {...item, [action.payload.key]: action.payload.value};
        })};
      default:
        throw new Error(`newInvoiceReducer: Action ${action.type} is not valid`);
    }
  }

  export function themeReducer(state, action) {
    switch (action.type) {
      case('dark'):
        return 'dark';
      case('light'):
        return 'light';
      default:
        throw new Error(`themeReducer: Action ${action.type} is not valid`);
    }
  }