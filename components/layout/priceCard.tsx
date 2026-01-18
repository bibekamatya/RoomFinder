import { ProPerty } from "@/lib/types/data";
import { Mail, Phone } from "lucide-react";
import { Button } from "../ui/button";

interface PriceCardProps {
  property: ProPerty;
}
const PriceCard = ({ property }: PriceCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border sticky top-20">
      <div className="mb-6">
        <p className="text-3xl font-bold text-blue-600">
          NPR {property.price.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground mt-1">per month</p>
      </div>

      {property.securityDeposit && (
        <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-muted-foreground">Security Deposit</p>
          <p className="text-base font-semibold">
            NPR {property.securityDeposit.toLocaleString()}
          </p>
        </div>
      )}

      <div className="space-y-3 mb-6 pb-6 border-b">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Property Type</span>
          <span className="font-semibold capitalize">
            {property.propertyType}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Room Type</span>
          <span className="font-semibold capitalize">{property.roomType}</span>
        </div>
        {property.minimumStay && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Minimum Stay</span>
            <span className="font-semibold">{property.minimumStay}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Available From</span>
          <span className="font-semibold">{property.availableFrom}</span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm mb-3">Contact Information</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-blue-600" />
            <span>{property.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-blue-600" />
            <span>{property.contact.name}</span>
          </div>
        </div>
      </div>

      <Button className="w-full h-12 text-base font-semibold">
        Contact Owner
      </Button>
    </div>
  );
};

export default PriceCard;
