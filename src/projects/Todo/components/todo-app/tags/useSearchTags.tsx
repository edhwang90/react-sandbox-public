import { useState, type KeyboardEvent } from 'react';
import type { FiltersType } from '../../../../../types/types';

const useSearchTags = (
  filters: FiltersType,
  onTagSelect: (tags: string[]) => void,
  allTags: string[]
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Add a new tag on "Enter" or ","
    if ((e.key === 'Tab' || e.key === 'Enter') && inputValue.trim().length <= 0) {
      setIsOpen(true)
    }
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        onTagSelect([...tags, newTag]);
        setInputValue('');
        setIsOpen(false);
      }
    }
    // update input
    else {
      setIsOpen(true);
      setInputValue(e.currentTarget.value);
    }
  };

  const updateTag = (tag: string) => {
    if (!filters.tags.includes(tag)) {
      setTags([...tags, tag]);
      onTagSelect([...tags, tag]);
    } else {
      onTagSelect(filters.tags.filter(t => t !== tag));
      setTags(filters.tags.filter(t => t !== tag));
    }
  
    setInputValue('');
    setIsOpen(false);
  }

  const getFilteredTags = () => {
    return allTags.filter(tag => tag.toLowerCase().includes(inputValue.toLowerCase()))
  }

  return {
    isOpen,
    setIsOpen,
    toggleVisibility,
    handleKeyDown,
    inputValue,
    setInputValue,
    updateTag,
    getFilteredTags
  }
}

export default useSearchTags;