export interface Contact {
  id?: number;
  officeName: string;
  contactPerson: string;
  city: string;
  phoneNumber: string;
  email: string;
}

const DB_NAME = 'contactsDB';
const STORE_NAME = 'contacts';

export async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

export async function addContact(contact: Omit<Contact, 'id'>): Promise<Contact> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(contact);

    request.onsuccess = () => {
      resolve({ ...contact, id: request.result as number });
    };
    request.onerror = () => reject(request.error);
  });
}

export async function getAllContacts(): Promise<Contact[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}