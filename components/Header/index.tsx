"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.scss";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/products", label: "Товары" },
  { href: "/sell", label: "Продать" },
  { href: "/dashboard", label: "Кабинет" },
];

function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Holy<span className={styles.logoAccent}>Junk</span>
      </Link>
      <nav className={styles.nav}>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.navLink} ${pathname === href ? styles.active : ""}`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
