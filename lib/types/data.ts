export interface ProPerty {
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
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export type PropertyFormData = Omit<
  ProPerty,
  "id" | "ownerId" | "createdAt" | "updatedAt"
>;
