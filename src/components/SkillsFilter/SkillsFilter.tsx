import { useState } from 'react';
import classes from './SkillsFilter.module.css';

interface SkillsFilterProps {
  skills: string[];
  city: string;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
  onCityChange: (city: string) => void;
}

const CITIES = ['Все города', 'Москва', 'Санкт-Петербург'];

export const SkillsFilter = ({
  skills,
  city,
  onAddSkill,
  onRemoveSkill,
  onCityChange,
}: SkillsFilterProps) => {
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
    <div className={classes.filterBlock}>
      <div className={classes.filterTitle}>Ключевые навыки</div>

      <div className={classes.inputRow}>
        <input
          type="text"
          className={classes.skillInput}
          placeholder=""
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={classes.addButton} onClick={handleAdd}>
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
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <select
        className={classes.citySelect}
        value={city}
        onChange={(e) => onCityChange(e.currentTarget.value)}
      >
        {CITIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};