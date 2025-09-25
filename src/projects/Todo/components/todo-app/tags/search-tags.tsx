import React, { useRef, useEffect } from 'react';
import type { FiltersType } from '../../../../../types/types';

import './search-tags.scss';
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import useSearchTags from './useSearchTags';
import useSelectKeyboard from '../../../../../hooks/useSelectKeyboard';

// Props for the custom component
interface TagInputProps {
  allTags: string[],
  onTagSelect: (tags: string[]) => void,
  tagCounts?: { [key: string]: number },
  filters?: FiltersType,
  placeholder?: string,
  className?: string,
}

const SearchTags: React.FC<TagInputProps> = ({ allTags, onTagSelect, tagCounts, filters, placeholder = 'Add tags...', className }) => {
  const { 
    isOpen, 
    setIsOpen, 
    toggleVisibility,
    handleKeyDown,
    inputValue,
    setInputValue,
    updateTag,
    getFilteredTags
  } = useSearchTags(filters || {status: "all", priority: "all", tags: [], search: ""}, onTagSelect, allTags);

  const { handleMenuKeyDown } = useSelectKeyboard(setIsOpen, isOpen);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen])

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={inputRef} className={`tags-input-container ${className}`}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        name="Search tags"
        className="input input-search"
      />

      <button onClick={toggleVisibility} className="combo-box-action">
        { !isOpen 
            ? <CaretDownIcon></CaretDownIcon>
            : <CaretUpIcon></CaretUpIcon>
        }
      </button>
      { isOpen ?
        <div className="combo-box-container">
          <ul 
            tabIndex={0}
            onKeyDown={(e) => handleMenuKeyDown(e)}
            className="combo-box-options"
            role="combobox"
            >
            {
              getFilteredTags().length === 0 ?
                (
                  <li className="no-options" role="option">
                    No tags found
                  </li>
                )
              :
                getFilteredTags()
                .sort((a, b) => {
                  const countA = tagCounts?.[a] || 0;
                  const countB = tagCounts?.[b] || 0;
                  return countB - countA; // Sort descending by frequency
                })
                .map((tag) => {
                  const isSelected = filters ? filters.tags.includes(tag) : false;
                  const count = tagCounts?.[tag] || 0;

                  if (!isSelected) {
                    return (
                      <li 
                        key={tag} 
                        className={`combo-box-option`} 
                        role="option" 
                        onClick={() => updateTag(tag)}>
                        <button className="option-action">
                          {tag}

                          {
                           tagCounts &&
                            <span className="count-badge">
                              {count}
                            </span>
                          }
                        </button>
                      </li>
                    )
                  } else return null;

                })
            }
          </ul>
        </div>
        : null
      }
    </div>
  );
};

export default SearchTags;