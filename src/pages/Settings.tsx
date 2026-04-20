import { useState } from "react";
import { useTheme } from "next-themes";
import DashboardSidebar, { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { cn } from "@/lib/utils";
import {
  User,
  Shield,
  Bell,
  Palette,
  Trash2,
  Lock,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

const sections = [
  { id: "account", label: "Account", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "privacy", label: "Data & Privacy", icon: Lock },
];

const AccountSection = () => (
  <Card className="shadow-sm">
    <CardHeader>
      <CardTitle className="text-lg">Account Settings</CardTitle>
      <CardDescription>Manage your personal information</CardDescription>
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" defaultValue="Manyu" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" defaultValue="Sharma" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" defaultValue="manyu@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="manyu_sharma" />
      </div>
      <div className="flex items-center gap-4 pt-2">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <User className="h-7 w-7 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Profile Picture</p>
          <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB</p>
          <Button variant="outline" size="sm" className="mt-2">Upload Photo</Button>
        </div>
      </div>
      <Separator />
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </CardContent>
  </Card>
);

const SecuritySection = () => (
  <Card className="shadow-sm">
    <CardHeader>
      <CardTitle className="text-lg">Security</CardTitle>
      <CardDescription>Manage your password and security settings</CardDescription>
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input id="currentPassword" type="password" placeholder="........" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input id="newPassword" type="password" placeholder="........" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" placeholder="........" />
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
          <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
        </div>
        <Switch />
      </div>
      <Separator />
      <div className="flex justify-end">
        <Button>Update Password</Button>
      </div>
    </CardContent>
  </Card>
);

const NotificationsSection = () => (
  <Card className="shadow-sm">
    <CardHeader>
      <CardTitle className="text-lg">Notifications</CardTitle>
      <CardDescription>Choose how you want to be notified</CardDescription>
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Email Notifications</p>
            <p className="text-xs text-muted-foreground">Receive updates via email</p>
          </div>
        </div>
        <Switch defaultChecked />
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">In-App Notifications</p>
            <p className="text-xs text-muted-foreground">Show notifications in the app</p>
          </div>
        </div>
        <Switch defaultChecked />
      </div>
    </CardContent>
  </Card>
);

const AppearanceSection = () => {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Appearance</CardTitle>
        <CardDescription>Customize how the app looks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {dark ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-muted-foreground" />}
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Toggle the global application theme</p>
            </div>
          </div>
          <Switch checked={dark} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
        </div>
      </CardContent>
    </Card>
  );
};

const PrivacySection = ({ onDeleteRequest }: { onDeleteRequest: () => void }) => (
  <div className="space-y-6">
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Data & Privacy</CardTitle>
        <CardDescription>Manage your data and privacy preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Download Your Data</p>
            <p className="text-xs text-muted-foreground">Get a copy of all your data</p>
          </div>
          <Button variant="outline" size="sm">Download</Button>
        </div>
      </CardContent>
    </Card>

    <Card className="shadow-sm border-destructive/30">
      <CardHeader>
        <CardTitle className="text-lg text-destructive flex items-center gap-2">
          <Trash2 className="h-5 w-5" /> Danger Zone
        </CardTitle>
        <CardDescription>Irreversible actions require a final confirmation.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Delete Account</p>
            <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
          </div>
          <Button variant="destructive" size="sm" onClick={onDeleteRequest}>
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

const Settings = () => {
  const [active, setActive] = useState("account");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const renderContent = () => {
    switch (active) {
      case "account":
        return <AccountSection />;
      case "security":
        return <SecuritySection />;
      case "notifications":
        return <NotificationsSection />;
      case "appearance":
        return <AppearanceSection />;
      case "privacy":
        return <PrivacySection onDeleteRequest={() => setDeleteDialogOpen(true)} />;
      default:
        return null;
    }
  };

  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardTopbar />
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-3 md:py-4">
            <div className="flex flex-col md:flex-row gap-6 mt-1">
              <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible md:w-52 shrink-0">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActive(section.id)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                      active === section.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <section.icon className="h-4 w-4 shrink-0" />
                    {section.label}
                  </button>
                ))}
              </nav>

              <div className="flex-1 max-w-2xl">{renderContent()}</div>
            </div>
          </main>
        </div>
      </div>

      <ConfirmDeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={async () => Promise.resolve()}
        title="Delete Account"
        description="This is the second confirmation step. Hook this action to the backend delete endpoint when account deletion is enabled."
        itemName="your account"
      />
    </MobileSidebarProvider>
  );
};

export default Settings;
