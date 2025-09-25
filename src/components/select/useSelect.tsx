import { useState } from 'react';

const useSelect = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e?:React.MouseEvent) => {
    if (!e) {
      setIsOpen(!isOpen);
    }
    else {
      // for when select needs to auto close
      // from custom row click
      const target = e.target as HTMLElement;

      if (target.tagName === "LI" || target.tagName === 'BUTTON') {
        setIsOpen(!isOpen);
      }
    }
  };
  

  return {
    isOpen,
    setIsOpen,
    handleToggle
  }
}

export default useSelect;