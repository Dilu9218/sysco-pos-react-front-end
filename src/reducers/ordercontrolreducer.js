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
} from "../actions/types";

let initialState = {
    itemsList: [],
    viewItemList: [],
    orderList: [],
    currentOrder: {},
    currentOrderID: "",
    total: 0,
    itemQuantity: {},
    clonedItemQuantity: {},
    url: "",
    status: false
}

export const ORDER_LIST_REDUCER = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMPLETE_ITEMS_LIST:
            return {
                ...state,
                itemsList: action.itemsList,
                viewItemList: JSON.parse(JSON.stringify(action.itemsList)),
            };
        case ERROR_FETCHING_ITEMS_LIST:
            return {
                ...state,
                itemsList: [],
                viewItemList: []
            };
        case FETCH_EVERY_ORDER_FOR_THIS_USER:
            return {
                ...state,
                orderList: action.orderList
            };
        case ERROR_FETCHING_ORDER_LIST_FOR_USER:
            return {
                ...state,
                orderList: [],
                currentOrder: {},
                currentOrderID: "",
                total: 0,
                itemQuantity: {},
                clonedItemQuantity: {},
                url: "",
                status: false
            };
        case DELETE_THIS_ORDER:
            return {
                ...state,
                orderList: state.orderList.filter((order) => (order._id !== action.id)),
                currentOrder: {},
                currentOrderID: "",
                total: 0,
                itemQuantity: {},
                clonedItemQuantity: {},
                url: "",
                status: false
            };
        case CHECK_OUT_ORDER:
            return {
                ...state,
                url: "/my_orders",
                orderList: state.orderList.filter((order) => (order._id !== action.id)),
            };
        case SET_THIS_ORDER_AS_CURRENT_ORDER:
            let tempItemQuantity = {};
            let tempTotal = 0;
            let currentOrder = action.currentOrder;
            for (var item in currentOrder.items) {
                tempTotal += (
                    currentOrder.items[item].quantity *
                    currentOrder.items[item].price
                );
                tempItemQuantity[
                    currentOrder.items[item].productID
                ] = currentOrder.items[item].quantity;
            }
            return {
                ...state,
                currentOrder: action.currentOrder,
                currentOrderID: action.currentOrder._id,
                total: tempTotal,
                itemQuantity: tempItemQuantity,
                clonedItemQuantity: JSON.parse(JSON.stringify(tempItemQuantity)),
                url: action.url
            };
        case RESET_CURRENT_ORDER_STATES:
            return {
                ...state,
                currentOrder: {},
                viewItemList: [],
                currentOrderID: "",
                total: 0,
                itemQuantity: {},
                clonedItemQuantity: {},
                url: "",
                status: false
            };
        case CREATE_NEW_ORDER_FOR_THIS_USER:
            return {
                ...state,
                currentOrderID: action.id
            };
        case ADD_THIS_ITEM_TO_QUANTITY:
            return {
                ...state,
                itemQuantity: {
                    ...state.itemQuantity,
                    [action.id]: 0
                }
            };
        case DELETE_THIS_ITEM_FROM_QUANTITY:
            let newItemQuantity = state.itemQuantity;
            let reserve = (action.price * state.itemQuantity[action.id]);
            delete newItemQuantity[action.id];
            return {
                ...state,
                total: state.total - reserve,
                itemQuantity: newItemQuantity
            };
        case INDECREMENT_ITEM_FROM_QUANTITY:
            return {
                ...state,
                total: state.total + (
                    action.direction ? 1 : -1) * action.price,
                itemQuantity: {
                    ...state.itemQuantity,
                    [action.id]: state.itemQuantity[action.id] + (
                        action.direction ? 1 : -1)
                }
            };
        case ADD_THESE_ITEMS_TO_THIS_ORDER:
            return {
                ...state,
                orderList: [
                    ...state.orderList,
                    action.updatedOrder
                ],
                status: true
            };
        case APPEND_THIS_ITEM_TO_ORDER:
            let newItem = JSON.parse(JSON.stringify(
                state.itemsList.find((I) => (I.productID === action.productID))));
            newItem.quantity--;
            let newItemsList = JSON.parse(JSON.stringify(
                state.itemsList.filter((I) => (I.productID !== action.productID))));
            let oldItemsList = JSON.parse(JSON.stringify(state.itemsList));
            oldItemsList.find((I) => (I.productID === action.productID)).quantity--;
            return {
                ...state,
                viewItemList: newItemsList,
                itemsList: oldItemsList,
                currentOrder: action.currentOrder,
                itemQuantity: {
                    ...state.itemQuantity,
                    [action.productID]: 1
                },
                clonedItemQuantity: {
                    ...state.clonedItemQuantity,
                    [action.productID]: 1
                },
                total: state.total + (action.price)
            };
        case QUICK_DELETE_THIS_ITEM_FROM_QUANTITY:
            let nItm = state.itemQuantity;
            let r = (action.price * state.itemQuantity[action.id]);
            delete nItm[action.id];
            return {
                ...state,
                currentOrder: action.updatedOrder,
                total: state.total - r,
                itemQuantity: nItm
            };
        case QUICK_INDECREMENT_ITEM_FROM_QUANTITY:
            return {
                ...state,
                total: state.total + (action.direction ? 1 : -1) * action.price,
                currentOrder: action.updatedOrder,
                itemQuantity: {
                    ...state.itemQuantity,
                    [action.id]: state.itemQuantity[action.id] + (action.direction ? 1 : -1)
                }
            };
        default:
            return state;
    }
};