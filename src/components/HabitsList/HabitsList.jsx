import React, { useContext, useEffect, useState } from 'react';
import HabitItem from '../HabitItem/HabitItem';
import { LanguageContext } from '../../context/LanguageContext';
import Habit from '../scripts/Habit';
import AddHabitForm from '../AddHabitForm/AddHabitForm';
import styles from './HabitsList.module.css'

function HabitsList({ onUpdateProgress }) {
    const { translate } = useContext(LanguageContext)
    const [habits, setHabits] = useState([]);
    const checkAndResetHabits = (currentHabits) => {
        const today = new Date().toDateString();
        const lastResetDate = localStorage.getItem('lastResetDate');

        if (lastResetDate !== today) {
            const updatedHabits = currentHabits.map(habit => {
                const newStreak = habit.completed ? habit.streak : 0;
                
                return {
                    ...habit,
                    completed: false,
                    streak: newStreak
                };
            });
            
            localStorage.setItem('lastResetDate', today);
            localStorage.setItem('habits', JSON.stringify(updatedHabits)); // Сохраняем сразу
            console.log('Resetting habits for new day. Previous date:', lastResetDate, 'Current date:', today);
            return updatedHabits;
        }
        
        return currentHabits;
    };
    useEffect(() => {
        const savedHabits = localStorage.getItem('habits');
        if (savedHabits) {
            try {
                const parsedHabits = JSON.parse(savedHabits);
                let habitsInstances = parsedHabits.map(habit => ({
                    id: habit.id,
                    name: habit.name,
                    completed: habit.completed,
                    streak: habit.streak
                }));
                
                habitsInstances = checkAndResetHabits(habitsInstances);
                setHabits(habitsInstances);
            } catch (e) {
                console.error('Failed to parse habits', e);
                setHabits([]);
            }
        } else {
            localStorage.setItem('lastResetDate', new Date().toDateString());
        }
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            const today = new Date().toDateString();
            const lastResetDate = localStorage.getItem('lastResetDate');
            
            if (lastResetDate !== today) {
                setHabits(prevHabits => {
                    const updatedHabits = checkAndResetHabits(prevHabits);
                    return updatedHabits;
                });
            }
        }, 60000); 

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        onUpdateProgress(habits);
        setTimeout(() => {
                localStorage.setItem('habits', JSON.stringify(habits));
            }, 0); 
    }, [habits]);

    const handleHabitToggle = (id) => {
        setHabits(prevHabits => 
            prevHabits.map(habit => {
                if (habit.id === id) {
                    const newCompletedState = !habit.completed;
                    return {
                        ...habit,
                        completed: newCompletedState,
                        streak: newCompletedState 
                            ? habit.streak + 1
                            : Math.max(0, habit.streak - 1) // Исправлено strak → streak
                    };
                }
                return habit;
            })
        );
    };

    const handleAddHabit = (habitName) => {
        const newId = habits.length > 0 
            ? Math.max(...habits.map(h => h.id)) + 1 
            : 1;
        
        const newHabit = new Habit(newId, habitName, false, 0);
        
        setHabits(prevHabits => [...prevHabits, newHabit]);
    };

    const handleDeleteHabit = (id) => {
        const habitToDelete = habits.find(habit => habit.id === id);
        const confirmDelete = window.confirm(
            `${translate('confirmDelete')} "${habitToDelete.name}"?`
        );
        
        if (confirmDelete) {
            setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
        }
    };

    return (
        <div className={styles.habitsList}>
            <AddHabitForm onAddHabit={handleAddHabit}/>
            <h2 className={styles.habitsList__title}>{translate('myHabits')}</h2>
            <ul className={styles.habitsList__list}>
                {habits.map(habit => (
                    <HabitItem 
                        key={habit.id} 
                        habit={habit} 
                        onToggle={() => handleHabitToggle(habit.id)}
                        onDelete={handleDeleteHabit}
                    />
                ))}
            </ul>
        </div>
    );
}

export default HabitsList;
