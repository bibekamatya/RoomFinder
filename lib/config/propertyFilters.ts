import {
  Home,
  Building2,
  Hotel,
  Users,
  Bed,
  Wifi,
  Car,
  Utensils,
  Droplets,
  Zap,
  Wind,
} from "lucide-react";

export const PROPERTY_TYPES = [
  { value: "room", label: "Room", icon: Bed },
  { value: "flat", label: "Flat", icon: Building2 },
  { value: "house", label: "House", icon: Home },
  { value: "hostel", label: "Hostel", icon: Hotel },
  { value: "pg", label: "PG", icon: Users },
] as const;

export const ROOM_TYPES = [
  { value: "single", label: "Single" },
  { value: "shared", label: "Shared" },
] as const;

export const AMENITIES_LIST = [
  { value: "wifi", label: "WiFi", icon: Wifi },
  { value: "parking", label: "Parking", icon: Car },
  { value: "bathroom", label: "Attached Bathroom", icon: Droplets },
  { value: "kitchen", label: "Kitchen Access", icon: Utensils },
  { value: "balcony", label: "Balcony", icon: Wind },
  { value: "powerBackup", label: "Power Backup", icon: Zap },
] as const;

export const PRICE_RANGE = {
  MIN: 1000,
  MAX: 50000,
  STEP: 1000,
} as const;
