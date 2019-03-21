import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

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
} from "../../actions/types";
import {
    dispatchCreateNewOrderForThisUser,
    dispatchAddTheseItemsToThisOrder,
    dispatchAddThisItemToQuantity,
    dispatchAppendThisItemToOrder,
    dispatchCheckOutOrder,
    dispatchDeleteThisItemFromQuantity,
    dispatchDeleteThisOrder,
    dispatchFetchEveryOrderForThisUser,
    dispatchGetTheCompleteItemsList,
    dispatchIndecrementItemFromQuantity,
    dispatchQuickDeleteThisItemFromQuantity,
    dispatchQuickIndecrementItemFromQuantity,
    dispatchResetCurrentOrderStates,
    dispatchSetThisOrderAsCurrentOrder
} from "../../actions/ordercontrolactions";
import { USER_LOGIN_ENDPOINT } from "../../constants";
const axios = require("axios");

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
var accesstoken;

let gOrder = undefined;

beforeAll(async (done) => {
    await axios.post(USER_LOGIN_ENDPOINT, {
        username: "testUser",
        password: "abcd"
    }).then(res => {
        accesstoken = res.data.token;
        done();
    });
});

describe("Fetch all orders", () => {

    const store = mockStore({});
    beforeEach(() => {
        store.clearActions();
    });

    it("Fetches all orders of this user", (done) => {
        store.dispatch(dispatchFetchEveryOrderForThisUser(accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(FETCH_EVERY_ORDER_FOR_THIS_USER);
            done();
        });
    });
    it("Fetches all orders of this user with invalid token", (done) => {
        store.dispatch(dispatchFetchEveryOrderForThisUser(accesstoken + "z")).then(() => {
            expect(store.getActions()[0].type).toBe(ERROR_FETCHING_ORDER_LIST_FOR_USER);
            done();
        });
    });
});

describe("Creates new orders", () => {

    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
    });

    it("Creates a new order for this user", (done) => {
        store.dispatch(dispatchCreateNewOrderForThisUser(accesstoken)).then(() => {
            gOrder = store.getActions()[0].id;
            expect(store.getActions()[0].type).toBe(CREATE_NEW_ORDER_FOR_THIS_USER);
            done();
        });
    });
    it("Creates a new order for this user with invalid authorization", (done) => {
        store.dispatch(dispatchCreateNewOrderForThisUser(accesstoken + "z")).then(() => {
            expect(store.getActions()[0].type).toBe(ERROR_CREATE_NEW_ORDER_FOR_THIS_USER);
            done();
        });
    });
});

describe("Reset order status", () => {

    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
    });

    it("Resets order status for this user", (done) => {
        store.dispatch(dispatchResetCurrentOrderStates());
        expect(store.getActions()[0].type).toBe(RESET_CURRENT_ORDER_STATES);
        done();
    });
});

describe("Checkouts orders", () => {

    let lOrder = undefined;
    beforeAll(async (done) => {
        await store.dispatch(dispatchCreateNewOrderForThisUser(accesstoken)).then(res => {
            lOrder = store.getActions()[0].id;
            done();
        });
    });

    const store = mockStore({});
    beforeEach(() => {
        store.clearActions();
    });

    it("Checkouts order and update status for this user", (done) => {
        store.dispatch(dispatchCheckOutOrder(gOrder, accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(CHECK_OUT_ORDER);
            done();
        });
    });
    it("Checkouts order with invalid authorization", (done) => {
        store.dispatch(dispatchCheckOutOrder(gOrder, accesstoken + "z")).then(() => {
            expect(store.getActions()[0].type).toBe(ERROR_CHECK_OUT_ORDER);
            done();
        });
    });
    it("Deletes the same order and update status for this user", (done) => {
        store.dispatch(dispatchDeleteThisOrder(gOrder, accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(ERROR_DELETE_THIS_ORDER);
            done();
        });
    });
    it("Deletes a new order and update status", (done) => {
        store.dispatch(dispatchDeleteThisOrder(lOrder, accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(DELETE_THIS_ORDER);
            done();
        });
    });
});

