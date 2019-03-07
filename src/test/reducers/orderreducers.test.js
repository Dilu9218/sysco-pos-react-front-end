import {
    ORDER_LIST_REDUCER
} from '../../reducers/ordercontrolreducer';
import {
    FETCH_EVERY_ORDER_FOR_THIS_USER,
    ERROR_FETCHING_ORDER_LIST_FOR_USER,
    DELETE_THIS_ORDER,
    FETCH_COMPLETE_ITEMS_LIST,
    ERROR_FETCHING_ITEMS_LIST,
    CHECK_OUT_ORDER,
    RESET_CURRENT_ORDER_STATES,
    SET_THIS_ORDER_AS_CURRENT_ORDER,
    ADD_THIS_ITEM_TO_QUANTITY,
    DELETE_THIS_ITEM_FROM_QUANTITY,
    INDECREMENT_ITEM_FROM_QUANTITY,
    ADD_THESE_ITEMS_TO_THIS_ORDER,
    APPEND_THIS_ITEM_TO_ORDER,
    QUICK_DELETE_THIS_ITEM_FROM_QUANTITY,
    QUICK_INDECREMENT_ITEM_FROM_QUANTITY,
    CREATE_NEW_ORDER_FOR_THIS_USER
} from '../../actions/types';

const initialState = {
    itemsList: [],
    orderList: [],
    currentOrder: {},
    currentOrderID: '',
    total: 0,
    itemQuantity: {},
    clonedItemQuantity: {},
    url: '',
    status: false
}

