import React, { useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import './index.css';

// init state
const initialState = {
  count: 0
};

// Context
const AppContext = React.createContext();
const AppReducer = (state, action) => {
  switch (action.type) {
    case 'count.add':
      return { ...state, count: state.count + 1 };
    case 'count.reduce':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Provider
const AppProvider = props => {
  let [state, dispatch] = useReducer(AppReducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.element.isRequired
};

function AppContainer() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div className="App">
      <header className="App-header">
        <p>react-project-template</p>
        <p>This is containers App</p>
      </header>
      <div className="App-container">
        <p>App</p>
        <button
          onClick={() => {
            dispatch({ type: 'count.add' });
          }}
        >
          +
        </button>
        <span>{state.count}</span>
        <button
          onClick={() => {
            dispatch({ type: 'count.reduce' });
          }}
        >
          -
        </button>
        <Demo />
      </div>
    </div>
  );
}

function Demo() {
  const { state, dispatch } = useContext(AppContext);
  // console.log('demo');
  return (
    <div className="demo">
      <p>demo</p>
      <button
        onClick={() => {
          dispatch({ type: 'count.add' });
        }}
      >
        +
      </button>
      <span>{state.count}</span>
      <button
        onClick={() => {
          dispatch({ type: 'count.reduce' });
        }}
      >
        -
      </button>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContainer />
    </AppProvider>
  );
}

export default App;
