import { useCallback } from 'react';
import useTabHandler from './tabHandler';

const useMenuHandler = () => {
  const { hideHiddenFocus } = useTabHandler();
  
  // cleans up tab experience
  const disableFocus = useCallback((querySelector: string) => {
    document.querySelectorAll(querySelector).forEach((action: Element) => {
      action.setAttribute('tabindex', '-1');
    });
  }, [])

  // cleans up tab experience
  const enableFocus = (querySelector: string) => {
    document.querySelectorAll(querySelector).forEach((action: Element, index: number) => {
      action.setAttribute('tabindex', '1');
      
      if (index === 0) (action as HTMLElement).focus();
    });
  }

  const showSideMenu = (visible: boolean = false) => {

    let body = document.body;
    body.classList.toggle('menu-active');

    // cleans up tab experience
    if (!visible) {
      disableFocus('.side-menu-action');
      enableFocus('.menu-button');
      hideHiddenFocus(false);
    } else {
      enableFocus('.side-menu-action');
      hideHiddenFocus(true);
    }
  }

  return {
    disableFocus,
    enableFocus,
    showSideMenu
  }
}

export default useMenuHandler;