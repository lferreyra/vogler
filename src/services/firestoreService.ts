import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { Booking, Lead, BlockedDate, ScheduleConfig, User, SiteSettings } from '../types';

// ==========================================
// USER PROFILE FIRESTORE OPERATIONS
// ==========================================

export async function fetchUserProfile(userId: string): Promise<User | null> {
  const path = `users/${userId}`;
  try {
    const snap = await getDoc(doc(db, 'users', userId));
    if (snap.exists()) {
      return snap.data() as User;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function saveUserProfile(user: User): Promise<void> {
  const path = `users/${user.id}`;
  try {
    await setDoc(doc(db, 'users', user.id), user, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ==========================================
// BOOKINGS FIRESTORE OPERATIONS
// ==========================================

export function subscribeBookings(
  userId: string | null,
  isAdmin: boolean,
  onData: (bookings: Booking[]) => void
): () => void {
  const path = 'bookings';
  try {
    let q = query(collection(db, path));
    if (!isAdmin && userId) {
      q = query(collection(db, path), where('userId', '==', userId));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const bookingsList: Booking[] = [];
        snapshot.forEach((docSnap) => {
          bookingsList.push(docSnap.data() as Booking);
        });
        onData(bookingsList);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );

    return unsubscribe;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function saveBookingFirestore(booking: Booking): Promise<void> {
  const path = `bookings/${booking.id}`;
  try {
    await setDoc(doc(db, 'bookings', booking.id), booking);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateBookingFirestore(
  bookingId: string,
  data: Partial<Booking>
): Promise<void> {
  const path = `bookings/${bookingId}`;
  try {
    await updateDoc(doc(db, 'bookings', bookingId), data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// ==========================================
// LEADS (QUICK QUOTES) FIRESTORE OPERATIONS
// ==========================================

export async function createLeadFirestore(lead: Lead): Promise<void> {
  const path = `leads/${lead.id}`;
  try {
    await setDoc(doc(db, 'leads', lead.id), lead);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeLeads(onData: (leads: Lead[]) => void): () => void {
  const path = 'leads';
  try {
    const q = query(collection(db, path));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const leadsList: Lead[] = [];
        snapshot.forEach((docSnap) => {
          leadsList.push(docSnap.data() as Lead);
        });
        onData(leadsList);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );
    return unsubscribe;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function updateLeadFirestore(
  leadId: string,
  data: Partial<Lead>
): Promise<void> {
  const path = `leads/${leadId}`;
  try {
    await updateDoc(doc(db, 'leads', leadId), data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// ==========================================
// BLOCKED DATES FIRESTORE OPERATIONS
// ==========================================

export function subscribeBlockedDates(onData: (dates: BlockedDate[]) => void): () => void {
  const path = 'blockedDates';
  try {
    const q = query(collection(db, path));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: BlockedDate[] = [];
        snapshot.forEach((docSnap) => {
          list.push(docSnap.data() as BlockedDate);
        });
        onData(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );
    return unsubscribe;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function addBlockedDateFirestore(date: BlockedDate): Promise<void> {
  const path = `blockedDates/${date.id}`;
  try {
    await setDoc(doc(db, 'blockedDates', date.id), date);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteBlockedDateFirestore(dateId: string): Promise<void> {
  const path = `blockedDates/${dateId}`;
  try {
    await deleteDoc(doc(db, 'blockedDates', dateId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ==========================================
// SCHEDULE CONFIG FIRESTORE OPERATIONS
// ==========================================

export function subscribeScheduleConfig(onData: (config: ScheduleConfig) => void): () => void {
  const path = 'settings/schedule';
  try {
    const unsubscribe = onSnapshot(
      doc(db, 'settings', 'schedule'),
      (docSnap) => {
        if (docSnap.exists()) {
          onData(docSnap.data() as ScheduleConfig);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );
    return unsubscribe;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function saveScheduleConfigFirestore(config: ScheduleConfig): Promise<void> {
  const path = 'settings/schedule';
  try {
    await setDoc(doc(db, 'settings', 'schedule'), config);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ==========================================
// GENERAL SITE SETTINGS FIRESTORE OPERATIONS
// ==========================================

export function subscribeSiteSettings(onData: (settings: SiteSettings) => void): () => void {
  const path = 'settings/general';
  try {
    const unsubscribe = onSnapshot(
      doc(db, 'settings', 'general'),
      (docSnap) => {
        if (docSnap.exists()) {
          onData(docSnap.data() as SiteSettings);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );
    return unsubscribe;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function saveSiteSettingsFirestore(settings: SiteSettings): Promise<void> {
  const path = 'settings/general';
  try {
    await setDoc(doc(db, 'settings', 'general'), settings);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
