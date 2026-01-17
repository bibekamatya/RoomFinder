import { Room, Inquiry, User } from '../types';

export const users: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@roomfinder.com', role: 'admin' },
  { id: '2', name: 'Ram Sharma', email: 'ram@example.com', role: 'owner' },
  { id: '3', name: 'Sita Thapa', email: 'sita@example.com', role: 'owner' },
];

export const rooms: Room[] = [
  {
    id: '1',
    title: 'Modern Room in Thamel',
    description: 'Spacious room with modern amenities in the heart of Thamel. Perfect for students and professionals.',
    price: 15000,
    priceType: 'monthly',
    propertyType: 'room',
    location: { address: 'Thamel Marg', city: 'Kathmandu', area: 'Thamel' },
    amenities: ['WiFi', 'Attached Bath', 'Furnished', 'Hot Water'],
    images: [],
    specifications: { size: 150, rooms: 1, bathrooms: 1, furnished: true },
    availability: 'available',
    ownerId: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Cozy Studio in Lakeside',
    description: 'Beautiful studio apartment with lake view. Quiet and peaceful location.',
    price: 12000,
    priceType: 'monthly',
    propertyType: 'apartment',
    location: { address: 'Lakeside Road', city: 'Pokhara', area: 'Lakeside' },
    amenities: ['WiFi', 'Kitchen', 'Lake View', 'Parking'],
    images: [],
    specifications: { size: 200, rooms: 1, bathrooms: 1, furnished: true },
    availability: 'available',
    ownerId: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Spacious Apartment in Boudha',
    description: 'Large 2-bedroom apartment near Boudhanath Stupa. Great for families.',
    price: 18000,
    priceType: 'monthly',
    propertyType: 'apartment',
    location: { address: 'Boudha Road', city: 'Kathmandu', area: 'Boudha' },
    amenities: ['WiFi', 'Parking', 'Balcony', 'Security'],
    images: [],
    specifications: { size: 400, rooms: 2, bathrooms: 2, furnished: false },
    availability: 'available',
    ownerId: '3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const inquiries: Inquiry[] = [];
