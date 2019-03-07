import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

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
    CREATE_NEW_ORDER_FOR_THIS_USER,
    ERROR_CREATE_NEW_ORDER_FOR_THIS_USER,
    ERROR_DELETE_THIS_ORDER,
    ERROR_APPEND_THIS_ITEM_TO_ORDER,
    ERROR_CHECK_OUT_ORDER
} from '../actions/types';
import {
    dispatch_CreateNewOrderForThisUser,
    dispatch_AddTheseItemsToThisOrder,
    dispatch_AddThisItemToQuantity,
    dispatch_AppendThisItemToOrder,
    dispatch_CheckOutOrder,
    dispatch_DeleteThisItemFromQuantity,
    dispatch_DeleteThisOrder,
    dispatch_FetchEveryOrderForThisUser,
    dispatch_GetTheCompleteItemsList,
    dispatch_IndecrementItemFromQuantity,
    dispatch_QuickDeleteThisItemFromQuantity,
    dispatch_QuickIndecrementItemFromQuantity,
    dispatch_ResetCurrentOrderStates,
    dispatch_SetThisOrderAsCurrentOrder
} from '../actions/ordercontrolactions';

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNzQ5MjViYzk2ODEyMWM3ZDE2YTAxOCIsImlhdCI6MTU1MTk0ODUyNCwiZXhwIjoxNTUyMDM0OTI0fQ.aCaQ10Xb14J3DyY6KU39DCz8uxKV5qK0ekLSI4l4sM0";

let gOrder = undefined;

describe('Fetch all orders', () => {

    const store = mockStore({});
    beforeEach(() => {
        store.clearActions();
    });

    it('Fetches all orders of this user', (done) => {
        store.dispatch(dispatch_FetchEveryOrderForThisUser(accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(FETCH_EVERY_ORDER_FOR_THIS_USER);
            done();
        });
    });
    it('Fetches all orders of this user with invalid token', (done) => {
        store.dispatch(dispatch_FetchEveryOrderForThisUser(accesstoken + 'z')).then(() => {
            expect(store.getActions()[0].type).toBe(ERROR_FETCHING_ORDER_LIST_FOR_USER);
            done();
        });
    });
});

describe('Creates new orders', () => {

    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
    });

    it('Creates a new order for this user', (done) => {
        store.dispatch(dispatch_CreateNewOrderForThisUser(accesstoken)).then(() => {
            gOrder = store.getActions()[0].id;
            expect(store.getActions()[0].type).toBe(CREATE_NEW_ORDER_FOR_THIS_USER);
            done();
        });
    });
    it('Creates a new order for this user with invalid authorization', (done) => {
        store.dispatch(dispatch_CreateNewOrderForThisUser(accesstoken + 'z')).then(() => {
            expect(store.getActions()[0].type).toBe(ERROR_CREATE_NEW_ORDER_FOR_THIS_USER);
            done();
        });
    });
});

describe('Reset order status', () => {

    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
    });

    it('Resets order status for this user', (done) => {
        store.dispatch(dispatch_ResetCurrentOrderStates());
        expect(store.getActions()[0].type).toBe(RESET_CURRENT_ORDER_STATES);
        done();
    });
});

describe('Checkouts orders', () => {

    let lOrder = undefined;
    beforeAll(async (done) => {
        await store.dispatch(dispatch_CreateNewOrderForThisUser(accesstoken)).then(res => {
            lOrder = store.getActions()[0].id;
            done();
        });
    });

    const store = mockStore({});
    beforeEach(() => {
        store.clearActions();
    });

    it('Checkouts order and update status for this user', (done) => {
        store.dispatch(dispatch_CheckOutOrder(gOrder, accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(CHECK_OUT_ORDER);
            done();
        });
    });
    it('Checkouts order with invalid authorization', (done) => {
        store.dispatch(dispatch_CheckOutOrder(gOrder, accesstoken + 'z')).then(() => {
            expect(store.getActions()[0].type).toBe(ERROR_CHECK_OUT_ORDER);
            done();
        });
    });
    it('Deletes the same order and update status for this user', (done) => {
        store.dispatch(dispatch_DeleteThisOrder(gOrder, accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(ERROR_DELETE_THIS_ORDER);
            done();
        });
    });
    it('Deletes a new order and update status', (done) => {
        store.dispatch(dispatch_DeleteThisOrder(lOrder, accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(DELETE_THIS_ORDER);
            done();
        });
    });
});

