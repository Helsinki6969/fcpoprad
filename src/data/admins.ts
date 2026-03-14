/**
 * FC POPRAD - Administrátorské kontá (Mock Data)
 * 
 * Tento súbor obsahuje mock dáta pre administrátorov systému.
 * V produkčnom prostredí by tieto dáta boli uložené v databáze.
 */

export interface Admin {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export const admins: Admin[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@fcpoprad.sk',
    fullName: 'Administrátor',
    role: 'Super Admin',
    isActive: true,
    createdAt: '2024-01-01',
    lastLogin: '2026-01-17'
  },
  {
    id: 2,
    username: 'vladimir.bycko',
    email: 'v.bycko@fcpoprad.sk',
    fullName: 'Vladimír Bycko',
    role: 'Redaktor',
    isActive: true,
    createdAt: '2024-03-15',
    lastLogin: '2026-01-16'
  },
  {
    id: 3,
    username: 'martin.kovac',
    email: 'm.kovac@fcpoprad.sk',
    fullName: 'Martin Kováč',
    role: 'Redaktor',
    isActive: true,
    createdAt: '2024-06-10',
    lastLogin: '2026-01-15'
  },
  {
    id: 4,
    username: 'jana.novakova',
    email: 'j.novakova@fcpoprad.sk',
    fullName: 'Jana Nováková',
    role: 'Editor',
    isActive: true,
    createdAt: '2024-09-01',
    lastLogin: '2026-01-14'
  },
  {
    id: 5,
    username: 'tomas.hudak',
    email: 't.hudak@fcpoprad.sk',
    fullName: 'Tomáš Hudák',
    role: 'Redaktor',
    isActive: true,
    createdAt: '2024-10-05',
    lastLogin: '2026-01-13'
  },
  {
    id: 6,
    username: 'milan.balog',
    email: 'm.balog@fcpoprad.sk',
    fullName: 'Milan Balog',
    role: 'Športový reportér',
    isActive: true,
    createdAt: '2024-11-20',
    lastLogin: '2026-01-12'
  },
  {
    id: 7,
    username: 'peter.sladek',
    email: 'p.sladek@fcpoprad.sk',
    fullName: 'Peter Sládek',
    role: 'Redaktor',
    isActive: true,
    createdAt: '2025-01-10',
    lastLogin: '2026-01-11'
  }
];

/**
 * Získa administrátora podľa ID
 */
export function getAdminById(id: number): Admin | undefined {
  return admins.find(admin => admin.id === id);
}

/**
 * Získa administrátora podľa používateľského mena
 */
export function getAdminByUsername(username: string): Admin | undefined {
  return admins.find(admin => admin.username === username);
}

/**
 * Získa všetkých aktívnych administrátorov
 */
export function getActiveAdmins(): Admin[] {
  return admins.filter(admin => admin.isActive);
}