import type { SelectOptionType } from '../../../../../types/types';

type FilterSelectRow = {
  option: SelectOptionType,
  onClick: (value: SelectOptionType['value']) => void,
  currentSelection?: string,
  count?: number | null
}

const FilterSelectRow = ({ option, onClick, count }: FilterSelectRow ) => {

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "priority-color-high";
      case "medium": return "priority-color-medium";
      case "low": return "priority-color-low";
      default: return "";
    }
  }

  return (
    <li 
      role="option"
      className="filter-select-row"
      onClick={() => onClick(option.value)} 
      >
        <button className={`select-option-btn option-action ${getPriorityColor(option.value)}`}>
          { option.label }
          {
            count !== null ?
              <span className="count-badge">
                { count }
              </span>
            : 
              null
          }
        </button>
    </li>
  )
}

export default FilterSelectRow;