import { XIcon } from "@phosphor-icons/react";
import type { FiltersType } from "../../../../../types/types";

type TagProps = {
  tag: string,
  count?: number,
  hasNoMatches?: boolean,
  onClick?: (tag: string) => void
  isRemovable?: boolean
  filters?: FiltersType
};

const Tag = ({ tag, count, hasNoMatches, onClick, isRemovable = false, filters }: TagProps) => {

  return (
    <button 
      key={tag} 
      onClick={() => onClick ? onClick(tag) : null}
      className={`btn 
                  ${filters 
                      ?
                        filters.tags.includes(tag)
                        ? "btn-default" 
                        : "btn-tag" : ''
                  } 
                  ${isRemovable 
                    ? "btn-tag" 
                    : hasNoMatches 
                      ? "btn-muted" 
                      : ""}`
                 }
      title={hasNoMatches ? "No matching tasks with current filters" : undefined}
    >
        {tag}
        {
          count !== undefined && count >= 0 
          &&
            <span className={`count-badge ${hasNoMatches ? "text-muted-foreground" : ""}`}>
              {count}
            </span>
        }

      
      { isRemovable &&
        <XIcon className="icon icon-action" />
      }
    </button>
  )
}

export default Tag;