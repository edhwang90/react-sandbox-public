import React from 'react';
import type { TodoListProps } from '../../../../../types/types';

import './todo-list.scss';
import TodoItem from '../todo-item/todo-item';

const TodoList = ({ todos, onToggle, onDelete, filters }: TodoListProps) => {
  
  if (todos.length === 0) {
    const hasFilters = filters.priority !== "all" || filters.tags.length > 0 || filters.search.trim() !== "";
    
    return (
      <div className="todo-list-empty-state">
        <p>
          {hasFilters && "Try adjusting your search or filters to see more tasks"}
          {!hasFilters && filters.status === "all" && "Add a task to get started"}
          {!hasFilters && filters.status === "active" && "All tasks are completed!"}
          {!hasFilters && filters.status === "completed" && "Complete some tasks to see them here"}
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </React.Fragment>
  );
}

export default TodoList;