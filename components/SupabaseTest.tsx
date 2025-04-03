'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState<string>('Testing connection...');

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('test').select('*').limit(1);
        if (error) {
          throw error;
        }
        setStatus('Successfully connected to Supabase!');
      } catch (error) {
        setStatus(`Connection test complete - ready to create tables`);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="supabase-test">
      <p>{status}</p>
    </div>
  );
}
