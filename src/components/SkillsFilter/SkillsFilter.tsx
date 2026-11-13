import { useState } from 'react';
import classes from './SkillsFilter.module.css';

interface SkillsFilterProps {
  skills: string[];
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
}

export const SkillsFilter = ({ skills, onAddSkill, onRemoveSkill }: SkillsFilterProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onAddSkill(trimmed);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className={classes.filterCard}>
      <div className={classes.filterTitle}>Ключевые навыки</div>

      <div className={classes.inputRow}>
        <input
          type="text"
          className={classes.skillInput}
          placeholder="Навык"
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={classes.addButton} onClick={handleAdd} type="button">
          +
        </button>
      </div>

      <div className={classes.tagsContainer}>
        {skills.map((skill) => (
          <span key={skill} className={classes.tag}>
            {skill}
            <button
              className={classes.tagRemove}
              onClick={() => onRemoveSkill(skill)}
              aria-label={`Удалить ${skill}`}
              type="button"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};