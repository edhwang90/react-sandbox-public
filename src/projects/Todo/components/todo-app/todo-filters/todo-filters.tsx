import React from 'react';
import type { TodoFiltersProps } from '../../../../../types/types';
import { TagIcon, XIcon } from "@phosphor-icons/react";
import { FiltersPriorities } from '../../../todos-json';
import Tag from '../tags/tag';
import SearchTags from '../tags/search-tags';
import useFilters from './useFilters';

import './todo-filters.scss';
import PriorityFilterSelect from '../priority-filter/priority-filter';
import StatusFilterSelect from '../status-filter/status-filter';

const TodoFilters = ({ 
  filters, 
  onFiltersChange, 
  activeTodosCount, 
  completedTodosCount,
  allTags,
  tagFrequency,
  availablePriorities,
  priorityCounts
}: TodoFiltersProps) => {
  const { 
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
    handleTagSelect } = useFilters(
      activeTodosCount,
      completedTodosCount,
      filters,
      onFiltersChange,
      priorityCounts
  );

  return (
    <React.Fragment>
      <div className="todo-top">
        <div className="search-container">
          <input 
            type="text"
            name="search"
            className="input input-search"
            placeholder="Search tasks and tags..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          {
            filters.search.length > 0 &&
            <button onClick={() => handleSearchChange('')} className="btn-input">
              <XIcon />
            </button>
          }

        </div>
        <div className="status-priority-filters">
          <div className="top-filters">
            <div className="row">
              <div className="col-4">
                {/* Status Filter */}
                <StatusFilterSelect
                  filters={filters}
                  getStatusLabel={getStatusLabel}
                  handleStatusChange={handleStatusChange}
                  activeTodosCount={activeTodosCount}
                  completedTodosCount={completedTodosCount}
                  statusFilters={statusFilters}
                />
              </div>
              <div className="col-4">
                {/* Priority Filter */}
                <PriorityFilterSelect
                  filters={filters}
                  availablePriorities={availablePriorities}
                  getPriorityLabel={getPriorityLabel}
                  getPriorityColor={getPriorityColor}
                  getPriorityCount={getPriorityCount}
                  handlePriorityChange={handlePriorityChange}
                  filtersPriorities={FiltersPriorities}
                />
              </div>
              <div className="col-4">
                <div className={`reset-filters ${ filters.status === 'all' && filters.priority === 'all' ? 'visibility-hidden': ''}`}>
                  <button onClick={clearStatuses} className="btn btn-link">clear status filters</button>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>

      {/* Tag Filters */}
      <div className="advanced-filters">
        <div className="tags-filter">
          <div className="row">
            <div className="col-4">
              <SearchTags
                allTags={allTags}
                tagCounts={tagFrequency}
                filters={filters}
                onTagSelect={handleTagSelect}
                placeholder="Search tags"
                className="tag-combo-box"
              />
            </div>
            <div className="col-8"></div>
          </div>
        </div>

        {/* Active Filters Display */}
        {filters.tags.length > 0 && (
          <div className="tags-filter">
            <div className="label">
              <TagIcon className="icon" />
              <span>
                Filtered by tags
              </span>
            </div>
            <div className="tags-container">
              {filters.tags.map((tag) => {
                const count = tagFrequency[tag] || 0;
                const hasNoMatches = count === 0;
                
                return (
                  <Tag
                    key={tag}
                    tag={tag}
                    count={count}
                    hasNoMatches={hasNoMatches}
                    onClick={handleTagToggle}
                    isRemovable={true}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      { hasActiveFilters && (filters.tags.length > 0 && (filters.status !== 'all' || filters.priority !== 'all' || filters.search.trim().length > 0)) &&
        <div className="reset-filters reset-all">
          <button onClick={clearAllFilters} className="btn btn-link">clear all filters</button>
        </div>
       }
    </React.Fragment>
  )
}

export default TodoFilters;