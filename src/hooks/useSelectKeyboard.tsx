import React, { useEffect, useState } from 'react';

const useSelectKeyboard = (
  visibilityToggle?: (visible: boolean) => void,
  isOpen?: boolean
) => {
  const [optionIndex, setOptionIndex] = useState(0);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setOptionIndex(0);
      setIsInitial(true);
    }
  }, [isOpen])

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const options = e.currentTarget.querySelectorAll('.option-action') as NodeListOf<HTMLElement>;

    if (e.key === 'Escape' || e.key === 'Tab' || e.key === 'Enter' || e.key === 'Space') {
      e.preventDefault();

      if (visibilityToggle) visibilityToggle(false);
   
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();

      if (isInitial) {
        setIsInitial(false);
        (options[0] as HTMLElement).focus();
        return;
      }

      if (options.length === 0) return;

      if (e.key === 'ArrowDown') {
        
        if (optionIndex >= (options.length - 1)) {
          setOptionIndex(0);
          (options[0] as HTMLElement).focus();
          return;
        }

        (options[optionIndex + 1] as HTMLElement).focus();
        setOptionIndex(optionIndex + 1);
      } else if (e.key === 'ArrowUp') {

        if ((optionIndex) === 0) {
          setOptionIndex(options.length - 1);
          (options[options.length - 1] as HTMLElement).focus();
          return;
        }

        (options[optionIndex -1] as HTMLElement).focus();
        setOptionIndex(optionIndex - 1);
      }
    }
  };

  return {
    handleMenuKeyDown,
    setIsInitial,
    setOptionIndex
  }
}

export default useSelectKeyboard;