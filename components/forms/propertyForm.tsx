"use client";

import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useAddPropertyHandler } from "@/hooks/handlers/useAddPropertyHandler";
import Image from "next/image";

const PropertyForm = () => {
  const {
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
  } = useAddPropertyHandler();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          <p className="text-sm text-gray-500 mt-1">Tell us about your property</p>
        </div>
        <Input
          name="title"
          label="Property Title"
          placeholder="e.g., Spacious 2BHK Apartment"
          required
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
        />
        <Textarea
          name="description"
          label="Description"
          placeholder="Describe your property..."
          rows={4}
          required
          value={formData.description}
          error={errors.description}
          onChange={(e) => {
            setErrors({ ...errors, description: "" });
            setFormData({ ...formData, description: e.target.value });
          }}
        />
      </div>

      {/* Property Details */}
      <div className="space-y-4">
        <div className="border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-900">Property Details</h3>
          <p className="text-sm text-gray-500 mt-1">Pricing and availability</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            name="propertyType"
            label="Property Type"
            options={["Room", "Flat", "House", "Hostel", "PG"]}
            placeholder="Select type"
            required
            value={formData.propertyType}
            onChange={handleSelect}
            error={errors.propertyType}
          />
          <Select
            name="roomType"
            label="Room Type"
            options={["Single", "Shared"]}
            placeholder="Select room type"
            required
            value={formData.roomType}
            onChange={handleSelect}
            error={errors.roomType}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="price"
            label="Monthly Rent (NPR)"
            type="number"
            placeholder="10000"
            required
            value={formData.price || ""}
            onChange={handleChange}
            error={errors.price}
          />
          <Input
            name="securityDeposit"
            label="Security Deposit (NPR)"
            type="number"
            placeholder="5000"
            value={formData.securityDeposit || ""}
            onChange={handleChange}
            error={errors.securityDeposit}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="availableFrom"
            label="Available From"
            type="date"
            required
            value={formData.availableFrom}
            onChange={handleChange}
            error={errors.availableFrom}
          />
          <Select
            name="minimumStay"
            label="Minimum Stay"
            options={["1 Month", "3 Months", "6 Months", "1 Year"]}
            placeholder="Select minimum stay"
            value={formData.minimumStay}
            onChange={handleSelect}
            error={errors.minimumStay}
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <div className="border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-900">Location</h3>
          <p className="text-sm text-gray-500 mt-1">Where is your property located?</p>
        </div>
        <Input
          name="address"
          label="Address"
          placeholder="Street address"
          required
          value={formData.location.address}
          onChange={handleChange}
          error={errors["location.address"]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="city"
            label="City"
            placeholder="e.g., Kathmandu"
            required
            value={formData.location.city}
            onChange={handleChange}
            error={errors["location.city"]}
          />
          <Input
            name="area"
            label="Area"
            placeholder="e.g., Thamel"
            required
            value={formData.location.area}
            onChange={handleChange}
            error={errors["location.area"]}
          />
        </div>
      </div>

      {/* Specifications */}
      <div className="space-y-4">
        <div className="border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
          <p className="text-sm text-gray-500 mt-1">Property size and features</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            name="size"
            label="Size (sq ft)"
            type="number"
            placeholder="1000"
            value={formData.specifications.size || ""}
            onChange={handleChange}
            error={errors["specifications.size"]}
          />
          <Input
            name="rooms"
            label="Rooms"
            type="number"
            placeholder="2"
            value={formData.specifications.rooms || ""}
            onChange={handleChange}
            error={errors["specifications.rooms"]}
          />
          <Input
            name="bathrooms"
            label="Bathrooms"
            type="number"
            placeholder="1"
            value={formData.specifications.bathrooms || ""}
            onChange={handleChange}
            error={errors["specifications.bathrooms"]}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="furnished"
            name="furnished"
            className="rounded"
            checked={formData.specifications.furnished}
            onChange={handleChange}
          />
          <label htmlFor="furnished" className="text-sm">
            Furnished
          </label>
        </div>
      </div>

      {/* Amenities & Rules */}
      <div className="space-y-4">
        <div className="border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-900">Amenities & Rules</h3>
          <p className="text-sm text-gray-500 mt-1">What does your property offer?</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="wifi"
              className="rounded"
              checked={formData.amenities.includes("wifi")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amenities: e.target.checked
                    ? [...formData.amenities, "wifi"]
                    : formData.amenities.filter((a) => a !== "wifi"),
                })
              }
            />
            <span className="text-sm">WiFi</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="parking"
              className="rounded"
              checked={formData.amenities.includes("parking")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amenities: e.target.checked
                    ? [...formData.amenities, "parking"]
                    : formData.amenities.filter((a) => a !== "parking"),
                })
              }
            />
            <span className="text-sm">Parking</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="bathroom"
              className="rounded"
              checked={formData.amenities.includes("bathroom")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amenities: e.target.checked
                    ? [...formData.amenities, "bathroom"]
                    : formData.amenities.filter((a) => a !== "bathroom"),
                })
              }
            />
            <span className="text-sm">Attached Bathroom</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="kitchen"
              className="rounded"
              checked={formData.amenities.includes("kitchen")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amenities: e.target.checked
                    ? [...formData.amenities, "kitchen"]
                    : formData.amenities.filter((a) => a !== "kitchen"),
                })
              }
            />
            <span className="text-sm">Kitchen Access</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="balcony"
              className="rounded"
              checked={formData.amenities.includes("balcony")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amenities: e.target.checked
                    ? [...formData.amenities, "balcony"]
                    : formData.amenities.filter((a) => a !== "balcony"),
                })
              }
            />
            <span className="text-sm">Balcony</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="powerBackup"
              className="rounded"
              checked={formData.amenities.includes("powerBackup")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amenities: e.target.checked
                    ? [...formData.amenities, "powerBackup"]
                    : formData.amenities.filter((a) => a !== "powerBackup"),
                })
              }
            />
            <span className="text-sm">Power Backup</span>
          </label>
        </div>
        <div className="pt-2">
          <Select
            name="suitableFor"
            label="Suitable For"
            options={[
              "Students",
              "Working Professionals",
              "Family",
              "Girls Only",
              "Boys Only",
              "Anyone",
            ]}
            placeholder="Select tenant type"
            onChange={handleSelect}
            error={errors.suitableFor}
          />
        </div>
        <div className="space-y-3 pt-2">
          <label className="block text-sm font-medium">House Rules</label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="smoking"
                className="rounded w-4 h-4"
                onChange={handleChange}
              />
              <span className="text-sm">Smoking Allowed</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="pets" className="rounded w-4 h-4" />
              <span className="text-sm">Pets Allowed</span>
            </label>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div className="border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          <p className="text-sm text-gray-500 mt-1">How can tenants reach you?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="contactName"
            label="Contact Name"
            placeholder="Your name"
            required
            onChange={handleChange}
            error={errors["contact.name"]}
          />
          <Input
            name="contactPhone"
            label="Phone Number"
            type="tel"
            placeholder="98XXXXXXXX"
            required
            onChange={handleChange}
            error={errors["contact.phone"]}
          />
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <div className="border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-900">Images</h3>
          <p className="text-sm text-gray-500 mt-1">Add photos of your property</p>
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          disabled={imagePreviews.length >= 3}
          onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
        />
        {errors.images && <p className="text-sm text-red-600">{errors.images}</p>}
        <p className="text-xs text-gray-500">Upload 1-3 images (Required)</p>
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview}
                  alt="Property"
                  className="object-cover rounded"
                  width={200}
                  height={120}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="space-y-4 pt-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" required className="rounded" />
          <span className="text-sm">I confirm this information is accurate</span>
        </label>
        <div className="flex gap-4">
          <Button type="submit" disabled={pending} className="flex-1">
            {pending ? "Submitting..." : "Submit & Publish Property"}
          </Button>
          <Button type="button" variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PropertyForm;
