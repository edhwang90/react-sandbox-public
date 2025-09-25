import { useState, useEffect, useCallback } from 'react';

const useTabHandler = () => {
  const [isOpen, setIsOpen] = useState(false);

  // cleans up tab experience
  const disableFocus = useCallback((querySelector: string) => {
    document.querySelectorAll(querySelector).forEach((action: Element) => {
      action.setAttribute('inert', '');
    });
  }, [])

  const enableFocus = useCallback((querySelector: string) => {
    document.querySelectorAll(querySelector).forEach((action: Element) => {
      action.removeAttribute('inert');
    });
  }, [])

  const hideHiddenFocus = (visibility: boolean = false) => {
    setIsOpen(visibility)
  }

  useEffect(() => {
    if (isOpen) {
      disableFocus('.nav-bar');
      disableFocus('.projects-wrapper');
    }
    else {
      enableFocus('.nav-bar');
      enableFocus('.projects-wrapper');
    }

  }, [isOpen])

  return {
    isOpen,
    hideHiddenFocus,
    enableFocus,
    disableFocus
  }
}

export default useTabHandler;