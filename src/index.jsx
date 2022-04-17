import React from 'react';
import ReactDOM from 'react-dom/client';
// related to redux
import { store } from './redux/store';
import { Provider } from 'react-redux'
// components
import TodosList from './features/todos/TodosList'
import AddTodoForm  from './features/todos/AddTodoForm'

const App = () => {

  return (
    <div className="app">
      <TodosList />
      <hr />
      <AddTodoForm />
    </div>
  )
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);