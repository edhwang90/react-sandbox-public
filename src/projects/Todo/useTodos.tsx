import { useState, useEffect } from 'react';
import type { FiltersType, PriorityFilter, TodoType } from '../../types/types';
import { TodosJSON, FiltersDefault } from './todos-json';

import { toast } from 'sonner';

const useTodos = () => {
  const getTodos: () => Promise<TodoType[]> = () => {
    // mock fetch call
    return new Promise((resolve) => {
      resolve(TodosJSON);
    });
  }

  const getFilterDefaults: () => Promise<FiltersType> = () => {
    // mock fetch call
    return new Promise((resolve) => {
      resolve(FiltersDefault);
    });
  }

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filters, setFilters] = useState<FiltersType>({
    status: "all",
    priority: "all",
    tags: [],
    search: ""
  });

  // Fetch todos on mount
  useEffect(() => {
    getTodos().then(setTodos);
    getFilterDefaults().then(setFilters);
  }, []);

  const [showAddForm, setShowAddForm] = useState(false);
 
  const addTodo = (title: string, description: string, priority: string, tags?: string[]) => {
    const newTodo: TodoType = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date(),
      priority,
      tags
    };

    setTodos([newTodo, ...todos]);
    toast.success("Task added!");
  };

  const toggleTodo = (id: string) => {
    // preserve scroll position
    const scrollY = window.scrollY;

    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date() : undefined
        };
      }
      return todo;
    }));

    window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });

    toast.success("Task updated!");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success("Task deleted!");
  };

  const clearCompleted = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    setTodos(todos.filter(todo => !todo.completed));
    if (completedCount > 0) {
      toast.success(`${completedCount} completed task${completedCount > 1 ? 's' : ''} cleared!`);
    }
  };

  const filteredTodos =
    todos.filter((todo: TodoType) => {
        // Status filter
        if (filters.status === "active" && todo.completed) return false;
        if (filters.status === "completed" && !todo.completed) return false;
        
        // Priority filter
        if (filters.priority !== "all" && todo.priority !== filters.priority) return false;
        
        // Tags filter
        if (filters.tags.length > 0) {
          if (todo.tags !== undefined && todo.tags.length > 0) {
            const hasMatchingTag = filters.tags.some(filterTag => 
              todo.tags?.some(todoTag => 
                todoTag.toLowerCase().includes(filterTag.toLowerCase())
              )
            );
            if (!hasMatchingTag) return false;
          } else {
            // If todo has no tags but tags filter is active, exclude it
            return false;
          }
        }
        
        // Search filter (searches both text content and tags)
        if (filters.search && filters.search.trim() !== "") {
          const searchTerm = filters.search.toLowerCase().trim();
          const textMatch = todo.title.toLowerCase().includes(searchTerm) || todo.description.toLowerCase().includes(searchTerm);
          const tagMatch = todo.tags?.some(tag => 
            tag.toLowerCase().includes(searchTerm)
          ) || false;
          if (!textMatch && !tagMatch) return false;
        }

        
        return true;
      }).sort((a, b) => {
        // Primary sort: incomplete tasks first, completed tasks last
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        
        if (a.completed) {
          // For completed tasks: sort by completion date (most recently completed first)
          const aCompletedAt = a.completedAt?.getTime() || 0;
          const bCompletedAt = b.completedAt?.getTime() || 0;
          return bCompletedAt - aCompletedAt;
        } else {
          // For active tasks: use Eisenhower Matrix prioritization
          
          // Helper function to determine urgency based on creation date and tags
          const getUrgency = (todo: TodoType): boolean => {
            const daysSinceCreated = (Date.now() - todo.createdAt.getTime()) / (1000 * 60 * 60 * 24);
            const hasUrgentTags = todo.tags?.some(tag => 
              tag.toLowerCase().includes('urgent') || 
              tag.toLowerCase().includes('deadline') ||
              tag.toLowerCase().includes('asap') ||
              tag.toLowerCase().includes('today')
            );
            
            // Task is urgent if it's recent (within 2 days) or has urgent tags
            return daysSinceCreated <= 2 || (hasUrgentTags || false);
          };
          
          // Helper function to determine importance based on priority and tags
          const getImportance = (todo: TodoType): boolean => {
            const hasImportantTags = todo.tags?.some(tag => 
              tag.toLowerCase().includes('important') || 
              tag.toLowerCase().includes('critical') ||
              tag.toLowerCase().includes('work') ||
              tag.toLowerCase().includes('project') ||
              tag.toLowerCase().includes('goal')
            );
            
            // Task is important if it's high/medium priority or has important tags
            return todo.priority === 'high' || todo.priority === 'medium' || (hasImportantTags || false );
          };
          
          // Determine Eisenhower Matrix quadrants
          const aUrgent = getUrgency(a);
          const aImportant = getImportance(a);
          const bUrgent = getUrgency(b);
          const bImportant = getImportance(b);
          
          // Quadrant assignment (lower number = higher priority)
          const getQuadrant = (urgent: boolean, important: boolean): number => {
            if (urgent && important) return 1;     // Q1: Do First (Crisis)
            if (!urgent && important) return 2;    // Q2: Schedule (Goals)
            if (urgent && !important) return 3;    // Q3: Delegate (Interruptions)
            return 4;                              // Q4: Eliminate (Distractions)
          };
          
          const aQuadrant = getQuadrant(aUrgent, aImportant);
          const bQuadrant = getQuadrant(bUrgent, bImportant);
          
          // Primary sort by Eisenhower quadrant
          if (aQuadrant !== bQuadrant) {
            return aQuadrant - bQuadrant;
          }
          
          // Secondary sort within same quadrant: by priority level
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const priorityDiff = priorityOrder[b.priority as "low" | "medium" | "high"] - priorityOrder[a.priority as "low" | "medium" | "high"];
          if (priorityDiff !== 0) {
            return priorityDiff;
          }
          
          // Tertiary sort: by creation date (more recent first)
          return b.createdAt.getTime() - a.createdAt.getTime();
        }
      });
  

  // const getAllTodos = () => {
  //   return filteredTodos(todos);
  // }

  // Calculate filtered todos for filter options (excluding the filter being calculated)
  const getFilteredTodosForOptions = (excludeFilter: 'status' | 'priority' | 'tags' | 'search' | 'none' = 'none') => {
    return todos.filter(todo => {
      // Apply all filters except the excluded one
      if (excludeFilter !== 'status') {
        if (filters.status === "active" && todo.completed) return false;
        if (filters.status === "completed" && !todo.completed) return false;
      }
      
      if (excludeFilter !== 'priority') {
        if (filters.priority !== "all" && todo.priority !== filters.priority) return false;
      }
      
      if (excludeFilter !== 'tags') {
        if (filters.tags.length > 0) {
          if (todo.tags !== undefined && todo.tags.length > 0) {
            const hasMatchingTag = filters.tags.some(filterTag => 
              todo.tags?.some(todoTag => 
                todoTag.toLowerCase().includes(filterTag.toLowerCase())
              )
            );
            if (!hasMatchingTag) return false;
          } else {
            // If todo has no tags but tags filter is active, exclude it
            return false;
          }
        }
      }

      if (excludeFilter !== 'search') {
        if (filters.search && filters.search.trim() !== "") {
          const searchTerm = filters.search.toLowerCase().trim();
          const textMatch = todo.title.toLowerCase().includes(searchTerm) || todo.description.toLowerCase().includes(searchTerm);
          const tagMatch = todo.tags?.some(tag => 
            tag.toLowerCase().includes(searchTerm)
          ) || false;
          if (!textMatch && !tagMatch) return false;
        }
      }
      return true;
    });
  };

  // Get available tags based on current priority and status filters
  const availableTodosForTags = getFilteredTodosForOptions('tags');
  const allTags = Array.from(new Set(availableTodosForTags.flatMap(todo => todo.tags)));
  
  const nonFilteredTags = Array.from(new Set(todos.flatMap(todo => todo.tags)));

  // Auto-reset selected tags that are no longer available
  const validSelectedTags = filters.tags.filter(selectedTag => 
    allTags.some(availableTag => 
      availableTag?.toLowerCase().includes(selectedTag.toLowerCase())
    )
  );
  
  // Update filters if some tags were invalidated
  if (validSelectedTags.length !== filters.tags.length) {
    const updatedFilters = { ...filters, tags: validSelectedTags };
    const removedTags = filters.tags.filter(tag => !validSelectedTags.includes(tag));
    setFilters(updatedFilters);
    
    if (removedTags.length > 0) {
      toast.info(`Tag filter${removedTags.length > 1 ? 's' : ''} "${removedTags.join('", "')}" ${removedTags.length > 1 ? 'were' : 'was'} cleared as no matching tasks were found.`);
    }
  }
  
  // Calculate tag frequencies from available todos
  const tagFrequency = availableTodosForTags.flatMap(todo => todo.tags).reduce((acc, tag) => {
    if (tag) {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }
    else {
      return acc;
    }

  }, {} as Record<string, number>);
  
  const topTags = Object.entries(tagFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([tag]) => tag);

  // Calculate status counts based on current priority and tag filters
  const availableTodosForStatus = getFilteredTodosForOptions('status');
  const activeTodosCount = availableTodosForStatus.filter(todo => !todo.completed).length;
  const completedTodosCount = availableTodosForStatus.filter(todo => todo.completed).length;

  // Calculate available priorities based on current status and tag filters
  const availableTodosForPriority = getFilteredTodosForOptions('priority');
  const priorityCounts = availableTodosForPriority.reduce((acc, todo) => {
    acc[todo.priority] = (acc[todo.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const availablePriorities = Object.keys(priorityCounts) as Array<"low" | "medium" | "high">;
  
  // Auto-reset selected priority if it's no longer available
  if (filters.priority !== "all" && !availablePriorities.includes(filters.priority)) {
    const updatedFilters = { ...filters, priority: "all" as PriorityFilter };
    setFilters(updatedFilters);
    toast.info(`Priority filter "${filters.priority}" was cleared as no matching tasks were found.`);
  }
  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    filteredTodos,
    allTags,
    nonFilteredTags,
    tagFrequency,
    topTags,
    activeTodosCount,
    completedTodosCount,
    showAddForm,
    setShowAddForm,
    availablePriorities,
    filters,
    setFilters,
    priorityCounts
  }
}

export default useTodos;