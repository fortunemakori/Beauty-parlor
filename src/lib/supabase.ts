import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Appointment } from '../types';

function cleanString(val: unknown): string {
  if (typeof val !== 'string') return '';
  let str = val.trim();
  if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
    str = str.slice(1, -1).trim();
  }
  return str;
}

export const SUPABASE_URL = cleanString(
  import.meta.env.VITE_SUPABASE_URL || 'https://oluxlbhpykacxcyexztk.supabase.co'
);

export const SUPABASE_ANON_KEY = cleanString(
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sdXhsYmhweWthY3hjeWV4enRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQxODE0NjYsImV4cCI6MjEwOTc1NzQ2Nn0.jfNkBLCTpx-PcMlTrlbkkWx0rj6TgVCLaqDBSQqoyZA'
);

function isValidHttpUrl(urlString: string): boolean {
  if (!urlString) return false;
  try {
    const parsed = new URL(urlString);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export const isSupabaseConfigured = (): boolean => {
  return (
    isValidHttpUrl(SUPABASE_URL) &&
    !SUPABASE_URL.includes('your-project-id') &&
    SUPABASE_ANON_KEY.length > 20 &&
    !SUPABASE_ANON_KEY.includes('your-anon-public-key')
  );
};

export const supabase: SupabaseClient | null = (() => {
  try {
    if (isSupabaseConfigured()) {
      return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
    }
  } catch (err) {
    console.warn('Supabase initialization deferred:', err);
  }
  return null;
})();

// Convert an Appointment model into the Supabase database schema
export const mapAppointmentToSupabaseRow = (apt: Appointment) => ({
  id: apt.id,
  booking_ref: apt.bookingRef,
  client_name: apt.clientName,
  client_phone: apt.clientPhone,
  client_email: apt.clientEmail || null,
  service_id: apt.serviceId,
  service_name: apt.serviceName,
  stylist_id: apt.stylistId,
  stylist_name: apt.stylistName,
  date: apt.date,
  time_slot: apt.timeSlot,
  total_kes: apt.totalKES,
  deposit_paid_kes: apt.depositPaidKES,
  status: apt.status,
  mpesa_code: apt.mpesaCode,
  notes: apt.notes || null,
  reminder_sent: apt.reminderSent ?? true,
});

// Convert a Supabase database row into the app's Appointment model
export const mapSupabaseRowToAppointment = (row: any): Appointment => ({
  id: row.id,
  bookingRef: row.booking_ref,
  clientName: row.client_name,
  clientPhone: row.client_phone,
  clientEmail: row.client_email || undefined,
  serviceId: row.service_id,
  serviceName: row.service_name,
  stylistId: row.stylist_id,
  stylistName: row.stylist_name,
  date: row.date,
  timeSlot: row.time_slot,
  totalKES: Number(row.total_kes),
  depositPaidKES: Number(row.deposit_paid_kes),
  status: row.status as Appointment['status'],
  mpesaCode: row.mpesa_code,
  notes: row.notes || undefined,
  createdAt: row.created_at || new Date().toISOString(),
  reminderSent: Boolean(row.reminder_sent),
});

/**
 * Save an appointment to Supabase table
 */
export async function saveAppointmentToSupabase(appointment: Appointment): Promise<boolean> {
  if (!supabase) return false;
  try {
    const row = mapAppointmentToSupabaseRow(appointment);
    const { error } = await supabase.from('appointments').upsert(row);
    if (error) {
      console.error('Supabase insert/upsert error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to save to Supabase:', err);
    return false;
  }
}

/**
 * Update an appointment status in Supabase
 */
export async function updateAppointmentInSupabase(
  id: string,
  updates: Partial<Pick<Appointment, 'status' | 'notes'>>
): Promise<boolean> {
  if (!supabase) return false;
  try {
    const payload: Record<string, any> = {};
    if (updates.status) payload.status = updates.status;
    if (updates.notes !== undefined) payload.notes = updates.notes;

    const { error } = await supabase
      .from('appointments')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Supabase update error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to update in Supabase:', err);
    return false;
  }
}

/**
 * Fetch all appointments from Supabase
 */
export async function fetchAppointmentsFromSupabase(): Promise<Appointment[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return [];
    }
    return (data || []).map(mapSupabaseRowToAppointment);
  } catch (err) {
    console.error('Failed to fetch from Supabase:', err);
    return [];
  }
}

/**
 * Real-time subscription to appointments table in Supabase
 */
export function subscribeToSupabaseAppointments(
  onUpdate: (appointments: Appointment[]) => void
): () => void {
  if (!supabase) return () => {};

  // Initial load
  fetchAppointmentsFromSupabase().then((data) => {
    if (data.length > 0) {
      onUpdate(data);
    }
  });

  try {
    const channel = supabase
      .channel('public:appointments')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        () => {
          fetchAppointmentsFromSupabase().then((data) => {
            onUpdate(data);
          });
        }
      )
      .subscribe();

    return () => {
      supabase?.removeChannel(channel);
    };
  } catch (err) {
    console.warn('Real-time channel subscription deferred:', err);
    return () => {};
  }
}
