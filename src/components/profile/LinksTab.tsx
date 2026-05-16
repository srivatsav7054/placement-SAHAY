import { useState, useEffect } from "react";
import { Link2, Pencil, Trash2, Check, X, Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionCard from "./SectionCard";
import { apiRequest } from "@/services/api";

interface ProfileLink {
  _id?: string;
  label: string;
  url: string;
}

const SUGGESTED_LABELS = [
  "GitHub",
  "LinkedIn",
  "Portfolio",
  "LeetCode",
  "HackerRank",
  "Kaggle",
  "Devfolio",
  "Blog",
  "Twitter / X",
  "YouTube",
];

const getLinkIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("github")) return "https://github.com/favicon.ico";
  if (l.includes("linkedin")) return "https://www.linkedin.com/favicon.ico";
  if (l.includes("leetcode")) return "https://leetcode.com/favicon.ico";
  if (l.includes("hackerrank")) return "https://www.hackerrank.com/favicon.ico";
  if (l.includes("kaggle")) return "https://www.kaggle.com/favicon.ico";
  if (l.includes("devfolio")) return "https://devfolio.co/favicon.ico";
  if (l.includes("twitter") || l.includes(" x")) return "https://twitter.com/favicon.ico";
  if (l.includes("youtube")) return "https://www.youtube.com/favicon.ico";
  return null;
};

const LinkRow = ({
  link,
  onEdit,
  onDelete,
}: {
  link: ProfileLink;
  onEdit: (link: ProfileLink) => void;
  onDelete: (id: string | undefined) => void;
}) => {
  const icon = getLinkIcon(link.label);
  const displayUrl = link.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card/60 hover:bg-card transition-colors group">
      {/* Icon / Initials */}
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
        {icon ? (
          <img
            src={icon}
            alt={link.label}
            className="w-5 h-5 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <span className="text-primary font-bold text-xs uppercase">
            {link.label.slice(0, 2)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{link.label}</p>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground truncate hover:text-primary transition-colors flex items-center gap-1"
        >
          {displayUrl}
          <ExternalLink className="h-3 w-3 flex-shrink-0" />
        </a>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(link)}
          title="Edit"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => onDelete(link._id)}
          title="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

const LinkForm = ({
  initial,
  onSave,
  onCancel,
}: {
  initial?: ProfileLink;
  onSave: (label: string, url: string) => void;
  onCancel: () => void;
}) => {
  const [label, setLabel] = useState(initial?.label ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = SUGGESTED_LABELS.filter((s) =>
    s.toLowerCase().includes(label.toLowerCase())
  );

  const handleSubmit = () => {
    const trimLabel = label.trim();
    const trimUrl = url.trim();
    if (!trimLabel || !trimUrl) return;
    const finalUrl =
      trimUrl.startsWith("http://") || trimUrl.startsWith("https://")
        ? trimUrl
        : `https://${trimUrl}`;
    onSave(trimLabel, finalUrl);
  };

  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-4">
      <p className="text-sm font-semibold text-foreground">
        {initial ? "Edit Link" : "Add New Link"}
      </p>

      {/* Label Field */}
      <div className="space-y-1.5 relative">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Platform / Label
        </Label>
        <Input
          placeholder="e.g. GitHub, Portfolio, Blog, HackerRank…"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          autoComplete="off"
          className="bg-background"
        />
        {showSuggestions && label && filteredSuggestions.length > 0 && (
          <div className="absolute z-20 top-full mt-1 w-full rounded-lg border border-border bg-popover shadow-lg overflow-hidden">
            {filteredSuggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="w-full text-left text-sm px-3 py-2 hover:bg-muted transition-colors"
                onMouseDown={() => {
                  setLabel(s);
                  setShowSuggestions(false);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* URL Field */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Profile URL
        </Label>
        <Input
          placeholder="https://github.com/username"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-background"
          type="url"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-1">
        <Button variant="outline" size="sm" onClick={onCancel} className="gap-1.5">
          <X className="h-3.5 w-3.5" /> Cancel
        </Button>
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={!label.trim() || !url.trim()}
          className="gap-1.5"
        >
          <Check className="h-3.5 w-3.5" /> {initial ? "Update" : "Add Link"}
        </Button>
      </div>
    </div>
  );
};

const GUEST_USER_ID = "guest-user";

const LinksTab = () => {
  const [links, setLinks] = useState<ProfileLink[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState<ProfileLink | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiRequest(`/users/by-clerk-id/${GUEST_USER_ID}`, {
          method: "GET",
        });
        if (response.profileLinks && Array.isArray(response.profileLinks)) {
          setLinks(response.profileLinks);
        }
      } catch (err) {
        console.error("Failed to fetch links:", err);
        setError("Failed to load links");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const saveLinks = async (updatedLinks: ProfileLink[]) => {
    try {
      setError(null);
      const response = await apiRequest(`/users/by-clerk-id/${GUEST_USER_ID}`, {
        method: "PUT",
        body: JSON.stringify({ profileLinks: updatedLinks }),
      });

      if (response.profileLinks) {
        setLinks(response.profileLinks);
      } else {
        setLinks(updatedLinks);
      }
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save links. Please try again.");
    }
  };

  const handleAdd = (label: string, url: string) => {
    const newLink = { label, url };
    const updatedLinks = [...links, newLink];
    saveLinks(updatedLinks);
    setShowForm(false);
  };

  const handleUpdate = (label: string, url: string) => {
    if (!editingLink) return;
    const updatedLinks = links.map((l) =>
      l._id === editingLink._id ? { ...l, label, url } : l
    );
    saveLinks(updatedLinks);
    setEditingLink(null);
  };

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    const updatedLinks = links.filter((l) => l._id !== id);
    saveLinks(updatedLinks);
  };

  const handleEditStart = (link: ProfileLink) => {
    setEditingLink(link);
    setShowForm(false);
  };

  return (
    <SectionCard
      icon={Link2}
      title="Links & Profiles"
      subtitle="Add all your professional profiles, portfolios, and social links."
      onAdd={
        !showForm && !editingLink && !isLoading
          ? () => {
              setShowForm(true);
              setEditingLink(null);
            }
          : undefined
      }
      addLabel="Add New Link"
    >
      <div className="space-y-3">
        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">Loading links...</div>
          </div>
        )}

        {/* Existing Links */}
        {!isLoading && links.length === 0 && !showForm ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <Link2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">No links added yet</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                Add your GitHub, LinkedIn, Portfolio, and more
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setShowForm(true)}
            >
              <Plus className="h-4 w-4" /> Add your first link
            </Button>
          </div>
        ) : (
          !isLoading && links.map((link) =>
            editingLink?._id === link._id ? (
              <LinkForm
                key={link._id}
                initial={editingLink}
                onSave={handleUpdate}
                onCancel={() => setEditingLink(null)}
              />
            ) : (
              <LinkRow
                key={link._id}
                link={link}
                onEdit={handleEditStart}
                onDelete={handleDelete}
              />
            )
          )
        )}

        {/* Add Form */}
        {showForm && (
          <LinkForm
            onSave={handleAdd}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Add More button when there are links but no form open */}
        {!isLoading && links.length > 0 && !showForm && !editingLink && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <Plus className="h-4 w-4" /> Add another link
          </button>
        )}
      </div>
    </SectionCard>
  );
};

export default LinksTab;

