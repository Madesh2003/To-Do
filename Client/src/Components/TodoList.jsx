import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";


const TodoList = () => {
  const [createTodo, setCreateTodo] = useState(false);

  const { todos, addTodo, updateTodo, deleteTodo } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', date: '' });
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTodoId) {
      updateTodo(editingTodoId, newTodo);
      setEditingTodoId(null);
    } else {
      addTodo(newTodo);
    }
    setNewTodo({ title: '', description: '', date: '' });
    
    setCreateTodo(false)
  };

  const handleEdit = (id, title, description, date) => {
    setEditingTodoId(id);
    setCreateTodo(true);
    setNewTodo({ title, description, date });
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  return (
    <div className='w-full h-full relative inset-0 px-10 py-5 flex flex-col justify-center items-center'>
      <h2 className='text-center text-4xl mb-5'>Todo List</h2>
      <div className='grid grid-cols-5 gap-5'>
        {todos.map(todo => (
          <div key={todo._id} className='bg-gray-300 rounded-2xl p-5 w-full h-fit space-y-3'>
          <div>
          <p className='uppercase font-semibold text-lg'>Title</p>
          <p className='indent-2 uppercase font-semibold text-sm'>{todo.title}</p>
          </div>
             <div>
             <p className='font-semibold'>Description</p>
             <p className='indent-2'>{todo.description}</p>
             </div>
              <p className='font-semibold'>{todo.date}</p>
              <div className='flex justify-between items-center space-x-3'>
              <button onClick={() => handleEdit(todo._id, todo.title, todo.description, todo.date)} className='bg-neutral-500 px-4 py-1 rounded-2xl'>Edit</button>
              <button onClick={() => handleDelete(todo._id)} className=' bg-red-500 rounded-2xl px-4 py-1 text-white'>Delete</button>
              </div>
          </div>
        ))}
      </div>

      <div className='absolute top-5 right-10'>
        <button className='bg-gray-300 p-2 shadow-xl rounded-full' onClick={() => setCreateTodo(true)}><FaPlus /></button>
      </div>

      {
        createTodo && (
          <div className='inset-0 fixed bg-white bg-opacity-5 backdrop-blur-sm flex justify-center items-center px-5'>
            <div className='bg-gray-300 w-[400px] h-fit p-5 rounded-2xl shadow-2xl relative'>
              <button className='p-1 bg-white shadow-xl rounded-full text-xl absolute right-2' onClick={() => setCreateTodo(false)}>
                <IoIosClose />
              </button>
              <h1 className='text-center text-lg font-semibold mb-5'>{editingTodoId ? 'Update Todo' : 'Create Todo'}</h1>
              <form onSubmit={handleSubmit} className='flex flex-col justify-center items-start space-y-5'>
                <input
                  className='outline-none rounded-sm indent-2 p-1'
                  type="text"
                  name="title"
                  value={newTodo.title}
                  onChange={handleInputChange}
                  placeholder="Todo title"
                  required
                />
                <textarea
                  className='outline-none rounded-sm indent-2 p-1 w-full'
                  name="description"
                  value={newTodo.description}
                  onChange={handleInputChange}
                  placeholder="Todo description"
                  required
                />

                <input type="date" name="date" value={newTodo.date} className='outline-none rounded-sm p-1' onChange={handleInputChange} />
                <button type="submit" className='bg-gray-400 font-semibold py-1 px-4 rounded-2xl shadow-2xl'>{editingTodoId ? 'Update Todo' : 'Add Todo'}</button>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default TodoList;
