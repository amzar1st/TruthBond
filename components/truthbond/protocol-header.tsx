"use client";

import { Menu, Plus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Brand } from "./logo";
import { WalletButton } from "./wallet-button";

const links = [
  { href: "/", label: "Explore" },
  { href: "/profile", label: "Reputation" },
];

export function ProtocolHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={path === link.href ? "nav-link active" : "nav-link"}
            >
              {link.label}
            </Link>
          ))}
          <span className="nav-divider" />
          <span className="chain-chip">
            <span /> Studionet
          </span>
        </nav>
        <div className="header-actions">
          <Link href="/create" className="button button-ghost button-small create-header">
            <Plus size={16} /> Create claim
          </Link>
          <WalletButton />
          <button
            className="mobile-menu-button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/create" onClick={() => setOpen(false)}>
            Create claim
          </Link>
        </nav>
      )}
    </header>
  );
}
