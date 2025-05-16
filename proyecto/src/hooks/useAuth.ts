import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { isAdmin as checkIsAdmin } from '../lib/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user?.email) {
          const { isAdmin: admin } = await checkIsAdmin(session.user.email);
          setIsAdmin(admin);
        } else {
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, isAdmin, isLoading };
}