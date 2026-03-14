import { supabase } from '../config/supabase';

export const debugContactForm = async () => {
    console.log('--- Debugging Contact Form ---');
    
    // 1. Test Supabase connection
    try {
        const { data, error } = await supabase.from('contact_messages').select('count').limit(1);
        if (error) throw error;
        console.log('✅ Supabase connection successful');
    } catch (e: any) {
        console.error('❌ Supabase connection failed:', e.message);
    }
    
    // 2. Test Backend API availability
    try {
        const response = await fetch('/api/contact.php', {
            method: 'OPTIONS'
        });
        if (response.ok) {
            console.log('✅ Backend API (/api/contact.php) is reachable');
        } else {
            console.warn('⚠️ Backend API returned status:', response.status);
        }
    } catch (e: any) {
        console.error('❌ Backend API unreachable:', e.message);
    }
};
