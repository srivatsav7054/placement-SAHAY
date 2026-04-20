import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Globe, Github, Linkedin, Code2, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import SectionCard from "./SectionCard";

const DEMO_USER_ID = "demo-user-123";

const PersonalTab = () => {
  const { user: clerkUser } = useUser();
  const userId = clerkUser?.id || DEMO_USER_ID;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    linkedin: "",
    github: "",
    leetcode: "",
    codechef: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await api.getUser(userId);
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          portfolio: data.socialLinks?.portfolio || "",
          linkedin: data.socialLinks?.linkedin || "",
          github: data.socialLinks?.github || "",
          leetcode: data.socialLinks?.leetcode || "",
          codechef: data.socialLinks?.codechef || "",
          bio: data.bio || "",
        });
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateUser(userId, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        location: form.location,
        bio: form.bio,
        socialLinks: {
          portfolio: form.portfolio,
          linkedin: form.linkedin,
          github: form.github,
          leetcode: form.leetcode,
          codechef: form.codechef,
        },
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SectionCard icon={User} title="Personal Information" subtitle="Your basic contact info and professional summary.">
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary/30" />
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard icon={User} title="Personal Information" subtitle="Your basic contact info and professional summary.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Full Name</Label>
          <Input placeholder="John Doe" value={form.name} onChange={(e) => update("name", e.target.value)} />
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</Label>
          <Input placeholder="https://linkedin.com/in/johndoe" value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5"><Github className="h-3.5 w-3.5" /> GitHub</Label>
          <Input placeholder="https://github.com/johndoe" value={form.github} onChange={(e) => update("github", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5"><Code2 className="h-3.5 w-3.5" /> LeetCode</Label>
          <Input placeholder="https://leetcode.com/johndoe" value={form.leetcode} onChange={(e) => update("leetcode", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5"><Code2 className="h-3.5 w-3.5" /> CodeChef</Label>
          <Input placeholder="https://codechef.com/users/johndoe" value={form.codechef} onChange={(e) => update("codechef", e.target.value)} />
        </div>
      </div>
      <div className="space-y-2 mt-5">
        <Label className="font-semibold text-primary">Professional Summary</Label>
        <Textarea
          placeholder="Highly motivated software engineer with 5+ years of experience..."
          className="min-h-[120px]"
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
        />
      </div>
      <div className="flex justify-end mt-6">
        <Button className="gap-1.5" onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Profile
        </Button>
      </div>
    </SectionCard>
  );
};

export default PersonalTab;
