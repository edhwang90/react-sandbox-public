import type { FiltersType, FilterType, PriorityFilter } from '../../../../../types/types';

const useFilters = (
  activeTodosCount: number,
  completedTodosCount: number,
  filters: FiltersType,
  onFiltersChange: (filters: FiltersType) => void,
  priorityCounts: Record<string, number>,
) => {
  const statusFilters: { value: FilterType; label: string; count?: number }[] = [
    { value: "all", label: "All", count: activeTodosCount + completedTodosCount },
    { value: "active", label: "Active", count: activeTodosCount },
    { value: "completed", label: "Completed", count: completedTodosCount },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "priority-color-high";
      case "medium": return "priority-color-medium";
      case "low": return "priority-color-low";
      default: return "priority-color-default";
    }
  };

  const handleStatusChange = (status: FilterType) => {
    onFiltersChange({ ...filters, status: status as FilterType });
  };

  const handlePriorityChange = (priority: string) => {
    onFiltersChange({ ...filters, priority: priority as PriorityFilter });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFiltersChange({ ...filters, tags: newTags });
  };

  const clearAllFilters = () => {
    onFiltersChange({ status: "all", priority: "all", tags: [], search: "" });
  };

  const hasActiveFilters = filters.priority !== "all" || filters.tags.length > 0 || (filters.search && filters.search.trim() !== "");

  const clearStatuses = () => {
    onFiltersChange({ ...filters, status: "all", priority: "all" });
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  const getStatusLabel = (status: FilterType) => {
    switch (status) {
      case "all": return "All tasks";
      case "active": return "Active tasks";
      case "completed": return "Completed tasks";
    }
  };

  const getPriorityLabel = (priority: PriorityFilter) => {
    switch (priority) {
      case "all": return "All priorities";    
      case "high": return "High priority";
      case "medium": return "Medium priority";
      case "low": return "Low priority";
    }
  };

  const getPriorityCount = (priority: PriorityFilter) => {
    switch (priority) {
      case "all": return Object.values(priorityCounts).reduce((a, b) => a + b, 0);
      case "high": return priorityCounts.high || 0;
      case "medium": return priorityCounts.medium || 0;
      case "low": return priorityCounts.low || 0;
    }
  };

  const handleTagSelect = (tags: string[]) => {
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      if (filters.tags.includes(tag)) {
        const unsetAddedTags = filters.tags.filter(t => t !== tag);
        onFiltersChange({ ...filters, tags: unsetAddedTags });
      } else {
        onFiltersChange({ ...filters, tags: [...filters.tags, tag] });
      }
    }
  }
  return {
    statusFilters,
    getPriorityColor,
    handleStatusChange,
    handlePriorityChange,
    handleTagToggle,
    clearAllFilters,
    hasActiveFilters,
    clearStatuses,
    handleSearchChange,
    getStatusLabel,
    getPriorityLabel,
    getPriorityCount,
    handleTagSelect
  }
}

export default useFilters;