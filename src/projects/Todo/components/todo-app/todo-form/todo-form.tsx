import { useRef, useEffect } from "react";
import PriorityFilterSelect from "../priority-filter/priority-filter";
import useTodoForm from "./useTodoForm";
import type { FiltersType } from '../../../../../types/types';

import './todo-form.scss';
import SearchTags from "../tags/search-tags";
import { TagIcon } from "@phosphor-icons/react";
import Tag from "../tags/tag";

interface TodoFormProps {
  onSubmit: (title: string, description: string, priority: string, tags?: string[]) => void;
  onCancel: () => void;
  existingTags: string[];
  tagFrequency: Record<string, number>;
  availablePriorities: Array<"low" | "medium" | "high">;
  filters: FiltersType;
}

const TodoForm = ({ onSubmit, onCancel, existingTags, tagFrequency, availablePriorities }: TodoFormProps) => {
  const { title, setTitle, description, setDescription, priority, setPriority, getAvailablePriorities, getPriorityLabel, getPriorityColor, tags, setTags, getAvailableTags, handleSubmit, handleKeyDown, showErrors } = useTodoForm({ existingTags, tagFrequency, onSubmit, onCancel });
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="todo-form-container">
      <div className="todo-form" role="form" aria-labelledby="Create new task">
        <div className="form-group">
          <label htmlFor="title">Title</label>

          <input
            ref={inputRef}
            type="text"
            id="title"
            placeholder="What needs to be done?"
            value={title}
            maxLength={50}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input"
          />
          {
            showErrors &&
            <p className="form-error">{!title ? "Title is required." : ""}</p>
          }

          {
            title.trim().length >= 50 &&
            <p className="form-error">Title cannot exceed 50 characters.</p>
          }
          
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Additional details..."
            value={description}
            maxLength={175}
            rows={3}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            className="input"
          />

          {
            showErrors &&
            <p className="form-error">{!description ? "Description is required." : ""}</p>
          }

          {
            description.trim().length >= 175 &&
            <p className="form-error">Description cannot exceed 175 characters.</p>
          }
        </div>

        <div className="form-group">
          <label>Priority</label>

          <PriorityFilterSelect
            selectedOption={priority}
            availablePriorities={availablePriorities}
            getPriorityLabel={getPriorityLabel}
            getPriorityColor={getPriorityColor}
            handlePriorityChange={(value: string) => setPriority(value as "low" | "medium" | "high")}
            filtersPriorities={getAvailablePriorities()}
          />

          {
            showErrors &&
            <p className="form-error">{!priority ? "Priority is required." : ""}</p>
          }
        </div>

        <div className="form-group">
          <div className="form-label">
            <label>Tags</label>
            <span>(optional)</span>
          </div>

          <p className="form-info">
            Add tags to categorize your task. You can select from existing tags or create new ones by typing and pressing "Enter".
          </p>

          {
            tags.length === 7 &&
            <p className="form-warning">Only 7 or less tags are allowed.</p>
          }

          <SearchTags
            allTags={getAvailableTags(tags)}
            onTagSelect={(tag) => {
              if (tags.length < 7) {
                for (const t of tag) {
                  if (!tags.includes(t)) {
                    setTags([...tags, t]);
                  }
                }
              }
            }}
            placeholder="Search tags"
            className="tag-combo-box reverse"
          />

        {tags.length > 0 && (
          <div className="tags-filter">
            <div className="label">
              <TagIcon className="icon" />
              <span>
                Current tags
              </span>
            </div>
            <div className="tags-container">
              {tags.map((tag) => {

                return (
                  <Tag
                    key={tag}
                    tag={tag}
                    onClick={() => setTags(tags.filter(t => t !== tag))}
                    isRemovable={true}
                  />
                );
              })}
            </div>
          </div>
        )}
        </div>

        
        <div className="flex gap-3">
          {/* <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Flag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Priority</span>
            </div>
            <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <span className={getPriorityColor("low")}>Low</span>
                </SelectItem>
                <SelectItem value="medium">
                  <span className={getPriorityColor("medium")}>Medium</span>
                </SelectItem>
                <SelectItem value="high">
                  <span className={getPriorityColor("high")}>High</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          
          <div className="flex-1 relative">
            {/* <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Tags</span>
            </div>
            <Input
              placeholder="Add tag..."
              value={tagInput}
              onChange={(e) => handleTagInputChange(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onFocus={() => setShowSuggestions(tagInput.trim() !== "" && suggestedTags.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} // Delay to allow clicking suggestions
              className="h-8"
            /> */}
            
            {/* Tag suggestions dropdown */}
            {/* {showSuggestions && suggestedTags.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-popover border rounded-md shadow-md max-h-32 overflow-y-auto">
                {suggestedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="w-full px-3 py-2 text-left hover:bg-accent text-sm flex items-center justify-between"
                  >
                    <span>{tag}</span>
                    <span className="text-xs text-muted-foreground">({tagFrequency[tag] || 0})</span>
                  </button>
                ))}
              </div>
            )} */}
          </div>
        </div>
        
        {/* {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant={isExistingTag(tag) ? "secondary" : "outline"} 
                className="gap-1 group pr-1"
              >
                {!isExistingTag(tag) && <Plus className="w-3 h-3 text-muted-foreground" />}
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 p-0.5 rounded-sm hover:bg-destructive/10 transition-colors"
                  aria-label={`Remove ${tag} tag`}
                >
                  <X className="w-3 h-3 text-muted-foreground hover:text-destructive transition-colors" />
                </button>
              </Badge>
            ))}
          </div>
        )} */}
        
        {/* Popular tags section */}
        {/* {existingTags.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground">Popular tags:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {existingTags
                .filter(tag => !tags.includes(tag.toLowerCase()))
                .sort((a, b) => (tagFrequency[b] || 0) - (tagFrequency[a] || 0))
                .slice(0, 6)
                .map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-accent transition-colors"
                  >
                    {tag} ({tagFrequency[tag] || 0})
                  </button>
                ))}
            </div>
          </div>
        )} */}
        
        {/* <div className="flex gap-2">
          <Button
            type="submit"
            size="sm"
            disabled={!text.trim()}
            className="gap-2 flex-1"
          >
            <Check className="w-4 h-4" />
            Add Task
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        </div> */}
        <div className="modal-actions">
          <button onClick={() => handleSubmit(title, description, priority, tags)} className="btn btn-default">Create new task</button>
          <button onClick={onCancel} className="btn btn-link">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default TodoForm