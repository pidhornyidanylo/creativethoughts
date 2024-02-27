import Link from "next/link";
import { auth } from "@/lib/auth";
import Links from "./links/Links";
import { handleGithubLogout } from "@/lib/action";
import styles from "./navbar.module.css";

const NavBar = async () => {
  const session = await auth();
  return (
    <nav className={styles.container}>
      <Link href="/">Logo</Link>
      <div>
        <Links handleGithubLogout={handleGithubLogout} session={session} />
      </div>
    </nav>
  );
};

export default NavBar;
