import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAddReports } from "@/hooks/useReport";
import { UseAuth } from "@/contexts/AuthContext";
import Spinner from "./Spinner";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

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
  regNumber: string;
  studentId: string;
  status: "pending" | "investigating" | "resolved";
}

const IncidentForm = () => {
  const { currentUser, isLoading } = UseAuth();

  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm<IncidentReport>();

  const address = watch("location.address");
  const locationObj = watch("location");
  const { mutate, isPending } = useAddReports();
  const navigate = useNavigate();

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.warning("Your browser doesn't support location services.");
      setError("location", {
        type: "manual",
        message: "We need to capture your location",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearErrors("location");
        setValue("location", {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address,
        });
        toast.success("Location coordinates captured successfully.");
      },
      (error) => {
        setError("location", {
          type: "manual",
          message: error.message,
        });
        toast.error("Could not get your current location. Please try again.");
      }
    );
  };

  const submitFn: SubmitHandler<Omit<IncidentReport, "timestamp">> = ({
    id,
    title,
    regNumber,
    location,
    description,
    studentId,
  }) => {
    if (!isLoading && !currentUser) return;
    if (!location.lat || !location.lng) {
      setError("location", {
        type: "manual",
        message: "We need to capture your location",
      });
      toast.error("We have to capture your location");

      return;
    }

    studentId = currentUser?.id!;
    regNumber = currentUser?.user_metadata.regNumber;

    mutate(
      {
        id,
        title,
        regNumber: regNumber.toUpperCase(),
        location,
        description,
        status: "pending",
        studentId,
      },
      {
        onSuccess: () => {
          toast.success("Report has been submitted!");
          reset();
          navigate("/history");
        },
        onError: () => toast.error("We could not submit your report!"),
      }
    );
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
        <form onSubmit={handleSubmit(submitFn)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Incident Title *</Label>
            <Input
              {...register("title", {
                required: "Report has to include a title",
              })}
              id="title"
              placeholder="Brief description of the incident"
              className="w-full"
            />
            {errors.title && (
              <p className="mt-1 text-xs flex items-center gap-x-1 text-red-700">
                <HiInformationCircle />
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "You need to add a description to your report",
              })}
              placeholder="Provide detailed information about the security incident..."
              className="min-h-[120px] resize-none"
            />
            {errors.description && (
              <p className="mt-1 text-xs flex items-center gap-x-1 text-red-700">
                <HiInformationCircle />
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Location Address *</Label>
            <Input
              id="address"
              {...register("location.address", {
                validate: (value) =>
                  value.length > 3 ? true : "Enter a valid address",
              })}
              placeholder="Enter the location address"
              className="w-full"
            />
            {errors.location?.address && (
              <p className="mt-1 text-xs flex items-center gap-x-1 text-red-700">
                <HiInformationCircle />
                {errors.location?.address.message}
              </p>
            )}
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
                  className={`${errors.location ? "border border-red-500" : ""} flex-1 cursor-pointer`}>
                  {locationObj?.lat && locationObj?.lng
                    ? "Update Coordinates"
                    : "Capture Coordinates"}
                </Button>
                {locationObj?.lat && locationObj?.lng && (
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
            className="w-full text-white font-semibold rounded-md h-10 bg-primary text-center cursor-pointer"
            disabled={isPending}>
            {isPending ? <Spinner /> : "Submit Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default IncidentForm;
