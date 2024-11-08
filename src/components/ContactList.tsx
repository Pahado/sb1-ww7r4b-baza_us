import { useState } from 'react';
import { Contact } from '../types';

interface ContactListProps {
  contacts: Contact[];
}

export function ContactList({ contacts }: ContactListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.officeName.toLowerCase().includes(searchLower) ||
      contact.contactPerson.toLowerCase().includes(searchLower) ||
      contact.city.toLowerCase().includes(searchLower) ||
      contact.phoneNumber.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder="Szukaj..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded-md border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nazwa urzędu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Osoba kontaktowa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Miejscowość
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <tr key={contact.id}>
                <td className="px-6 py-4 whitespace-nowrap">{contact.officeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.contactPerson}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}