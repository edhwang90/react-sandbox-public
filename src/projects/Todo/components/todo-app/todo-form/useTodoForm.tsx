import { useState } from 'react';
import type { PriorityFilter } from '../../../../../types/types';

import { toast } from 'sonner';
interface TodoFormProps {
  onSubmit: (title: string, description: string, priority: string, tags?: string[]) => void;
  onCancel: () => void;
  existingTags: string[];
  tagFrequency: Record<string, number>;
}

const useTodoForm = ({ existingTags, tagFrequency, onSubmit, onCancel }: TodoFormProps) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"" | "low" | "medium" | "high">("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Filter existing tags based on current input and exclude already selected tags
  const suggestedTags = existingTags
    .filter(tag => 
      tag.toLowerCase().includes(tagInput.toLowerCase()) &&
      !tags.includes(tag.toLowerCase()) &&
      tagInput.trim() !== ""
    )
    .sort((a, b) => (tagFrequency[b] || 0) - (tagFrequency[a] || 0))
    .slice(0, 5); // Show max 5 suggestions

  const handleSubmit = (title: string, description: string, priority: string, tags?: string[]) => {
    if (title.trim() && description.trim() && priority) {
      onSubmit(title, description, priority, tags);
      setTitle("");
      setDescription("");
      setPriority("");
      setTags([]);
      setTagInput("");
    } else {
      toast.error("Error: Please refer to form instructions.");

      setShowErrors(true);
    }
  };

  const handleCancel = () => {
      setTitle("");
      setDescription("");
      setPriority("");
      setTags([]);
      setTagInput("");
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };
  
  const addTag = (tagText: string) => {
    const newTag = tagText.toLowerCase();
    if (!tags.includes(newTag) && newTag.trim()) {
      setTags([...tags, newTag]);
      setTagInput("");
      setShowSuggestions(false);
    }
  };

  const getAvailableTags = (currentTags: string[]) => {
    const tags: string[] = [];
    for (const tag of existingTags) {
      if (!currentTags.includes(tag.toLowerCase())) {
        tags.push(tag.toLowerCase());
      }
    }
    return tags;
  }
  
  const isExistingTag = (tag: string) => {
    return existingTags.some(existingTag => existingTag.toLowerCase() === tag.toLowerCase());
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const getAvailablePriorities = () => {
    return [
      { value: 'high', label: 'High priority'},
      { value: 'medium', label: 'Medium priority'},
      { value: 'low', label: 'Low priority'}
    ]
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "priority-color-high";
      case "medium": return "priority-color-medium";
      case "low": return "priority-color-low";
      default: return "priority-color-default";
    }
  };

  const getPriorityLabel = (priority: PriorityFilter) => {
    switch (priority) {
      case "all": return "All priorities";    
      case "high": return "High priority";
      case "medium": return "Medium priority";
      case "low": return "Low priority";
      default: return "";
    }
  };
  return {
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    getAvailablePriorities,
    getPriorityLabel,
    getPriorityColor,
    tags,
    setTags,
    getAvailableTags,
    tagInput,
    setTagInput,
    addTag,
    removeTag,
    isExistingTag,
    showSuggestions,
    setShowSuggestions,
    suggestedTags,
    handleSubmit,
    handleCancel,
    handleKeyDown,
    showErrors
  }
}

export default useTodoForm;