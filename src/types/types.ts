export interface Project {
  title: string,
  tags: string[],
  route: string,
  color: string
}

export interface TodoType {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date,
  completedAt?: Date,
  priority: string,
  tags?: string[],
}

export type FilterType = "all" | "active" | "completed";

export type PriorityFilter = "all" | "low" | "medium" | "high";

export interface FiltersType {
  status: FilterType,
  priority: PriorityFilter,
  tags: string[],
  search: string
}

export interface SelectOptionType {
  value: string,
  label: string,
}

export interface TodoListProps {
  todos: TodoType[],
  onToggle: (id: string) => void,
  onDelete: (id: string) => void,
  filters: FiltersType,
}

export interface TodoItemProps {
  todo: TodoType,
  onToggle: (id: string) => void,
  onDelete: (id: string) => void,
}

export interface TodoFiltersProps {
  filters: FiltersType,
  onFiltersChange: (filters: FiltersType) => void,
  activeTodosCount: number,
  completedTodosCount: number,
  allTags: string[],
  tagFrequency: Record<string, number>,
  availablePriorities: Array<"low" | "medium" | "high">,
  priorityCounts: Record<string, number>,
}