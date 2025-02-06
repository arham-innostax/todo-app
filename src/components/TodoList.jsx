import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, startEdit, toggleStatus }) => (
  <table className="table-auto w-full bg-white shadow-md rounded">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2">Task No.</th>
        <th className="px-4 py-2">Task Name</th>
        <th className="px-4 py-2">Priority</th>
        <th className="px-4 py-2">Status</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {todos.map((task, index) => (
        <Todo
          key={index}
          index={index}
          todo={task}
          deleteTodo={() => deleteTodo(index)}
          startEdit={() => startEdit(index)}
          toggleStatus={() => toggleStatus(index)}
        />
      ))}
    </tbody>
  </table>
);

export default TodoList;
