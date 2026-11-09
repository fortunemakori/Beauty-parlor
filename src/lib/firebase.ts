import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
  getDocFromServer,
  Firestore,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Appointment } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Initialize Firebase App singleton
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: Initialize Firestore using the exact provisioned database ID
export const db: Firestore = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const auth = getAuth(app);

// Connection test on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline, check connection.');
    }
  }
}

// Initial connection check
testConnection();

// Appointments Firestore Service
const APPOINTMENTS_COLLECTION = 'appointments';

export async function saveAppointmentToFirestore(appointment: Appointment): Promise<void> {
  const path = `${APPOINTMENTS_COLLECTION}/${appointment.id}`;
  try {
    await setDoc(doc(db, APPOINTMENTS_COLLECTION, appointment.id), {
      ...appointment,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateAppointmentInFirestore(
  appointmentId: string,
  updates: Partial<Appointment>
): Promise<void> {
  const path = `${APPOINTMENTS_COLLECTION}/${appointmentId}`;
  try {
    await updateDoc(doc(db, APPOINTMENTS_COLLECTION, appointmentId), {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function fetchAppointmentsFromFirestore(): Promise<Appointment[]> {
  const path = APPOINTMENTS_COLLECTION;
  try {
    const q = query(collection(db, APPOINTMENTS_COLLECTION));
    const snapshot = await getDocs(q);
    const appointments: Appointment[] = [];
    snapshot.forEach((d) => {
      appointments.push(d.data() as Appointment);
    });
    return appointments;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export function subscribeToAppointments(
  onUpdate: (appointments: Appointment[]) => void,
  onError?: (error: Error) => void
): () => void {
  const path = APPOINTMENTS_COLLECTION;
  const q = query(collection(db, APPOINTMENTS_COLLECTION));

  return onSnapshot(
    q,
    (snapshot) => {
      const appointments: Appointment[] = [];
      snapshot.forEach((d) => {
        appointments.push(d.data() as Appointment);
      });
      onUpdate(appointments);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (err) {
        if (onError && err instanceof Error) {
          onError(err);
        }
      }
    }
  );
}