describe("Current order modifications", () => {

    let lOrder = undefined;
    beforeAll(async (done) => {
        await store.dispatch(dispatchCreateNewOrderForThisUser(accesstoken)).then(res => {
            lOrder = store.getActions()[0].id;
            done();
        });
    });

    const store = mockStore({});
    beforeEach(() => {
        store.clearActions();
    });

    it("Sets the order as current", (done) => {
        store.dispatch(dispatchSetThisOrderAsCurrentOrder({}, ""));
        expect(store.getActions()[0].type).toBe(SET_THIS_ORDER_AS_CURRENT_ORDER);
        done();
    });
    it("Adds item to current order", (done) => {
        store.dispatch(dispatchAddThisItemToQuantity(""));
        expect(store.getActions()[0].type).toBe(ADD_THIS_ITEM_TO_QUANTITY);
        done();
    });
    it("Delete item from current order", (done) => {
        store.dispatch(dispatchDeleteThisItemFromQuantity("", 0));
        expect(store.getActions()[0].type).toBe(DELETE_THIS_ITEM_FROM_QUANTITY);
        done();
    });
    it("Change item count from current order", (done) => {
        store.dispatch(dispatchIndecrementItemFromQuantity("", false, 0));
        expect(store.getActions()[0].type).toBe(INDECREMENT_ITEM_FROM_QUANTITY);
        done();
    });
    it("Adds new items to this order", (done) => {
        store.dispatch(dispatchAddTheseItemsToThisOrder(
            lOrder, { "IT-EM1-099": 1, "PO-WER-SUP": 1 }, accesstoken)).then(() => {
                expect(store.getActions()[0].type).toBe(ADD_THESE_ITEMS_TO_THIS_ORDER);
                done();
            });
    });
    it("Adds no items to this order", (done) => {
        store.dispatch(dispatchAddTheseItemsToThisOrder(
            lOrder, { "NO-ONN-EEE": 1 }, accesstoken)).then(() => {
                expect(store.getActions()[0].type).toBe(ERROR_APPEND_THIS_ITEM_TO_ORDER);
                done();
            });
    });
    it("Append new items to this order", (done) => {
        store.dispatch(dispatchAppendThisItemToOrder(10, "PO-WER-SUP", lOrder, accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(APPEND_THIS_ITEM_TO_ORDER);
            done();
        });
    });
    it("Append no items to this order", (done) => {
        store.dispatch(dispatchAppendThisItemToOrder(10, "X", lOrder, accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(ERROR_APPEND_THIS_ITEM_TO_ORDER);
            done();
        });
    });
    it("Gets the complete item list", (done) => {
        store.dispatch(dispatchGetTheCompleteItemsList(accesstoken)).then(() => {
            expect(store.getActions()[0].type).toBe(FETCH_COMPLETE_ITEMS_LIST);
            done();
        });
    });
    it("Gets the complete item list with invalid token", (done) => {
        store.dispatch(dispatchGetTheCompleteItemsList(accesstoken + "z")).then(() => {
            expect(store.getActions()[0].type).toBe(ERROR_FETCHING_ITEMS_LIST);
            done();
        });
    });
    it("Quickly removes item from order", (done) => {
        store.dispatch(dispatchQuickDeleteThisItemFromQuantity("MU-LTI-PL3", lOrder, 1, 1, accesstoken)
        ).then(() => {
            expect(store.getActions()[0].type).toBe(QUICK_DELETE_THIS_ITEM_FROM_QUANTITY);
            done();
        });
    });
    it("Quickly vary the item quantity", (done) => {
        store.dispatch(dispatchQuickIndecrementItemFromQuantity(
            "MU-LTI-PL3", true, 10, lOrder, 1, accesstoken)).then(() => {
                expect(store.getActions()[0].type).toBe(QUICK_INDECREMENT_ITEM_FROM_QUANTITY);
                done();
            });
    });
    it("Quickly vary the item quantity", (done) => {
        store.dispatch(dispatchQuickIndecrementItemFromQuantity(
            "MU-LTI-PL3", false, 10, lOrder, 1, accesstoken)).then(() => {
                expect(store.getActions()[0].type).toBe(QUICK_INDECREMENT_ITEM_FROM_QUANTITY);
                done();
            });
    });

    afterAll(async (done) => {
        await store.dispatch(dispatchDeleteThisOrder(lOrder, accesstoken)).then(res => {
            done();
        })
    });

});




