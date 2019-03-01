import {
    SAVE_PASS_KEY,
    CLEAR_PASS_KEY,
    SET_LOGGED_IN_STATUS
} from '../actions/types';

const initialState = {
    items: [],
    item: {}
};

function visibilityFilter(state = 'SHOW_ALL', action) {
    if (action.type === 'SET_VISIBILITY_FILTER') {
      return action.filter
    } else {
      return state
    }
  }
  
  function todos(state = [], action) {
    switch (action.type) {
      case 'ADD_TODO':
        return state.concat([{ text: action.text, completed: false }])
      case 'TOGGLE_TODO':
        return state.map((todo, index) =>
          action.index === index
            ? { text: todo.text, completed: !todo.completed }
            : todo
        )
      default:
        return state
    }
  }

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_POST:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}