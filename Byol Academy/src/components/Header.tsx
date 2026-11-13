"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { brand, copy, navigation, platforms } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { AnnouncementBar } from "./AnnouncementBar";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme === "dark");
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        const openPlatformMenu = document.querySelector<HTMLDetailsElement>(".platform-menu[open]");
        if (openPlatformMenu) {
          openPlatformMenu.open = false;
          openPlatformMenu.querySelector<HTMLElement>("summary")?.focus();
        }
        if (menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("byol-theme", nextTheme);
    setIsDark(nextTheme === "dark");
  }

  return (
    <>
      <AnnouncementBar />
      <header className="site-header">
        <div className="site-header__inner shell">
          <Link
            className="brand"
            href="/"
            aria-label={`${brand.name} home`}
            onClick={closeMenu}
          >
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              width={brand.logoWidth}
              height={brand.logoHeight}
              priority
            />
          </Link>
          <button
            className="menu-toggle"
            ref={menuButton}
            aria-label={menuOpen ? copy.navigation.closeMenu : copy.navigation.openMenu}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
          <nav
            className={`primary-nav${menuOpen ? " primary-nav--open" : ""}`}
            id="primary-navigation"
            aria-label="Primary navigation"
          >
            <ul className="primary-nav__list">
              {navigation.map((item) => item.id === "platforms" ? (
                <li key={item.id}>
                  <details className="platform-menu">
                    <summary>{item.label}</summary>
                    <div className="platform-menu__dropdown">
                      {platforms.map((platform) => (
                        <a
                          href={platform.href}
                          key={platform.id}
                          rel="noopener noreferrer"
                          onClick={() => {
                            trackEvent("nav_click", { item: platform.id });
                            closeMenu();
                          }}
                        >
                          {platform.name}
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </details>
                </li>
              ) : (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      trackEvent("nav_click", { item: item.id });
                      closeMenu();
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              className="button button--nav"
              href="/contact?intent=institution"
              onClick={() => {
                trackEvent("cta_click", { id: "header_demo" });
                closeMenu();
              }}
            >
              {copy.navigation.requestDemo}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </nav>
          <button
            className="theme-toggle"
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
            onClick={toggleTheme}
          >
            {isDark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>
        </div>
      </header>
    </>
  );
}
