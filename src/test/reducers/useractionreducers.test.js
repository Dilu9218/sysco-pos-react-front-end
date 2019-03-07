import {
    PASS_KEY_REDUCER,
    REGISTRATION_REDUCER
} from '../../reducers/useraccountcontrolreducer';
import {
    SAVE_PASS_KEY,
    SHOW_LOGIN_ERROR,
    SHOW_REGISTER_ERROR,
    COMPLETE_REGISTRAION,
    CLEAR_PASS_KEY
} from '../../actions/types';

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
});