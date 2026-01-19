import { object, string, number, array, boolean } from "yup";

export const propertySchema = object({
  title: string().required("Title is required"),
  description: string().required("Description is required"),
  propertyType: string()
    .oneOf(["room", "flat", "house", "hostel", "pg"])
    .required("Property type is required"),
  roomType: string().oneOf(["single", "shared"]).required("Room type is required"),
  price: number().required("Price is required").positive("Price must be positive"),
  securityDeposit: number().positive("Security deposit must be positive").optional(),
  availableFrom: string().required("Available from date is required"),
  minimumStay: string().optional(),
  location: object({
    address: string().required("Address is required"),
    city: string().required("City is required"),
    area: string().required("Area is required"),
  }).required(),
  specifications: object({
    size: number().positive("Size must be positive").optional(),
    rooms: number().positive("Rooms must be positive").integer().optional(),
    bathrooms: number().positive("Bathrooms must be positive").integer().optional(),
    furnished: boolean().required(),
  }).required(),
  amenities: array().of(string()).default([]),
  suitableFor: string().optional(),
  houseRules: object({
    smoking: boolean().required(),
    pets: boolean().required(),
  }).required(),
  contact: object({
    name: string().required("Contact name is required"),
    phone: string().required("Phone number is required"),
  }).required(),
});
