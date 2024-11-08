import { useState, useEffect } from 'react';
import { Contact } from './types';
import { ContactForm } from './components/ContactForm';
import { ContactList } from './components/ContactList';
import { getAllContacts, addContact } from './services/db';

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const loadContacts = async () => {
      const loadedContacts = await getAllContacts();
      setContacts(loadedContacts);
    };
    loadContacts();
  }, []);

  const handleAddContact = async (contact: Omit<Contact, 'id'>) => {
    const newContact = await addContact(contact);
    setContacts([...contacts, newContact]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-4xl mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-4xl mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8">Baza kontaktów</h1>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Dodaj nowy kontakt</h2>
                  <ContactForm onSubmit={handleAddContact} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Lista kontaktów</h2>
                  <ContactList contacts={contacts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}