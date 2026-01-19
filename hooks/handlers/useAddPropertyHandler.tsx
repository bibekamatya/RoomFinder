import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PropertyFormData } from "@/lib/types/data";
import { ADD_PROPERTY } from "@/lib/initialStates";
import { propertySchema } from "@/lib/schema";
import { createProperty } from "@/lib/actions/property";

export const useAddPropertyHandler = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<PropertyFormData>(ADD_PROPERTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const LOCATION_FIELDS = ["address", "city", "area"];
  const SPEC_FIELDS = ["size", "rooms", "bathrooms"];
  const HOUSE_RULES = ["smoking", "pets"];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    // Location fields
    if (LOCATION_FIELDS.includes(name)) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
      setErrors((prev) => ({ ...prev, [`location.${name}`]: "" }));
      return;
    }

    // Specifications fields
    if (SPEC_FIELDS.includes(name)) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [name]: Number(value) || 0,
        },
      }));
      setErrors((prev) => ({ ...prev, [`specifications.${name}`]: "" }));
      return;
    }

    if (name === "furnished") {
      setFormData((prev) => ({
        ...prev,
        specifications: { ...prev.specifications, furnished: checked },
      }));
      setErrors((prev) => ({ ...prev, "specifications.furnished": "" }));
      return;
    }

    // Contact fields
    if (name === "contactName") {
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, name: value },
      }));
      setErrors((prev) => ({ ...prev, "contact.name": "" }));
      return;
    }

    if (name === "contactPhone") {
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, phone: value },
      }));
      setErrors((prev) => ({ ...prev, "contact.phone": "" }));
      return;
    }

    // House rules
    if (HOUSE_RULES.includes(name)) {
      setFormData((prev) => ({
        ...prev,
        houseRules: { ...prev.houseRules, [name]: checked },
      }));
      setErrors((prev) => ({ ...prev, [`houseRules.${name}`]: "" }));
      return;
    }

    // Default: top-level fields
    const finalValue = type === "number" ? Number(value) || 0 : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await propertySchema.validate(formData, { abortEarly: false });

      // Validate images
      if (imageFiles.length < 1) {
        setErrors({ images: "At least 1 image is required" });
        return;
      }

      setErrors({});
      startTransition(async () => {
        try {
          const response = await createProperty(formData, imageFiles);
          router.push(`/properties/${response.id}`);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to create property";
          setErrors({ submit: message });
        }
      });
    } catch (err) {
      const validationErrors: Record<string, string> = {};
      if (err && typeof err === "object" && "inner" in err) {
        const yupError = err as {
          inner: Array<{ path?: string; message: string }>;
        };
        yupError.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
      }
      setErrors(validationErrors);
    }
  };

  const handleImageUpload = (files: FileList) => {
    const currentCount = imageFiles.length;
    const newCount = files.length;

    if (currentCount + newCount > 3) {
      setErrors({ images: "Maximum 3 images allowed" });
      return;
    }

    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);

    // Create previews
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    errors,
    setErrors,
    pending,
    formData,
    setFormData,
    handleSubmit,
    handleChange,
    handleSelect,
    handleImageUpload,
    removeImage,
    imagePreviews,
  };
};
