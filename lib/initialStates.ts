import { PropertyFormData } from "./types/data";

const EMPTY_PROPERTY: PropertyFormData = {
  title: "",
  description: "",
  propertyType: "room",
  roomType: "single",
  price: 0,
  securityDeposit: 0,
  availableFrom: new Date().toISOString().split('T')[0],
  minimumStay: "",
  location: {
    address: "",
    city: "",
    area: "",
  },
  specifications: {
    size: 0,
    rooms: 0,
    bathrooms: 0,
    furnished: false,
  },
  amenities: [],
  suitableFor: "",
  houseRules: {
    smoking: false,
    pets: false,
  },
  contact: {
    name: "",
    phone: "",
  },
  availability:"available",
};

const DEV_PROPERTY: PropertyFormData = {
  title: "Spacious 2BHK Apartment in Thamel",
  description: "Beautiful apartment with modern amenities, close to restaurants and shops. Perfect for students and working professionals.",
  propertyType: "flat",
  roomType: "single",
  price: 15000,
  securityDeposit: 30000,
  availableFrom: new Date().toISOString().split('T')[0],
  minimumStay: "3 Months",
  location: {
    address: "Thamel Marg, Ward 26",
    city: "Kathmandu",
    area: "Thamel",
  },
  specifications: {
    size: 800,
    rooms: 2,
    bathrooms: 1,
    furnished: true,
  },
  amenities: ["wifi", "parking", "kitchen"],
  suitableFor: "Students",
  houseRules: {
    smoking: false,
    pets: true,
  },
  contact: {
    name: "John Doe",
    phone: "9841234567",
  },
  images: [],
  availability:"available"
};

export const ADD_PROPERTY = process.env.NODE_ENV === "development" ? DEV_PROPERTY : EMPTY_PROPERTY;