describe('Initial state', () => {
    it('Initial state as expected', () => {
        const action = {
            type: 'DEFAULT'
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(initialState);
    });
});

describe('Items list', () => {
    it('Fetches items list', () => {
        const action = {
            type: FETCH_COMPLETE_ITEMS_LIST,
            itemsList: [{ 'Item1': 12 }, { 'Item2': 20 }]
        };
        const expectation = {
            itemsList: [{ 'Item1': 12 }, { 'Item2': 20 }],
            orderList: [],
            currentOrder: {},
            currentOrderID: '',
            total: 0,
            itemQuantity: {},
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(expectation);
    });
    it('Fetches items list crosses an error', () => {
        const action = {
            type: ERROR_FETCHING_ITEMS_LIST
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(initialState);
    });
    it('Fetches items list', () => {
        const action = {
            type: FETCH_EVERY_ORDER_FOR_THIS_USER,
            orderList: [{ 'Item1': 12 }, { 'Item2': 20 }]
        };
        const expectation = {
            itemsList: [],
            orderList: [{ 'Item1': 12 }, { 'Item2': 20 }],
            currentOrder: {},
            currentOrderID: '',
            total: 0,
            itemQuantity: {},
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(expectation);
    });
    it('Fetches items list crosses an error', () => {
        const action = {
            type: ERROR_FETCHING_ORDER_LIST_FOR_USER
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(initialState);
    });
});

describe('Order list', () => {
    it('Deletes an order', () => {
        const action = {
            type: DELETE_THIS_ORDER,
            id: 12
        };
        const init = {
            itemsList: [],
            orderList: [{ '_id': 12, 'Item': 'One' }, { '_id': 20, 'Item': 'Two' }],
            currentOrder: {},
            currentOrderID: '',
            total: 0,
            itemQuantity: {},
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        const expectation = {
            itemsList: [],
            orderList: [{ '_id': 20, 'Item': 'Two' }],
            currentOrder: {},
            currentOrderID: '',
            total: 0,
            itemQuantity: {},
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        expect(ORDER_LIST_REDUCER(init, action)).toEqual(expectation);
    });
    it('Checks out an order', () => {
        const action = {
            type: CHECK_OUT_ORDER,
            id: 12
        };
        const init = {
            itemsList: [],
            orderList: [{ '_id': 12, 'Item': 'One' }, { '_id': 20, 'Item': 'Two' }],
            currentOrder: {},
            currentOrderID: '',
            total: 0,
            itemQuantity: {},
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        const expectation = {
            itemsList: [],
            orderList: [{ '_id': 20, 'Item': 'Two' }],
            currentOrder: {},
            currentOrderID: '',
            total: 0,
            itemQuantity: {},
            clonedItemQuantity: {},
            url: '/my_orders',
            status: false
        };
        expect(ORDER_LIST_REDUCER(init, action)).toEqual(expectation);
    });
});

describe('Current orders', () => {
    it('Sets as current order', () => {
        const action = {
            type: SET_THIS_ORDER_AS_CURRENT_ORDER,
            currentOrder: {
                _id: 10,
                cartID: 1234567,
                items: [
                    {
                        productID: 'A',
                        quantity: 2,
                        price: 5
                    }, {
                        productID: 'B',
                        quantity: 3,
                        price: 5
                    }
                ]
            },
            url: '/test_url'
        };
        const expectation = {
            itemsList: [],
            orderList: [],
            currentOrder: {
                _id: 10,
                cartID: 1234567,
                items: [
                    {
                        productID: 'A',
                        quantity: 2,
                        price: 5
                    }, {
                        productID: 'B',
                        quantity: 3,
                        price: 5
                    }
                ]
            },
            currentOrderID: 10,
            total: 25,
            itemQuantity: { 'A': 2, 'B': 3 },
            clonedItemQuantity: { 'A': 2, 'B': 3 },
            url: '/test_url',
            status: false
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(expectation);
    });
    it('Resets the current order', () => {
        const action = {
            type: RESET_CURRENT_ORDER_STATES
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(initialState);
    });
    it('Creates a new order for this user', () => {
        const action = {
            type: CREATE_NEW_ORDER_FOR_THIS_USER,
            id: 1234
        };
        const expectation = {
            itemsList: [],
            orderList: [],
            currentOrder: {},
            currentOrderID: 1234,
            total: 0,
            itemQuantity: {},
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(expectation);
    });

    case ADD_THIS_ITEM_TO_QUANTITY:
    return {
        ...state,
        itemQuantity: {
            ...state.itemQuantity,
            [action.id]: 0
        }
    }

});

describe('Initial state', () => {
    it('Initial state as expected', () => {
        const action = {
            type: 'DEFAULT'
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(initialState);
    });
});

/*
describe('Initial state of user account control reducer', () => {

    const initialState = {
        passKey: '',
        alertMessage: '',
        isLoggedIn: false
    };

    it('Initial state is as expected', () => {
        const action = {
            type: 'DEFAULT'
        };
        expect(PASS_KEY_REDUCER(undefined, action)).toEqual(initialState);
    });
    it('State updates with passkey', () => {
        const action = {
            type: SAVE_PASS_KEY,
            passKey: 'testkey'
        };
        const expectation = {
            passKey: 'testkey',
            alertMessage: '',
            isLoggedIn: true
        };
        expect(PASS_KEY_REDUCER(undefined, action)).toEqual(expectation);
    });
    it('Clears passKey', () => {
        const action = {
            type: CLEAR_PASS_KEY
        };
        expect(PASS_KEY_REDUCER(undefined, action)).toEqual(initialState);
    });
    it('Shows login errors properly', () => {
        const action = {
            type: SHOW_LOGIN_ERROR,
            alertMessage: 'Error message'
        };
        const expectation = {
            passKey: '',
            alertMessage: 'Error message',
            isLoggedIn: false
        };
        expect(PASS_KEY_REDUCER(undefined, action)).toEqual(expectation);
    });
});

describe('Initial state of user registration', () => {

    const initialState = {
        alertMessage: '',
        registered: false
    };
    it('Initial state is as expected', () => {
        const action = {
            type: 'DEFAULT'
        };
        expect(REGISTRATION_REDUCER(undefined, action)).toEqual(initialState);
    });
    it('Shows registration errors properly', () => {
        const action = {
            type: SHOW_REGISTER_ERROR,
            alertMessage: 'testMessage'
        };
        const expectation = {
            alertMessage: 'testMessage',
            registered: false
        };
        expect(REGISTRATION_REDUCER(undefined, action)).toEqual(expectation);
    });
    it('Completes registration', () => {
        const action = {
            type: COMPLETE_REGISTRAION
        };
        const expectation = {
            alertMessage: '',
            registered: true
        };
        expect(REGISTRATION_REDUCER(undefined, action)).toEqual(expectation);
    })
}); */