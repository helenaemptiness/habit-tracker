import React, { useContext } from 'react';
import styles from './HabitItem.module.css'
import { LanguageContext } from '../../context/LanguageContext';

function HabitItem({ habit, onToggle, onDelete }) {
    const { translate } = useContext(LanguageContext)
    return (
        <li className={styles.habitItem}>
            <div className={styles.habitItem__checkboxWrapper}>
                <input 
                    type="checkbox" 
                    className={styles.habitItem__checkbox} 
                    id={`habit-${habit.id}`}
                    checked={habit.completed || false}
                    onChange={onToggle}
                />
                <label 
                    className={`${styles.habitItem__label} ${habit.completed ? styles.habitItem__label_completed : ''}`} 
                    htmlFor={`habit-${habit.id}`}
                >
                    {habit.name}
                </label>
            </div>
            <div className={styles.habitItem__rightWrapper}>
                <span className={`${styles.habitItem__streak} ${habit.streak > 0 ? styles.habitItem__streak_active : ''}`}>
                    {translate('streak')} {habit.streak}
                </span>
                <button 
                    className={styles.habitItem__deleteButton}
                    onClick={() => onDelete(habit.id)}
                    title={translate('delete')}
                >
                    ×
                </button>
            </div>
        </li>
    );
}

export default HabitItem;