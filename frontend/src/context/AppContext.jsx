import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'mr', label: 'Marathi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'ta', label: 'Tamil' },
  { code: 'te', label: 'Telugu' },
  { code: 'kn', label: 'Kannada' },
  { code: 'gu', label: 'Gujarati' },
];

// A small set of demo strings that visibly swap when the language selector changes.
// This is intentionally NOT a full i18n system -- only a handful of UI strings
// change, to demonstrate the language switcher without overstating scope.
const STRINGS = {
  en: {
    heading: 'How can I help with your legal question today?',
    subheading: 'Ask in plain language, in the language you are most comfortable with.',
    placeholder: 'Describe your legal problem...',
    newChat: 'New Chat',
  },
  hi: {
    heading: 'Aaj main aapke kanooni sawaal mein kaise madad kar sakta hoon?',
    subheading: 'Saral shabdon mein, apni bhasha mein poochein.',
    placeholder: 'Apni kanooni samasya bataayein...',
    newChat: 'Nayi Baatcheet',
  },
  mr: {
    heading: 'Aaj mi tumchya kayadeshir prashnaat kashi madat karu shakto?',
    subheading: 'Sopya bhashet vichara.',
    placeholder: 'Tumchi kayadeshir samasya liha...',
    newChat: 'Naveen Samvaad',
  },
  bn: {
    heading: 'Aaj ami apnar ainoto proshne kivabe sahajyo korte pari?',
    subheading: 'Sohoj bhashay jiggasa korun.',
    placeholder: 'Apnar aini somossa bornona korun...',
    newChat: 'Notun Alaap',
  },
  ta: {
    heading: 'Indru ungal sattak kelvikku naan eppadi udhava mudiyum?',
    subheading: 'Elimaiyaana mozhiyil kelungal.',
    placeholder: 'Ungal satta piraccinaiyai vivarikkavum...',
    newChat: 'Puthiya Uraiyaadal',
  },
  te: {
    heading: 'Ee roju mee chatta prashnaku nenu ela sahayam cheyagalanu?',
    subheading: 'Saralamaina bhashalo adagandi.',
    placeholder: 'Mee chatta samasyanu vivarinchandi...',
    newChat: 'Kotha Chat',
  },
  kn: {
    heading: 'Ee dina nimma kanoonu prashnege naanu hege sahaaya maadabahudu?',
    subheading: 'Saral bhaasheyalli keliri.',
    placeholder: 'Nimma kanoonu samasyeyannu vivarisi...',
    newChat: 'Hosa Samvaada',
  },
  gu: {
    heading: 'Aaje hu tamara kanuni prashnama kem madad kari shaku?',
    subheading: 'Saral bhashama puchho.',
    placeholder: 'Tamari kanuni samasya samjavo...',
    newChat: 'Navi Vaatchit',
  },
};

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [historyCleared, setHistoryCleared] = useState(false);
  const [displayName, setDisplayName] = useState('Arsh Khandelwal');

  const t = useCallback(
    (key) => (STRINGS[language] && STRINGS[language][key]) || STRINGS.en[key],
    [language]
  );

  const clearHistory = useCallback(() => setHistoryCleared(true), []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        historyCleared,
        clearHistory,
        displayName,
        setDisplayName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
