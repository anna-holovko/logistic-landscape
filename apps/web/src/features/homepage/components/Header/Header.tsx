"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";

interface HeaderProps {
  menuItems?: string[];
}

export function Header({ menuItems = ["Company", "dfsf", "Company"] }: HeaderProps) {
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
        <div className={styles.logoGroup}>
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
        </div>

        {/* Desktop Menu */}
        <nav className={styles.menu}>
          {menuItems.map((item, index) => (
            <div key={index} className={styles.menuItem}>
              {item}
            </div>
          ))}
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
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className={styles.dropdownItem}
                  onClick={closeMenu}
                >
                  {item}
                </div>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
