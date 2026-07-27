import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import { SkillsFilter } from './SkillsFilter';

const defaultProps = {
  skills: ['JavaScript', 'React'],
  city: 'Все города',
  onAddSkill: vi.fn(),
  onRemoveSkill: vi.fn(),
  onCityChange: vi.fn(),
};

describe('SkillsFilter', () => {
  it('отображает переданные навыки', () => {
    renderWithProviders(<SkillsFilter {...defaultProps} />);
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('отображает кнопки удаления для каждого навыка', () => {
    renderWithProviders(<SkillsFilter {...defaultProps} />);
    
    const removeButtons = screen.getAllByRole('button', { name: /удалить/i });
    expect(removeButtons).toHaveLength(2);
  });

  it('вызывает onRemoveSkill при клике на крестик', () => {
    renderWithProviders(<SkillsFilter {...defaultProps} />);
    
    const removeButtons = screen.getAllByRole('button', { name: /удалить/i });
    fireEvent.click(removeButtons[0]);
    
    expect(defaultProps.onRemoveSkill).toHaveBeenCalledWith('JavaScript');
  });

  it('отображает select с городами', () => {
    renderWithProviders(<SkillsFilter {...defaultProps} />);
    
    expect(screen.getByText('Все города')).toBeInTheDocument();
    expect(screen.getByText('Москва')).toBeInTheDocument();
    expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument();
  });

  it('вызывает onCityChange при изменении города', () => {
    renderWithProviders(<SkillsFilter {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Москва' } });
    
    expect(defaultProps.onCityChange).toHaveBeenCalledWith('Москва');
  });

  it('добавляет навык по клику на кнопку +', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SkillsFilter {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('');
    await user.type(input, 'TypeScript');
    
    const addButton = screen.getByRole('button', { name: '+' });
    await user.click(addButton);
    
    expect(defaultProps.onAddSkill).toHaveBeenCalledWith('TypeScript');
  });

  it('добавляет навык по нажатию Enter', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SkillsFilter {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('');
    await user.type(input, 'TypeScript{enter}');
    
    expect(defaultProps.onAddSkill).toHaveBeenCalledWith('TypeScript');
  });

  it('очищает инпут после добавления навыка', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SkillsFilter {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('') as HTMLInputElement;
    await user.type(input, 'TypeScript');
    
    const addButton = screen.getByRole('button', { name: '+' });
    await user.click(addButton);
    
    expect(input.value).toBe('');
  });
});