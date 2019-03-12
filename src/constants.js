export const BASEURL = process.env.BASEURL;
export const ORDER_ENDPOINT = '/order';
export const ITEMS_ENDPOINT = '/item';
export const USERS_ENDPOINT = '/user';

export const USER_LOGIN_ENDPOINT = BASEURL + USERS_ENDPOINT + '/login';
export const USER_REGISTER_ENDPOINT = BASEURL + USERS_ENDPOINT + '/register';

export const ITEMS_LIST_ENDPOINT = BASEURL + ITEMS_ENDPOINT + '/list';

export const ORDER_LIST_ENDPOINT = BASEURL + ORDER_ENDPOINT + '/list';
export const NEW_ORDER_ENDPOINT = BASEURL + ORDER_ENDPOINT + '/order';
export const ADD_TO_ORDER_ENDPOINT = BASEURL + ORDER_ENDPOINT + '/items';
export const APPEND_TO_ORDER_ENDPOINT = BASEURL + ORDER_ENDPOINT + '/item';
export const ORDER_CHECKOUT_ENDPOINT = BASEURL + ORDER_ENDPOINT + '/checkout';
export const ORDER_REQUEST_ENDPOINT = BASEURL + ORDER_ENDPOINT + '/order';

export const USERTOKEN = 'usertoken'

/***************************************************************************************************
 * BASEURL = 'http://localhost:8080/api';
 * BASEURL = 'https://sysco-pos-rest-api.herokuapp.com/api'
 * export BASEURL="http://localhost:8080/api"
 **************************************************************************************************/