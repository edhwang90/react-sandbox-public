import Checkbox from '../../../../../components/checkbox/checkbox';
import type { TodoItemProps } from '../../../../../types/types';
import { ClockIcon, FlagIcon, TrashIcon } from "@phosphor-icons/react";

import './todo-item.scss';

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {

  const handleDelete = () => {
    // buggy on chrome to utilize custom modal
    //confirm("Are you sure you want to delete this task?") && onDelete(todo.id);
    onDelete(todo.id);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "priority-color-high";
      case "medium": return "priority-color-medium";
      case "low": return "priority-color-low";
      default: return "muted-todo";
    }
  };

  return (
    <div className="todo-item-container">
      <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <div className="left-actions">
          <Checkbox 
            onChange={() => onToggle(todo.id)}
            isChecked={todo.completed} />
        </div>

        <div className="details-container">
          <h4>{todo.title}</h4>

          <div className="description">
            {todo.description}
          </div>

          <div className="details-tags">
            {todo.tags?.map((tag, index) => (
              <span className="tag" key={index}>{tag}</span>
            ))}
          </div>

          <div className="meta-info">
            <div>
              <ClockIcon />
              <span>
                {todo.completed && todo.completedAt 
                  ? (
                    "Completed " + formatTimeAgo(todo.completedAt) 
                  )
                  : formatTimeAgo(todo.createdAt)
                }
              </span>
            </div>
            <div>
              <FlagIcon className={getPriorityColor(todo.priority)} />
              <span className={getPriorityColor(todo.priority)}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1) + ' priority'}
              </span>
            </div>
          </div>
        </div>

        <div className="right-actions">
          <button onClick={handleDelete} className="btn btn-danger">
            <TrashIcon />
            Delete
          </button>
        </div>
      </div>

      <div className="todo-item-main">

      </div>

    </div>
  )
}

export default TodoItem;