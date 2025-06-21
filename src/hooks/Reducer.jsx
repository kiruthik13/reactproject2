// src/hooks/Reducer.jsx
import { useReducer } from 'react';

// Step 1: Reducer function
const reducerFunction = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
};

// Step 2: Initial value
const initialValue = { count: 0 };

// Step 3: Component
const Reducer = () => {
  const [state, dispatch] = useReducer(reducerFunction, initialValue);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>useReducer Example</h2>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
};

export default Reducer;
