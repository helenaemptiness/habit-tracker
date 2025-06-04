import React, { createContext, useContext, useReducer } from "react";

const translations = {
    en: {
        language: 'en',
        appTitle: 'Habit Tracker',
        myHabits: 'My Habits',
        newHabitPlaceholder: 'New habit...',
        addHabitButton: 'Add',
        progress: 'Overall progress',
        completed: 'Completed:',
        streak: 'Streak:',
        of: 'of',
        habitsToday: 'habits today',
        progress100: 'Everything is done. Rest with a clear conscience!',
        delete: "Delete",
        confirmDelete: 'Are you sure you want to delete the habit'
    },
    
    ru: {
        language: 'ru',
        appTitle: 'Трекер привычек',
        myHabits: 'Мои привычки',
        newHabitPlaceholder: 'Новая привычка...',
        addHabitButton: 'Добавить',
        progress: 'Общий прогресс',
        completed: 'Выполнено:',
        streak: 'Серия:',
        of: 'из',
        habitsToday: 'привычек сегодня',
        progress100: 'Все сделано. Отдыхай с чистой совестью!',
        delete: "Удалить",
        confirmDelete: 'Вы уверены, что хотите удалить привычку'
    }
}

const ACTION_TYPES = {
    TOGGLE_LANGUAGE: 'TOGGLE_LANGUAGE'
}

const languageReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.TOGGLE_LANGUAGE:
            return {
            ...state, 
            language: state.language === 'ru' ? 'en' : 'ru'
        };
        default: 
            return state;
    }
}


export const LanguageContext = createContext();

export function useLanguage() {
    const context = useContext(LanguageContext);
    
    return context;
}

export const LanguageProvider = ({ children }) => {
    const [state, dispatch] = useReducer(languageReducer, {
        language: localStorage.getItem('lang') || 'ru'
    })
    
    const translate = (key) => translations[state.language][key] || key;

    const toggleLanguage = () => {
        dispatch({ type: ACTION_TYPES.TOGGLE_LANGUAGE });
    };

    return (
        <LanguageContext.Provider value={{
            language: state.language,
            translate,
            toggleLanguage
        }}>
            {children}
        </LanguageContext.Provider>
    )
}