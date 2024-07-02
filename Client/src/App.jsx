import React from 'react';
import TodoContextProvider from './context/TodoContext';
import TodoList from './Components/TodoList';

function App() {
  return (
    <TodoContextProvider>
      <div className="App">
        <TodoList />
      </div>
    </TodoContextProvider>
  );
}

export default App;
