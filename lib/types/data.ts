export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: "room" | "flat" | "house" | "hostel" | "pg";
  roomType: "single" | "shared";
  price: number;
  securityDeposit?: number;
  availableFrom: string;
  minimumStay?: string;
  location: {
    address: string;
    city: string;
    area: string;
  };
  specifications: {
    size?: number;
    rooms?: number;
    bathrooms?: number;
    furnished: boolean;
  };
  amenities: string[];
  suitableFor?: string;
  houseRules: {
    smoking: boolean;
    pets: boolean;
  };
  contact: {
    name: string;
    phone: string;
  };
  availability: "available" | "rented" | "pending";
  ownerId: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "new_inquiry" | "inquiry_status" | "property_views" | "stale_property";
  read: boolean;
  relatedId?: string;
  createdAt: string;
}

export type PropertyFormData = Omit<
  Property,
  "id" | "ownerId" | "createdAt" | "updatedAt" | "views"
>;
