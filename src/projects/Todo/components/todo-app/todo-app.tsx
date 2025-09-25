import React from 'react';
import type { TodoType, FiltersType } from '../../../../types/types';

import TodoList from './todo-list/todo-list';
import TodoFilters from './todo-filters/todo-filters';

interface TodoAppProps {
  filteredTodos: TodoType[];
  todos: TodoType[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
  activeTodosCount: number;
  completedTodosCount: number;
  allTags: (string | undefined)[];
  tagFrequency: Record<string, number>;
  availablePriorities: Array<"low" | "medium" | "high">;
  priorityCounts: Record<string, number>;
}

const TodoApp = ({ 
  filteredTodos,
  toggleTodo,
  deleteTodo,
  filters,
  setFilters,
  activeTodosCount,
  completedTodosCount,
  allTags,
  tagFrequency,
  availablePriorities,
  priorityCounts
}: TodoAppProps) => {

  return (
    <React.Fragment>
      <div className="filter-section">
        <TodoFilters
          filters={filters}
          onFiltersChange={setFilters}
          activeTodosCount={activeTodosCount}
          completedTodosCount={completedTodosCount}
          allTags={allTags.filter((tag): tag is string => tag !== undefined)}
          tagFrequency={tagFrequency}
          availablePriorities={availablePriorities}
          priorityCounts={priorityCounts}
        />
      </div>

      <div className="todos-section">
        <TodoList 
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          filters={filters}
        />
      </div>
    </React.Fragment>
  )
}

export default TodoApp;