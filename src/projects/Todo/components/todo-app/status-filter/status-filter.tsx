import Select from '../../../../../components/select/select';
import { TargetIcon } from '@phosphor-icons/react';
import type { FilterType } from '../../../../../types/types';
import FilterSelectRow from '../todo-filters/filter-select-row';

type StatusFilterSelectProps = {
  filters: {
    status: 'all' | 'active' | 'completed',
  },
  getStatusLabel: (status: 'all' | 'active' | 'completed') => string,
  handleStatusChange: (status: 'all' | 'active' | 'completed') => void,
  activeTodosCount: number,
  completedTodosCount: number,
  statusFilters: { value: FilterType, label: string, count?: number }[]
}

const StatusFilterSelect = ({ filters, getStatusLabel, handleStatusChange, activeTodosCount, completedTodosCount, statusFilters }: StatusFilterSelectProps) => {

  return (
    <div className="status-filters">
      <Select
        className="select priority-select-container"
        selectedOption={getStatusLabel(filters.status)}
        customLabel = {
          <div className="status-label">
            <span>
              <TargetIcon className="select-icon" />
            </span>
            <span className="label">
            {
                filters.status === 'all'
                  ? 'All'  
                  : filters.status === 'active'
                    ? 'Active'
                    : 'Completed'
                }
            </span>
            <span className="count-badge">
              { filters.status === 'all'
                  ? activeTodosCount + completedTodosCount
                  : filters.status === 'active'
                    ? activeTodosCount || 0
                    : completedTodosCount || 0
              }
            </span>
          </div>
        }
      >
    {
      statusFilters.map((status, index) => {
        return (
          <FilterSelectRow 
            key={index}
            option={status}
            count={status.count || 0} 
            onClick={() => handleStatusChange(status.value)} 
          />
        );
      })
      }
      </Select>
    </div>
  )
}

export default StatusFilterSelect;