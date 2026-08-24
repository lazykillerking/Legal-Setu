import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, supabaseConfigured } from '../services/supabaseClient.js';

const AuthContext = createContext(null);

async function saveUserProfile(user) {
  if (!supabase || !user) return;
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
  await supabase.from('user_profiles').upsert(
    { id: user.id, email: user.email ?? '', full_name: fullName },
    { onConflict: 'id' }
  );
}

function friendlyAuthError(err) {
  if (!err) return null;
  const msg = err.message || String(err);
  if (msg.toLowerCase().includes('rate limit')) {
    return 'Too many attempts. Please wait a bit before requesting another link.';
  }
  if (msg.toLowerCase().includes('network')) {
    return 'Network error while signing in. Check your connection and try again.';
  }
  return 'Something went wrong while signing in. Please try again.';
}

export function AuthProvider({ children }) {
  // loading stays true until the initial session lookup resolves, so the app
  // never briefly renders as "logged out" while Supabase is still checking.
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(
    supabaseConfigured ? null : 'App is missing Supabase configuration. Sign-in is unavailable.'
  );

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) setAuthError(friendlyAuthError(error));
      setSession(data?.session ?? null);
      if (data?.session?.user) saveUserProfile(data.session.user);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession?.user) saveUserProfile(nextSession.user);
      setLoading(false);
    });

    return () => {
      active = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // Sends a magic-link email; the user finishes sign-in by clicking it, which
  // redirects back here with a session already in the URL (handled by the
  // onAuthStateChange listener above).
  const signInWithMagicLink = useCallback(async (email, fullName) => {
    if (!supabase) {
      setAuthError('App is missing Supabase configuration. Sign-in is unavailable.');
      return { error: true };
    }
    setAuthError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Works in dev (localhost) and prod (whatever domain served the app)
        // without hardcoding a URL — must also be added to the Supabase
        // redirect allow-list (see setup steps).
        emailRedirectTo: window.location.origin,
        data: { full_name: fullName },
      },
    });
    if (error) setAuthError(friendlyAuthError(error));
    return { error };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) {
      setAuthError('App is missing Supabase configuration. Sign-in is unavailable.');
      return { error: true };
    }
    setAuthError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) setAuthError(friendlyAuthError(error));
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    setAuthError(null);
    const { error } = await supabase.auth.signOut();
    if (error) setAuthError(friendlyAuthError(error));
  }, []);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  const value = {
    user: session?.user ?? null,
    session,
    loading,
    authError,
    clearAuthError,
    signInWithMagicLink,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
