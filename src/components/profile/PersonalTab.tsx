import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { updateUserProfile } from "@/services/userService";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import SectionCard from "./SectionCard";

const GUEST_USER_ID = "guest-user";

const PersonalTab = () => {
  const { data: userProfile, refetch } = useUserProfile();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    summary: "",
  });

  useEffect(() => {
    if (userProfile) {
      setForm({
        fullName: `${userProfile.firstName || ""} ${userProfile.lastName || ""}`.trim(),
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        location: userProfile.location || "",
        portfolio: userProfile.profileLinks?.find(l => l.label.toLowerCase() === "portfolio")?.url || "",
        summary: userProfile.bio || "",
      });
    }
  }, [userProfile]);

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSave = async () => {
    try {
      const parts = form.fullName.trim().split(" ");
      const firstName = parts[0] || "";
      const lastName = parts.slice(1).join(" ");
      
      console.log("Saving profile for user:", GUEST_USER_ID, "Data:", form);
      const updatedUser = await updateUserProfile(GUEST_USER_ID, {
        firstName,
        lastName,
        phone: form.phone,
        location: form.location,
        bio: form.summary,
      });
      console.log("Save successful. Backend returned:", updatedUser);
      toast.success("Profile saved successfully");
      await refetch();
    } catch (error: any) {
      console.error("Save failed:", error);
      toast.error(error?.message || "Failed to save profile");
    }
  };

  return (
    <SectionCard icon={User} title="Personal Information" subtitle="Your basic contact info and professional summary.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Full Name</Label>
          <Input placeholder="John Doe" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email Address</Label>
          <Input placeholder="john@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> Phone Number</Label>
          <Input placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Location</Label>
          <Input placeholder="New York, NY" value={form.location} onChange={(e) => update("location", e.target.value)} />
        </div>
      </div>
      <div className="space-y-2 mt-5">
        <Label className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> Portfolio / Website</Label>
        <Input placeholder="https://johndoe.com" value={form.portfolio} onChange={(e) => update("portfolio", e.target.value)} />
      </div>
      <div className="space-y-2 mt-5">
        <Label className="font-semibold text-primary">Professional Summary</Label>
        <Textarea
          placeholder="Highly motivated software engineer with 5+ years of experience..."
          className="min-h-[120px]"
          value={form.summary}
          onChange={(e) => update("summary", e.target.value)}
        />
      </div>
      <div className="flex justify-end mt-6">
        <Button className="gap-1.5" onClick={handleSave}>
          <Save className="h-4 w-4" /> Save Profile
        </Button>
      </div>
    </SectionCard>
  );
};

export default PersonalTab;
