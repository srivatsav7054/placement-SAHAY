const footerLinks = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "GitHub", href: "#" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="container mx-auto flex flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <span className="font-heading text-lg font-bold text-foreground">
          Placement-Sahay
        </span>

        <div className="flex gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Placement-Sahay. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
