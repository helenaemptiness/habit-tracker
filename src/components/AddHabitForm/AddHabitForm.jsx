import React, { useContext, useEffect, useRef, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import styles from './AddHabitForm.module.css'

function AddHabitForm({onAddHabit}) {
    const { translate } = useContext(LanguageContext)
    const inputRef = useRef(null)
    const [error, setError] = useState(false)
    const [empty, setEmpty] = useState(false)

    const focus = () => inputRef.current.focus()

    const handleAddHabit = (event) => {
        event.preventDefault()
        const habitName = inputRef.current.value.trim()
        if (habitName === '') {
            focus()
            setError(true)
        } else {
            setError(false)
            onAddHabit(habitName)
            setEmpty(true)
        }
    }

    useEffect(() => {
        if (empty === true) {
            inputRef.current.value = ''
        }
    })

    return (
        <form className={styles.addHabitForm} onSubmit={handleAddHabit}>
            <div className={styles.addHabitForm__inputGroup}>
                <input
                    ref={inputRef}
                    type="text"
                    className={`${styles.addHabitForm__input} ${error ? styles.addHabitForm__input_error : ''}`}
                    placeholder={translate('newHabitPlaceholder')}
                    aria-label={translate('newHabitPlaceholder')}
                />
                <button className={styles.addHabitForm__button} type="submit">
                    {translate('addHabitButton')}
                </button>
            </div>
        </form>
    );
}

export default AddHabitForm;