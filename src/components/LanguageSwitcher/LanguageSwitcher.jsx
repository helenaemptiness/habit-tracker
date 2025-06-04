import React, { useContext, useEffect } from "react";
import styles from './LanguageSwitcher..module.css'
import { LanguageContext } from "../../context/LanguageContext";

function LanguageSwitcher() {
    const {language, toggleLanguage} = useContext(LanguageContext)
    useEffect(() => {
        localStorage.setItem('lang', language)
    })
    return (
        <button 
            onClick={toggleLanguage}
            className={styles.languageSwitcher}
        >
            {language === 'ru' ? 'EN' : 'RU'}
        </button>
    );
}

export default LanguageSwitcher