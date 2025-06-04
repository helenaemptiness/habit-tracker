import React, { useContext, useEffect } from 'react';
import { LanguageContext, LanguageProvider } from './context/LanguageContext';
import Tracker from './components/Tracker/Tracker';
import styles from './App.module.css'

function AppWrapper() {
  const { language, translate } = useContext(LanguageContext);

  useEffect(() => {

    document.documentElement.lang = language;

    document.title = translate('appTitle');
  }, [language, translate]);

  return (
    <div className={styles.app}>
      <Tracker/>
    </div>
  );
}


function App() {
  return (
    <LanguageProvider>
      <AppWrapper />
    </LanguageProvider>
  );
}


export default App;
