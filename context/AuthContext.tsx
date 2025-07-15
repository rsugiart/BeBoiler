// store logged user info to reuse throughout the app
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase-config';
import { User } from 'firebase/auth';

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
