import { useState } from "react";
import { User, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import SectionCard from "./SectionCard";

const PersonalTab = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    summary: "",
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

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
        <Button className="gap-1.5">
          <Save className="h-4 w-4" /> Save Profile
        </Button>
      </div>
    </SectionCard>
  );
};

export default PersonalTab;
