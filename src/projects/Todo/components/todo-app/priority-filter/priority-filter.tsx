import Select from '../../../../../components/select/select';
import { FlagIcon } from '@phosphor-icons/react';
import FilterSelectRow from '../todo-filters/filter-select-row';
import type { PriorityFilter, SelectOptionType } from '../../../../../types/types';

type PriorityFilterSelectProps = {
  filters?: {
    status: 'all' | 'active' | 'completed',
    priority: 'all' | 'low' | 'medium' | 'high',
  },
  availablePriorities: Array<'all' | 'low' | 'medium' | 'high'>,
  getPriorityLabel: (priority: 'all' | 'low' | 'medium' | 'high') => string,
  getPriorityColor: (priority: 'all' | 'low' | 'medium' | 'high') => string,
  getPriorityCount?: (priority: 'all' | 'low' | 'medium' | 'high') => number,
  handlePriorityChange: (priority: string) => void,
  filtersPriorities: SelectOptionType[],
  selectedOption?: string
};

const PriorityFilterSelect = ({ filters, availablePriorities, getPriorityLabel, getPriorityColor, getPriorityCount, handlePriorityChange, filtersPriorities, selectedOption }: PriorityFilterSelectProps) => {

  return (
    <div className="priority-filter">
      <Select 
        className="select priority-select-container"
        selectedOption={ filters ? getPriorityLabel(filters.priority) : selectedOption}
        customLabel={
          filters ?
          <div className="priority-label">
            <div className={`label ${getPriorityColor(filters.priority)}`}>
              <span>
                <FlagIcon className="select-icon" />
              </span>
              
                {getPriorityLabel(filters.priority)}
              
            </div>
            {
              getPriorityCount &&
              <span className="count-badge">
                {getPriorityCount(filters.priority)}
              </span>
            }

          </div>
          : 
          <div className="priority-label">
            <div className={`label ${getPriorityColor((selectedOption || 'all') as 'all' | 'low' | 'medium' | 'high')}`}>
              <span>
                <FlagIcon className="select-icon" />
              </span>
              {selectedOption ? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1) : 'Select priority'}
            </div>
          </div>
        }>
          {
            filtersPriorities.map((priority, index) => {
              if (
                priority.value !== 'all' &&
                !availablePriorities.includes(priority.value as 'low' | 'medium' | 'high')
              ) {
                return null;
              }
              else { 
                return (
                  <FilterSelectRow 
                    key={index}
                    option={priority}
                    count={getPriorityCount ? getPriorityCount(priority.value as PriorityFilter) : null} 
                    onClick={handlePriorityChange} 
                  />
                ) 
              }
            })
          }
      </Select>
    </div>
  )
}

export default PriorityFilterSelect;