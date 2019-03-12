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
    viewItemList: [],
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
            viewItemList: [{ 'Item1': 12 }, { 'Item2': 20 }],
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
            viewItemList: [],
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
            viewItemList: [],
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
            viewItemList: [],
            status: false
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(expectation);
    });
    it('Adds an item to item quantity', () => {
        const action = {
            type: ADD_THIS_ITEM_TO_QUANTITY,
            id: 'ITEM'
        };
        const expectation = {
            itemsList: [],
            orderList: [],
            viewItemList: [],
            currentOrder: {},
            currentOrderID: '',
            total: 0,
            itemQuantity: { 'ITEM': 0 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(expectation);
    });
    it('Deletes an item from item quantity', () => {
        const action = {
            type: DELETE_THIS_ITEM_FROM_QUANTITY,
            price: 10,
            id: 'A'
        };
        const init = {
            itemsList: [],
            orderList: [],
            currentOrder: {},
            currentOrderID: '',
            total: 100,
            itemQuantity: { 'A': 1, 'B': 2, 'C': 3 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        const expectation = {
            itemsList: [],
            orderList: [],
            currentOrder: {},
            currentOrderID: '',
            total: 90,
            itemQuantity: { 'B': 2, 'C': 3 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        expect(ORDER_LIST_REDUCER(init, action)).toEqual(expectation);
    });
    it('Adds removes items from item quantity', () => {
        const action = {
            type: INDECREMENT_ITEM_FROM_QUANTITY,
            direction: true,
            price: 10,
            id: 'A'
        };
        const init = {
            itemsList: [],
            orderList: [],
            currentOrder: {},
            currentOrderID: '',
            total: 100,
            itemQuantity: { 'A': 1, 'B': 2, 'C': 3 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        const expectation = {
            itemsList: [],
            orderList: [],
            currentOrder: {},
            currentOrderID: '',
            total: 110,
            itemQuantity: { 'A': 2, 'B': 2, 'C': 3 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        expect(ORDER_LIST_REDUCER(init, action)).toEqual(expectation);
    });
    it('Adds removes items from item quantity', () => {
        const action = {
            type: INDECREMENT_ITEM_FROM_QUANTITY,
            direction: false,
            price: 10,
            id: 'A'
        };
        const init = {
            itemsList: [],
            orderList: [],
            currentOrder: {},
            currentOrderID: '',
            total: 100,
            itemQuantity: { 'A': 2, 'B': 2, 'C': 3 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        const expectation = {
            itemsList: [],
            orderList: [],
            currentOrder: {},
            currentOrderID: '',
            total: 90,
            itemQuantity: { 'A': 1, 'B': 2, 'C': 3 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        expect(ORDER_LIST_REDUCER(init, action)).toEqual(expectation);
    });
    it('Adds updated order to order list', () => {
        const action = {
            type: ADD_THESE_ITEMS_TO_THIS_ORDER,
            updatedOrder: {
                _id: 123,
                cartID: 12345,
                items: [{ 'A': 1, 'B': 2 }]
            }
        };
        const expectation = {
            itemsList: [],
            viewItemList: [],
            orderList: [{
                _id: 123,
                cartID: 12345,
                items: [{ 'A': 1, 'B': 2 }]
            }],
            currentOrder: {},
            currentOrderID: '',
            total: 0,
            itemQuantity: {},
            clonedItemQuantity: {},
            url: '',
            status: true
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(expectation);
    });
    describe('Append item to this order', () => {
        const action = {
            type: APPEND_THIS_ITEM_TO_ORDER,
            productID: 'A',
            currentOrder: {
                _id: 123,
                cartID: 12345,
                items: [{ 'A': 1 }]
            }
        };
        const init = {
            itemsList: [{ productID: 'A', quantity: 10 }, { productID: 'B', quantity: 20 }],
            orderList: [],
            currentOrder: {},
            currentOrderID: '',
            total: 0,
            itemQuantity: {},
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        const expectation = {
            itemsList: [{ productID: 'A', quantity: 9 }, { productID: 'B', quantity: 20 }],
            viewItemList: [{ productID: 'B', quantity: 20 }],
            orderList: [],
            currentOrder: {
                _id: 123,
                cartID: 12345,
                items: [{ 'A': 1 }]
            },
            currentOrderID: '',
            total: 0,
            itemQuantity: { 'A': 1 },
            clonedItemQuantity: { 'A': 1 },
            url: '',
            status: false
        };
        expect(ORDER_LIST_REDUCER(init, action)).toEqual(expectation);
    });
    it('Quickly removes items from item quantity', () => {
        const action = {
            type: QUICK_DELETE_THIS_ITEM_FROM_QUANTITY,
            price: 10,
            id: 'A',
            updatedOrder: {
                _id: 123,
                cartID: 12345,
                items: [{ 'B': 1 }]
            }
        };
        const init = {
            itemsList: [],
            orderList: [],
            currentOrder: {},
            currentOrderID: '',
            total: 100,
            itemQuantity: { 'A': 1, 'B': 2, 'C': 3 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        const expectation = {
            itemsList: [],
            orderList: [],
            currentOrder: {
                _id: 123,
                cartID: 12345,
                items: [{ 'B': 1 }]
            },
            currentOrderID: '',
            total: 90,
            itemQuantity: { 'B': 2, 'C': 3 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        expect(ORDER_LIST_REDUCER(init, action)).toEqual(expectation);
    });
    it('Quickly changes items from item quantity', () => {
        const action = {
            type: QUICK_INDECREMENT_ITEM_FROM_QUANTITY,
            direction: true,
            price: 10,
            id: 'A',
            updatedOrder: {
                _id: 123,
                cartID: 12345,
                items: [{ 'B': 1 }]
            }
        };
        const init = {
            itemsList: [],
            orderList: [],
            currentOrder: {},
            currentOrderID: '',
            total: 100,
            itemQuantity: { 'A': 1, 'B': 2, 'C': 3 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        const expectation = {
            itemsList: [],
            orderList: [],
            currentOrder: {
                _id: 123,
                cartID: 12345,
                items: [{ 'B': 1 }]
            },
            currentOrderID: '',
            total: 110,
            itemQuantity: { 'A': 2, 'B': 2, 'C': 3 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        expect(ORDER_LIST_REDUCER(init, action)).toEqual(expectation);
    });
    it('Quickly changes items from item quantity', () => {
        const action = {
            type: QUICK_INDECREMENT_ITEM_FROM_QUANTITY,
            direction: false,
            price: 10,
            id: 'A',
            updatedOrder: {
                _id: 123,
                cartID: 12345,
                items: [{ 'B': 1 }]
            }
        };
        const init = {
            itemsList: [],
            orderList: [],
            currentOrder: {},
            currentOrderID: '',
            total: 100,
            itemQuantity: { 'A': 2, 'B': 2, 'C': 3 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        const expectation = {
            itemsList: [],
            orderList: [],
            currentOrder: {
                _id: 123,
                cartID: 12345,
                items: [{ 'B': 1 }]
            },
            currentOrderID: '',
            total: 90,
            itemQuantity: { 'A': 1, 'B': 2, 'C': 3 },
            clonedItemQuantity: {},
            url: '',
            status: false
        };
        expect(ORDER_LIST_REDUCER(init, action)).toEqual(expectation);
    });
});

describe('Initial state', () => {
    it('Initial state as expected', () => {
        const action = {
            type: 'DEFAULT'
        };
        expect(ORDER_LIST_REDUCER(undefined, action)).toEqual(initialState);
    });
});