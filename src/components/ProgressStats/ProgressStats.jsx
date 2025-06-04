import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import styles from './ProgressStats.module.css'

function ProgressStats({ progress, doneToday, total }) {
    const { translate } = useContext(LanguageContext)
    const progressPercent = Math.round(progress * 100)
    
    let progressText = ''

    if (progressPercent === 100) {
        progressText = `${translate('progress100')}`
    } else {
        progressText = progressText = `${translate('completed')} ${doneToday} ${translate('of')} ${total} ${translate('habitsToday')}`
    }

    return (
        <div className={styles.progressStats}>
            <div className={styles.progressStats__header}>
                <span className={styles.progressStats__label}>{translate('progress')}</span>
                <strong className={styles.progressStats__percent}>{progressPercent}%</strong>
            </div>
            <div className={styles.progressStats__bar}>
                <div 
                    className={styles.progressStats__fill}
                    style={{ width: `${progressPercent}%` }}
                    role="progressbar"
                    aria-valuenow={progressPercent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>
            <div className={styles.progressStats__text}>
                {progressText}
            </div>
        </div>
    );
}

export default ProgressStats;