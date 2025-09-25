import './todos.scss';

import { useState } from 'react';
import { Toaster } from 'sonner';

import Logo from "../../assets/todo-logo.png";

import Select from '../../components/select/select';
import TodoApp from './components/todo-app/todo-app';
import Dashboard from './components/dashboard/dashboard';
import { PlusIcon } from '@phosphor-icons/react';
import Modal from '../../components/modal/modal';
import useTodos from './useTodos';
import TodoForm from './components/todo-app/todo-form/todo-form';

const navOptions = [
  { value: 'tasks', label: 'Tasks' },
  { value: 'dashboard', label: 'Dashboard' }
];

const Todo = () => {

  const { 
    allTags, 
    nonFilteredTags,
    tagFrequency, 
    addTodo,
    filteredTodos,
    todos,
    toggleTodo,
    deleteTodo,
    filters,
    setFilters,
    activeTodosCount,
    completedTodosCount,
    availablePriorities,
    priorityCounts
  } = useTodos();

  const [navMode, setNavMode] = useState('tasks');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navSelect = (selection: string) => {
    setNavMode(selection);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const submitForm = (title: string, description: string, priority: string, tags?: string[]) => {
    addTodo(title, description, priority, tags);
    toggleModal();
  }

  return (
    <div className="todos-app">
      <Toaster position="top-right" closeButton richColors />

      <nav className="todos-nav">
        <div className="nav-main">
          <img className="logo" title="Logo" alt="Logo" src={Logo}></img>
          
          <Select 
            className="nav-select"
            onSelect={navSelect}
            selectedOption={
              navMode === 'tasks' ? 'Tasks' : 'Dashboard'
            }
            options={navOptions}></Select>
        </div>

        { navMode === 'tasks' &&
          <button onClick={toggleModal} className="btn btn-default">
            <PlusIcon /> Add
          </button>
        }

      </nav>

      { isModalOpen && 
        <Modal>
          <div className="modal-content">
            <h4>Add a new task</h4>

            <TodoForm 
              onCancel={toggleModal}
              onSubmit={submitForm}
              existingTags={nonFilteredTags.filter((tag): tag is string => typeof tag === 'string')}
              tagFrequency={tagFrequency}
              availablePriorities={availablePriorities}
              filters={filters}
            ></TodoForm>

          </div>
        </Modal>
      }

      {
        navMode === 'tasks'
        ?
          <TodoApp 
            filteredTodos={filteredTodos}
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            filters={filters}
            setFilters={setFilters}
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
            allTags={allTags}
            tagFrequency={tagFrequency}
            availablePriorities={availablePriorities}
            priorityCounts={priorityCounts}
          />
        :
          <Dashboard todos={todos} />
      }
    </div>
  )
}

export default Todo;