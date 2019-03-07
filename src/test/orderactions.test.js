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
    CREATE_NEW_ORDER_FOR_THIS_USER
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
const accesstoken = "";

let gUser = undefined;

function generateUserName() {
    var text = "";
    var possible = "ABC DEFGH IJKL MNOPQRST U VWXYZabcde fghijklmnopq rstu vwxy z";
    for (var i = 0; i < 9; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

beforeAll(() => {
    gUser = generateUserName();
});

describe('Fetch all orders', () => {

    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
    });

    it('Fetches all orders of this user', (done) => {
        store.dispatch(dispatch_FetchEveryOrderForThisUser(accesstoken)).then(() => {
            console.log(store.getActions());
            done();
        });
    })
});