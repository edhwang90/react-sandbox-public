import { CheckFatIcon } from '@phosphor-icons/react';

import './checkbox.scss';
import { useState } from 'react';

const Checkbox = ({isChecked = false, onChange}: {isChecked?: boolean, onChange?: () => void}) => {
  const [checked, setChecked] = useState(isChecked);
  const [checkboxClass, setCheckboxClass] = useState('standard')

  const handleToggle = () => {
    setChecked(!checked);

    if (onChange) onChange();
  };

  return (
    <button
      className={`checkbox-container ${checkboxClass}`}
      aria-checked={checked}
      role="checkbox"
      onMouseEnter={() => setCheckboxClass('hover')}
      onMouseLeave={() => setCheckboxClass('standard')}
      onClick={handleToggle}>
      {
        (checked || checkboxClass === 'hover') && <CheckFatIcon />
      }
    </button>
  )
}

export default Checkbox;