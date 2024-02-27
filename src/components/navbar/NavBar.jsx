import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.container}>
      <Link href="/">Logo</Link>
      <div>
        <Links />
      </div>
    </nav>
  );
};

export default NavBar;
