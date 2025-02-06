import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTodo,
  sortTodos,
  toggleTodoStatus,
} from "./todoSlice";
import SortButton from "./components/SortButton";
import ModalComponent from "./components/ModalComponent";
import TodoList from "./components/TodoList";
import SearchBar from "./components/SearchBar";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [modalInputValue, setModalInputValue] = useState("");
  const [modalPriority, setModalPriority] = useState("low");
  const [editIndex, setEditIndex] = useState(null);
  const [editModalInputValue, setEditModalInputValue] = useState("");
  const [editModalPriority, setEditModalPriority] = useState("low");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddTodo = () => {
    if (modalInputValue.trim()) {
      dispatch(
        addTodo({
          text: modalInputValue,
          priority: modalPriority,
        })
      );
      setModalInputValue("");
      setModalPriority("low");
      setModalIsOpen(false);
    }
  };

  const handleSaveEdit = () => {
    const updatedTodo = {
      text: editModalInputValue,
      priority: editModalPriority,
    };
    dispatch(
      editTodo({
        index: editIndex,
        updatedTodo,
      })
    );
    setEditIndex(null);
    setEditModalIsOpen(false);
    setEditModalInputValue("");
  };

  const handleStartEdit = (index) => {
    setEditIndex(index);
    setEditModalInputValue(todos[index].text);
    setEditModalPriority(todos[index].priority);
    setEditModalIsOpen(true);
  };

  const handleToggleStatus = (index) => {
    dispatch(toggleTodoStatus(index));
  };
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">To Do</h1>

      <div className="w-full">
        <div className="flex justify-between">
          <SortButton sortTodos={() => dispatch(sortTodos())} />
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <button
            onClick={() => setModalIsOpen(true)}
            className="bg-green-500 text-white p-2 rounded w-1/6 mb-4"
          >
            +Add Task
          </button>
        </div>
        <TodoList
          todos={filteredTodos}
          deleteTodo={(index) => dispatch(deleteTodo(index))}
          startEdit={handleStartEdit}
          toggleStatus={handleToggleStatus}
        />
      </div>

      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        modalTitle="Add Task"
        inputValue={modalInputValue}
        setInputValue={setModalInputValue}
        modalPriority={modalPriority}
        setModalPriority={setModalPriority}
        onSave={handleAddTodo}
      />

      <ModalComponent
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        modalTitle="Edit Task"
        inputValue={editModalInputValue}
        setInputValue={setEditModalInputValue}
        modalPriority={editModalPriority}
        setModalPriority={setEditModalPriority}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

export default App;
