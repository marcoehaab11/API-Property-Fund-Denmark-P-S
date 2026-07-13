import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client (conditionally to avoid errors if ENV vars are missing)
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Simple in-memory rate limiting map (IP -> array of timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS = 2;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 1. Basic Rate Limiting Check
    // Note: In production Next.js, `request.headers.get('x-forwarded-for')` is typically used
    const ip = request.headers.get('x-forwarded-for') || 'unknown-ip';
    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const validTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
    
    if (validTimestamps.length >= MAX_SUBMISSIONS) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }
    
    validTimestamps.push(now);
    rateLimitMap.set(ip, validTimestamps);

    // 2. Data Validation
    if (!data.fullName || !data.email || !data.phone || !data.service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 3. Store in Supabase (if configured)
    if (supabase) {
      const { error: dbError } = await supabase
        .from('website_leads')
        .insert([{
          full_name: data.fullName,
          phone: data.phone,
          email: data.email,
          city: data.city || null,
          service_of_interest: data.service,
          preferred_time: data.preferredTime || null,
          message: data.message || null,
          status: 'New'
        }]);
      
      if (dbError) {
        console.error('Supabase error:', dbError);
        // Continue even if DB fails so user gets success, but log it
      }
    } else {
      console.log('Mock: Stored lead in memory (Supabase not configured)', data);
    }

    // 4. Trigger WhatsApp API (Mock)
    console.log(`Mock: Sending WhatsApp notification to +45 21 31 77 71 for new lead: ${data.fullName}`);

    // 5. Send HTML Email Confirmation (Mock)
    console.log(`Mock: Sending confirmation email to ${data.email}`);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
