import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AppProvider } from './context/AppContext.jsx';
import { ConversationProvider } from './context/ConversationContext.jsx';
import AppLayout from './components/AppLayout.jsx';
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx';
import History from './pages/History.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <ConversationProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ConversationProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
