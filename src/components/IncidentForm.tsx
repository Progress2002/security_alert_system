import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";

export interface IncidentReport {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: Date;
  studentId: string;
  status: "pending" | "investigating" | "resolved";
}

interface IncidentFormProps {
  onSubmit: (report: Omit<IncidentReport, "id">) => void;
}

const IncidentForm = ({ onSubmit }: IncidentFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    address?: string;
  } | null>(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.warning("Your browser doesn't support location services.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: address || undefined,
        });
        toast.success("Location coordinates captured successfully.");
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Could not get your current location. Please try again.");
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !address.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!location || !location.lat || !location.lng) {
      toast.error("Please capture your device location coordinates.");
      return;
    }

    setIsSubmitting(true);

    try {
      const report: Omit<IncidentReport, "id"> = {
        title: title.trim(),
        description: description.trim(),
        location: {
          lat: location.lat,
          lng: location.lng,
          address: address.trim(),
        },
        timestamp: new Date(),
        studentId: "current-user", // In a real app, this would come from auth
        status: "pending",
      };

      onSubmit(report);

      // Reset form
      setTitle("");
      setDescription("");
      setAddress("");
      setLocation(null);

      toast.success("Report submitted successfully.");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error(
        "There was an error submitting your report. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-white mb-2">
        <CardTitle className="flex md:items-center gap-2 text-gray-900">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Submit Security Incident Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Incident Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of the incident"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information about the security incident..."
              className="min-h-[120px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Location Address *</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter the location address"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Device Location *
              </Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={getCurrentLocation}
                  className="flex-1 cursor-pointer">
                  {location?.lat && location?.lng
                    ? "Update Coordinates"
                    : "Capture Coordinates"}
                </Button>
                {location?.lat && location?.lng && (
                  <div className="flex items-center px-3 py-2 bg-blue-500 text-white border border-success/20 rounded-md text-sm">
                    ✓ Captured
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timestamp
              </Label>
              <div className="flex items-center px-3 py-2 bg-muted border border-input rounded-md text-sm text-text-secondary">
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full text-white font-semibold rounded-md h-10 bg-primary text-center"
            disabled={
              isSubmitting ||
              !title.trim() ||
              !description.trim() ||
              !address.trim() ||
              !location?.lat ||
              !location?.lng
            }>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default IncidentForm;
