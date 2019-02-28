import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shape } from 'prop-types';

configure({ adapter: new Adapter() });

// Instantiate router context
const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = () => ({
  context: { router },
  childContextTypes: { router: shape({}) },
});

export function mountWrap(node) {
  return mount(node, createContext());
}

export function shallowWrap(node) {
  return shallow(node, createContext());
}

export { shallow, mount, render };
export default Enzyme;