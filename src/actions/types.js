/******************************************************************************
 * APP STATE ==== The complete variable states of app circulated among others *
 * ========================================================================== *
 * PASSKEY           = Usertoken related to the logged in user                *
 * ISLOGGEDIN        = Log status of user                                     *
 * ITEMSLIST         = Every item in the database                             *
 * ORDERLIST         = Every order user has placed                            *
 * CURRENTORDER      = Order being created, viewed, edited, deleted           *
 * CURRENTORDERID    = ID of Order being created, viewed, edited, deleted     *
 * ITEMQUANTITY      = ProductIDs & quantities of items in an order           *
 * CLONEITEMQUANTITY = Copy of item quantities match with                     *
 * TOTAL             = Total of item prices in an order in context            *
 *****************************************************************************/

/******************************************************************************
 * Actions related to user account control
 *****************************************************************************/
export const SAVE_PASS_KEY
    = 'SAVE_PASS_KEY';
export const SHOW_LOGIN_ERROR
    = 'SHOW_LOGIN_ERROR';
export const SHOW_REGISTER_ERROR
    = 'SHOW_REGISTER_ERROR';
export const COMPLETE_REGISTRAION
    = 'COMPLETE_REGISTRAION';
export const CLEAR_PASS_KEY
    = 'CLEAR_PASS_KEY';

/******************************************************************************
* Actions related to items list
******************************************************************************/
export const FETCH_COMPLETE_ITEMS_LIST
    = 'FETCH_COMPLETE_ITEMS_LIST';
export const ERROR_FETCHING_ITEMS_LIST
    = 'ERROR_FETCHING_ITEMS_LIST';
export const CHANGE_ITEM_QUANTITY_IN_ITEMS_LIST
    = 'CHANGE_ITEM_QUANTITY_IN_ITEMS_LIST';

/******************************************************************************
* Actions related to orders
******************************************************************************/
export const SET_THIS_ORDER_AS_CURRENT_ORDER
    = 'SET_THIS_ORDER_AS_CURRENT_ORDER';
export const FETCH_EVERY_ORDER_FOR_THIS_USER
    = 'FETCH_EVERY_ORDER_FOR_THIS_USER';
export const ERROR_FETCHING_ORDER_LIST_FOR_USER
    = 'ERROR_FETCHING_ORDER_LIST_FOR_USER';
export const RESET_CURRENT_ORDER_STATES
    = 'RESET_CURRENT_ORDER_STATES';
export const CHECK_OUT_ORDER
    = 'CHECK_OUT_ORDER';
export const DELETE_THIS_ORDER
    = 'DELETE_THIS_ORDER';
export const ADD_THIS_ITEM_TO_QUANTITY
    = 'ADD_THIS_ITEM_TO_QUANTITY';
export const DELETE_THIS_ITEM_FROM_QUANTITY
    = 'DELETE_THIS_ITEM_FROM_QUANTITY';
export const CREATE_NEW_ORDER_FOR_THIS_USER
    = 'CREATE_NEW_ORDER_FOR_THIS_USER';
export const CHECK_THIS_ORDER_OUT
    = 'CHECK_THIS_ORDER_OUT';