describe('Current order modifications', () => {

    let lOrder = undefined;
    beforeAll(async (done) => {
        await store.dispatch(dispatch_CreateNewOrderForThisUser(accesstoken)).then(res => {
            lOrder = store.getActions()[0].id;
            done();
        });
    });

    const store = mockStore({});
    beforeEach(() => {
        store.clearActions();
    });

    it('Sets the order as current', (done) => {
        store.dispatch(dispatch_SetThisOrderAsCurrentOrder({}, ''));
        expect(store.getActions()[0].type).toBe(SET_THIS_ORDER_AS_CURRENT_ORDER);
        done();
    });
    it('Adds item to current order', (done) => {
        store.dispatch(dispatch_AddThisItemToQuantity(''));
        expect(store.getActions()[0].type).toBe(ADD_THIS_ITEM_TO_QUANTITY);
        done();
    });
    it('Delete item from current order', (done) => {
        store.dispatch(dispatch_DeleteThisItemFromQuantity('', 0));
        expect(store.getActions()[0].type).toBe(DELETE_THIS_ITEM_FROM_QUANTITY);
        done();
    });
    it('Change item count from current order', (done) => {
        store.dispatch(dispatch_IndecrementItemFromQuantity('', false, 0));
        expect(store.getActions()[0].type).toBe(INDECREMENT_ITEM_FROM_QUANTITY);
        done();
    });
    it('Adds new items to this order', (done) => {
        store.dispatch(dispatch_AddTheseItemsToThisOrder(
            lOrder, { 'MU-LTI-PL3': 1, 'MU-LTI-PL2': 1 }, accesstoken)).then(() => {
                expect(store.getActions()[0].type).toBe(ADD_THESE_ITEMS_TO_THIS_ORDER);
                done();
            });
    });
    it('Adds no items to this order', (done) => {
        store.dispatch(dispatch_AddTheseItemsToThisOrder(
            lOrder, { 'NO-ONN-EEE': 1 }, accesstoken)).then(() => {
                expect(store.getActions()[0].type).toBe(ERROR_APPEND_THIS_ITEM_TO_ORDER);
                done();
            });
    });
    it('Append new items to this order', (done) => {
        store.dispatch(dispatch_AppendThisItemToOrder('MU-LTI-PL3', lOrder, accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(APPEND_THIS_ITEM_TO_ORDER);
            done();
        });
    });
    it('Append no items to this order', (done) => {
        store.dispatch(dispatch_AppendThisItemToOrder('X', lOrder, accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(ERROR_APPEND_THIS_ITEM_TO_ORDER);
            done();
        });
    });
    it('Gets the complete item list', (done) => {
        store.dispatch(dispatch_GetTheCompleteItemsList(accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(FETCH_COMPLETE_ITEMS_LIST);
            done();
        });
    });
    it('Gets the complete item list with invalid token', (done) => {
        store.dispatch(dispatch_GetTheCompleteItemsList(accesstoken + 'z')).then(() => {
            expect(store.getActions()[0].type).toBe(ERROR_FETCHING_ITEMS_LIST);
            done();
        });
    });
    it('Quickly removes item from order', (done) => {
        store.dispatch(dispatch_QuickDeleteThisItemFromQuantity('MU-LTI-PL3', lOrder, 1, 1, accesstoken)
        ).then(() => {
            expect(store.getActions()[0].type).toBe(QUICK_DELETE_THIS_ITEM_FROM_QUANTITY);
            done();
        });
    });
    it('Quickly vary the item quantity', (done) => {
        store.dispatch(dispatch_QuickIndecrementItemFromQuantity(
            'MU-LTI-PL3', true, 10, lOrder, 1, accesstoken)).then(() => {
                expect(store.getActions()[0].type).toBe(QUICK_INDECREMENT_ITEM_FROM_QUANTITY);
                done();
            });
    });

    afterAll(async (done) => {
        await store.dispatch(dispatch_DeleteThisOrder(lOrder, accesstoken)).then(res => {
            done();
        })
    });

});




