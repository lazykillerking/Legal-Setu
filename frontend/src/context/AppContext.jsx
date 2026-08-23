import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';

const AppContext = createContext(null);

// English + all languages listed in the Eighth Schedule of the Constitution of India.
// `label` is the language's own native name (not an English translation of it).
export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'mr', label: 'मराठी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'ur', label: 'اردو' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'or', label: 'ଓଡ଼ିଆ' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'as', label: 'অসমীয়া' },
  { code: 'mai', label: 'मैथिली' },
  { code: 'sa', label: 'संस्कृतम्' },
  { code: 'ks', label: 'कॉशुर' },
  { code: 'ne', label: 'नेपाली' },
  { code: 'kok', label: 'कोंकणी' },
  { code: 'sd', label: 'سنڌي' },
  { code: 'doi', label: 'डोगरी' },
  { code: 'mni', label: 'ꯃꯤꯇꯩꯂꯣꯟ' },
  { code: 'sat', label: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'brx', label: 'बड़ो' },
];

// A small set of demo strings that visibly swap when the language selector changes.
// This is intentionally NOT a full i18n system -- only a handful of UI strings
// change, to demonstrate the language switcher without overstating scope.
// Every entry is written in that language's own script (not a romanization
// or an English gloss), so selecting a language shows text in that language.
const STRINGS = {
  en: {
    heading: 'How can I help with your legal question today?',
    subheading: 'Ask in plain language, in the language you are most comfortable with.',
    placeholder: 'Describe your legal problem...',
    newChat: 'New Chat',
  },
  hi: {
    heading: 'आज मैं आपके कानूनी प्रश्न में कैसे मदद कर सकता हूँ?',
    subheading: 'सरल भाषा में, अपनी पसंदीदा भाषा में पूछें।',
    placeholder: 'अपनी कानूनी समस्या बताएं...',
    newChat: 'नई बातचीत',
  },
  bn: {
    heading: 'আজ আমি আপনার আইনি প্রশ্নে কীভাবে সাহায্য করতে পারি?',
    subheading: 'সহজ ভাষায়, আপনার পছন্দের ভাষায় জিজ্ঞাসা করুন।',
    placeholder: 'আপনার আইনি সমস্যা বর্ণনা করুন...',
    newChat: 'নতুন আলাপ',
  },
  mr: {
    heading: 'आज मी तुमच्या कायदेशीर प्रश्नात कशी मदत करू शकतो?',
    subheading: 'सोप्या भाषेत, तुम्हाला सोयीस्कर असलेल्या भाषेत विचारा.',
    placeholder: 'तुमची कायदेशीर समस्या सांगा...',
    newChat: 'नवीन संभाषण',
  },
  te: {
    heading: 'ఈ రోజు మీ న్యాయపరమైన ప్రశ్నకు నేను ఎలా సహాయం చేయగలను?',
    subheading: 'సరళమైన భాషలో, మీకు అనుకూలమైన భాషలో అడగండి.',
    placeholder: 'మీ న్యాయ సమస్యను వివరించండి...',
    newChat: 'కొత్త చాట్',
  },
  ta: {
    heading: 'இன்று உங்கள் சட்டப் பிரச்சினைக்கு நான் எப்படி உதவ முடியும்?',
    subheading: 'எளிய மொழியில், நீங்கள் வசதியாக உணரும் மொழியில் கேளுங்கள்.',
    placeholder: 'உங்கள் சட்டப் பிரச்சினையை விவரிக்கவும்...',
    newChat: 'புதிய உரையாடல்',
  },
  gu: {
    heading: 'આજે હું તમારા કાનૂની પ્રશ્નમાં કેવી રીતે મદદ કરી શકું?',
    subheading: 'સરળ ભાષામાં, તમને અનુકૂળ હોય તે ભાષામાં પૂછો.',
    placeholder: 'તમારી કાનૂની સમસ્યાનું વર્ણન કરો...',
    newChat: 'નવી વાતચીત',
  },
  ur: {
    heading: 'آج میں آپ کے قانونی سوال میں کیسے مدد کر سکتا ہوں؟',
    subheading: 'سادہ زبان میں، اس زبان میں پوچھیں جس میں آپ آسانی محسوس کرتے ہیں۔',
    placeholder: 'اپنا قانونی مسئلہ بیان کریں...',
    newChat: 'نئی گفتگو',
  },
  kn: {
    heading: 'ಇಂದು ನಿಮ್ಮ ಕಾನೂನು ಪ್ರಶ್ನೆಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    subheading: 'ಸರಳ ಭಾಷೆಯಲ್ಲಿ, ನಿಮಗೆ ಅನುಕೂಲಕರವಾದ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ.',
    placeholder: 'ನಿಮ್ಮ ಕಾನೂನು ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ...',
    newChat: 'ಹೊಸ ಸಂಭಾಷಣೆ',
  },
  or: {
    heading: 'ଆଜି ମୁଁ ଆପଣଙ୍କ ଆଇନଗତ ପ୍ରଶ୍ନରେ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?',
    subheading: 'ସରଳ ଭାଷାରେ, ଆପଣ ସହଜ ଅନୁଭବ କରୁଥିବା ଭାଷାରେ ପଚାରନ୍ତୁ।',
    placeholder: 'ଆପଣଙ୍କ ଆଇନଗତ ସମସ୍ୟା ବର୍ଣ୍ଣନା କରନ୍ତୁ...',
    newChat: 'ନୂଆ ଚାଟ୍',
  },
  pa: {
    heading: 'ਅੱਜ ਮੈਂ ਤੁਹਾਡੇ ਕਾਨੂੰਨੀ ਸਵਾਲ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
    subheading: 'ਸਾਦੀ ਭਾਸ਼ਾ ਵਿੱਚ, ਜਿਸ ਭਾਸ਼ਾ ਵਿੱਚ ਤੁਸੀਂ ਸਹਿਜ ਹੋ, ਪੁੱਛੋ।',
    placeholder: 'ਆਪਣੀ ਕਾਨੂੰਨੀ ਸਮੱਸਿਆ ਦੱਸੋ...',
    newChat: 'ਨਵੀਂ ਗੱਲਬਾਤ',
  },
  ml: {
    heading: 'ഇന്ന് നിങ്ങളുടെ നിയമപരമായ ചോദ്യത്തിൽ ഞാൻ എങ്ങനെ സഹായിക്കാം?',
    subheading: 'ലളിതമായ ഭാഷയിൽ, നിങ്ങൾക്ക് സൗകര്യപ്രദമായ ഭാഷയിൽ ചോദിക്കുക.',
    placeholder: 'നിങ്ങളുടെ നിയമപ്രശ്നം വിവരിക്കുക...',
    newChat: 'പുതിയ ചാറ്റ്',
  },
  as: {
    heading: 'আজি মই আপোনাৰ আইনী প্ৰশ্নত কেনেকৈ সহায় কৰিব পাৰোঁ?',
    subheading: 'সহজ ভাষাত, আপুনি সহজ অনুভৱ কৰা ভাষাত সোধক।',
    placeholder: 'আপোনাৰ আইনী সমস্যা বৰ্ণনা কৰক...',
    newChat: 'নতুন আলাপ',
  },
  mai: {
    heading: 'आइ हम अहाँक कानूनी प्रश्नमे कोना मदद क सकैत छी?',
    subheading: 'सरल भाषामे, जे भाषामे अहाँ सहज होई से पूछू।',
    placeholder: 'अपन कानूनी समस्या वर्णन करू...',
    newChat: 'नव बातचीत',
  },
  sa: {
    heading: 'अद्य अहं भवतः विधिविषयकं प्रश्नं कथं साहाय्यं कर्तुं शक्नोमि?',
    subheading: 'सरलभाषायां, या भाषा भवते सुगमा तस्यां पृच्छतु।',
    placeholder: 'स्वकीयां विधिसमस्यां वर्णयतु...',
    newChat: 'नूतनं संभाषणम्',
  },
  ks: {
    heading: 'आज़ मैं तोहनिस कानूनी सवालस मंज़ किताह मदद करी हेकां?',
    subheading: 'आसान ज़बानि मंज़, यि ज़बान तोहय आसान लगान, तिमी पुछिव।',
    placeholder: 'पनुन कानूनी मसला बयान करिव...',
    newChat: 'नव गुफ्तगू',
  },
  ne: {
    heading: 'आज म तपाईंको कानूनी प्रश्नमा कसरी मद्दत गर्न सक्छु?',
    subheading: 'सरल भाषामा, तपाईंलाई सहज लाग्ने भाषामा सोध्नुहोस्।',
    placeholder: 'तपाईंको कानूनी समस्या वर्णन गर्नुहोस्...',
    newChat: 'नयाँ कुराकानी',
  },
  kok: {
    heading: 'आज हांव तुमच्या कायदेशीर प्रस्नांत कशी मदत करूं येता?',
    subheading: 'सोप्या भाशेंत, तुमकां सुविधायेची भास वापरून विचारात.',
    placeholder: 'तुमची कायदेशीर समस्या वर्णन करात...',
    newChat: 'नवें संभाषण',
  },
  sd: {
    heading: 'اڄ مان توهانجي قانوني سوال ۾ ڪيئن مدد ڪري سگهان ٿو؟',
    subheading: 'سولي ٻولي ۾، جيڪا ٻولي توهان کي آسان لڳي تنهن ۾ پڇو.',
    placeholder: 'پنهنجي قانوني مسئلي جو بيان ڪريو...',
    newChat: 'نئين ڳالهه ٻولهه',
  },
  doi: {
    heading: 'अज्ज मैं तुंदे कानूनी सवाल च कि मदद करी सकनै?',
    subheading: 'सोखी भाशा च, जिस भाशा च तुसें आसान लगदा पुच्छो।',
    placeholder: 'आपणी कानूनी समस्या दस्सो...',
    newChat: 'नमीं गल्लबात',
  },
  mni: {
    heading: 'ꯉꯁꯤ ꯑꯩꯅ ꯅꯪꯒꯤ ꯋꯥꯌꯦꯜ ꯑꯁꯤꯗ ꯀꯔꯝꯅ ꯃꯇꯦꯡ ꯄꯥꯡꯒꯅꯤ?',
    subheading: 'ꯄꯥꯡꯒꯜ ꯂꯣꯟꯗ, ꯅꯪꯅ ꯆꯪꯅ ꯉꯝꯅꯕ ꯂꯣꯟꯗ ꯍꯪꯕꯤꯌꯨ.',
    placeholder: 'ꯅꯪꯒꯤ ꯋꯥꯌꯦꯜ ꯋꯥꯐꯝ ꯍꯥꯢꯕꯤꯌꯨ...',
    newChat: 'ꯋꯥꯔꯤ ꯑꯅꯧꯕ',
  },
  sat: {
    heading: 'तिंगिन आम आम रेयाक़ आइनी प्रोस्नो रे चेत लेकान मदद दाड़ेयाम?',
    subheading: 'सोलोमोन पारसिक ते, जाहान पारसिक आमाक़ सोलोमोन लागोआ ओना ते कुली मे.',
    placeholder: 'आमाक़ आइनी गोंडेय ओलाओ मे...',
    newChat: 'नावा रोड़ो',
  },
  brx: {
    heading: 'दिनै आं नोंथाङा कानूनी प्रश्नाव मोन्दिनि दा गोहो होनो हागौ?',
    subheading: 'सुबुं फोरमानि रावजों, नोंथाङा गोहो जागायथारि रावजों सुंगोन।',
    placeholder: 'नोंथाङनि कानूनी समस्याखौ फोरमायदों...',
    newChat: 'गोदान सल्लाहनाय',
  },
};

export function AppProvider({ children }) {
  const { user } = useAuth();
  const [language, setLanguage] = useState('en');
  const [historyCleared, setHistoryCleared] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [nameEdited, setNameEdited] = useState(false);

  // Default the display name from the signed-in account until the user
  // edits it themselves in Settings.
  useEffect(() => {
    if (nameEdited) return;
    const fallback = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';
    setDisplayName(fallback);
  }, [user, nameEdited]);

  const updateDisplayName = useCallback((name) => {
    setNameEdited(true);
    setDisplayName(name);
  }, []);

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
        setDisplayName: updateDisplayName,
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
