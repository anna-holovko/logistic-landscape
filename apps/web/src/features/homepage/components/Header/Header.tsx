"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

interface HeaderProps {
  menuItems?: Array<{ label: string; href?: string }>;
}

const defaultMenuItems = [
  { label: "Company", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Newsletter", href: "/#newsletter" },
];

export function Header({ menuItems = defaultMenuItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoGroup}>
          <div className={styles.logoIcon}>
            <Image
              src="/assets/preview/frame-83.svg"
              alt="Logo"
              width={24}
              height={24}
              priority
            />
          </div>
          <Image
            src="/assets/preview/logistic-landscape.svg"
            alt="Logistic Landscape"
            width={173}
            height={20}
          />
        </Link>

        {/* Desktop Menu */}
        <nav className={styles.menu}>
          {menuItems.map((item, index) => {
            const href = item.href || "/";
            return (
              <Link key={index} href={href} className={styles.menuItem}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile/Tablet Burger Menu */}
        <div className={styles.menuWrapper}>
          <button
            className={`${styles.burgerButton} ${isMenuOpen ? styles.active : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          {isMenuOpen && (
            <nav className={styles.dropdown}>
              {menuItems.map((item, index) => {
                const href = item.href || "/";
                return (
                  <Link
                    key={index}
                    href={href}
                    className={styles.dropdownItem}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
