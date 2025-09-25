import { useRef, useEffect } from 'react';
import type { SelectOptionType } from '../../types/types';
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";

import './select.scss';
import useSelect from './useSelect';
import useSelectKeyboard from '../../hooks/useSelectKeyboard';

type SelectProps = {
  options?: SelectOptionType[],
  onSelect?: (value: SelectOptionType['value']) => void,
  placeholder?: string,
  className?: string,
  selectedOption?: string,
  children?: React.ReactNode,
  customLabel?: React.ReactNode
};

const Select = ({ options, selectedOption, onSelect, placeholder = "Select an option", className, children, customLabel }: SelectProps) => {
  const { isOpen, setIsOpen, handleToggle } = useSelect();
  const { handleMenuKeyDown } = useSelectKeyboard(setIsOpen, isOpen);
 
   const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen])

  const handleOptionClick = (option: string) => {
    handleToggle();

    if (onSelect) onSelect(option);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      handleToggle();
    }
  };

  return (
    <div ref={selectRef} className={`select-container ${className}`}>
 
      <button 
        className="btn select-btn" 
        onClick={(e) => handleToggle(e)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        >
        { customLabel ? customLabel : (selectedOption || placeholder) }
        { isOpen ? <CaretUpIcon /> : <CaretDownIcon /> }
      </button>
        {
          isOpen ? (
            <ul 
              className="select-options" 
              tabIndex={0}
              onKeyDown={(e) => handleMenuKeyDown(e)}
              onClick={(e) => handleToggle(e)}
              role="listbox">
              {
                children
                  ? children
                  :
                  options?.map((option) => {
                  return (
                    <li
                      role="option"
                      key={option.value}
                      className="select-option"
                      onClick={() => handleOptionClick(option.value)}
                    >
                      <button className="select-btn-option option-action">{option.label}</button>
                    </li>
                  );
                })
              }
              </ul> )
          : null
        }
    </div>
  );
};

export default Select;