"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { createInquiry } from "@/lib/actions";
import { toast } from "react-hot-toast";
import { MessageSquare, User, Mail, Phone, Calendar, Send } from "lucide-react";

export default function InquiryForm({
  propertyId,
  onClose,
}: {
  propertyId: string;
  onClose?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tenantName: "",
    tenantEmail: "",
    tenantPhone: "",
    message: "",
    moveInDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createInquiry({ ...formData, propertyId });
      toast.success("Inquiry sent successfully");
      onClose?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Send Inquiry</h2>
              <p className="text-sm text-muted-foreground">Get in touch with the property owner</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Your Name"
            required
            placeholder="John Doe"
            icon={<User className="h-5 w-5" />}
            value={formData.tenantName}
            onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
          />

          <Input
            label="Email"
            type="email"
            required
            placeholder="john@example.com"
            icon={<Mail className="h-5 w-5" />}
            value={formData.tenantEmail}
            onChange={(e) => setFormData({ ...formData, tenantEmail: e.target.value })}
          />

          <Input
            label="Phone"
            type="tel"
            required
            placeholder="98XXXXXXXX"
            icon={<Phone className="h-5 w-5" />}
            value={formData.tenantPhone}
            onChange={(e) => setFormData({ ...formData, tenantPhone: e.target.value })}
          />

          <Input
            label="Move-in Date"
            type="date"
            required
            icon={<Calendar className="h-5 w-5" />}
            value={formData.moveInDate}
            onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
          />

          <Textarea
            label="Message"
            required
            rows={4}
            placeholder="Tell us about your requirements..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 text-base"
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send Inquiry
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
