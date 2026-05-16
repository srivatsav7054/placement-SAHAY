import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Community", href: "#community" },
];

interface NavbarProps {
  onOpenLogin?: () => void;
  onOpenSignup?: () => void;
}

const Navbar = ({ onOpenLogin, onOpenSignup }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href ?? "#features");

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);

    if (element instanceof HTMLElement) {
      setActiveHref(href);
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const sections = navLinks
      .map((link) => {
        const element = document.querySelector(link.href);
        return element instanceof HTMLElement ? { href: link.href, element } : null;
      })
      .filter((item): item is { href: string; element: HTMLElement } => item !== null);

    if (!sections.length) {
      return;
    }

    const updateActiveSection = () => {
      const probeY = window.scrollY + 120;
      let current = sections[0]?.href ?? "#features";

      for (const section of sections) {
        if (probeY >= section.element.offsetTop) {
          current = section.href;
        }
      }

      setActiveHref(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="font-heading text-xl font-bold text-foreground">
          Placement-Sahay
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                activeHref === link.href
                  ? "bg-primary/12 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
          <>
            <Button asChild variant="ghost" size="sm">
              <Link to="/dashboard">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-border bg-background px-6 pb-6 md:hidden"
        >
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`w-fit rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                  activeHref === link.href
                    ? "bg-primary/12 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  scrollToSection(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
            <>
              <Button asChild variant="ghost" size="sm" className="w-fit">
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>Login</Link>
              </Button>
              <Button asChild size="sm" className="w-fit">
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>Get Started</Link>
              </Button>
            </>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
