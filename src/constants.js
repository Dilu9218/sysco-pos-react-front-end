//export const BASEURL                = 'http://localhost:8080';
export const BASEURL                = 'http://sysco-pos-rest-api.herokuapp.com'
export const ORDER_ENDPOINT          = '/api/order';
export const ITEMS_ENDPOINT          = '/api/item';
export const USERS_ENDPOINT          = '/api/user';

export const USER_LOGIN_ENDPOINT    = BASEURL + USERS_ENDPOINT + '/login';
export const USER_REGISTER_ENDPOINT = BASEURL + USERS_ENDPOINT + '/register';

export const ITEMS_LIST_ENDPOINT    = BASEURL + ITEMS_ENDPOINT + '/list';

export const ORDER_LIST_ENDPOINT    = BASEURL + ORDER_ENDPOINT + '/list';
export const NEW_ORDER_ENDPOINT     = BASEURL + ORDER_ENDPOINT + '/new';
export const ADD_TO_ORDER_ENDPOINT  = BASEURL + ORDER_ENDPOINT + '/add';
export const ORDER_CHECKOUT_ENDPOINT= BASEURL + ORDER_ENDPOINT + '/checkout'
export const ORDER_REQUEST_ENDPOINT = BASEURL + ORDER_ENDPOINT + '/order';

export const USERTOKEN              = 'usertoken'
