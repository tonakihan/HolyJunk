"use client";

import styles from "./Footer.module.scss";
import Image from "next/image";
import { version } from "@/package.json";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; 2026 HolyJunk · Сделано с{" "}
        <Image
          width={16}
          height={16}
          src="Heart.svg"
          unoptimized
          alt="love"
        ></Image>
        {" от "}
        <a
          className={styles.link}
          target="_blank"
          href="https://github.com/tonakihan"
        >
          tonakihan
        </a>
      </p>
      <p>{(version && `v${version}`) || `Unknown`} · BETA</p>
    </footer>
  );
}

export default Footer;
