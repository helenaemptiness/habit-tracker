import React, { useContext, useState } from "react";
import HabitsList from "../HabitsList/HabitsList";
import AddHabitForm from '../AddHabitForm/AddHabitForm';
import ProgressStats from '../ProgressStats/ProgressStats';
import { LanguageContext } from '../../context/LanguageContext';
import styles from './Tracker.module.css'
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

function Tracker() {
    const { translate } = useContext(LanguageContext)
    const [progressData, setProgressData] = useState({
        progress: 0,
        doneToday: 0,
        total: 0
    });
    const updateProgress = (habits) => {
        const habitsDoneToday = habits.filter(habit => habit.completed).length;
        const habitsQuantity = habits.length;
        const newProgress = habitsQuantity > 0 ? habitsDoneToday / habitsQuantity : 0;
        setProgressData({
            progress: newProgress,
            doneToday: habitsDoneToday,
            total: habitsQuantity
        });
        return newProgress;
    };
    return (
        <div className={styles.tracker}>
            <div className={styles.tracker__container}>
                <div className={styles.tracker__card}>
                    <div className={styles.tracker__header}>
                        <h1 className={styles.tracker__title}>{translate('appTitle')}</h1>
                        <LanguageSwitcher/>
                    </div>
                    <div className={styles.tracker__body}>
                        <ProgressStats 
                            progress={progressData.progress} 
                            doneToday={progressData.doneToday}
                            total={progressData.total}
                        />
                        {/* <AddHabitForm /> */}
                        <HabitsList onUpdateProgress={updateProgress} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tracker