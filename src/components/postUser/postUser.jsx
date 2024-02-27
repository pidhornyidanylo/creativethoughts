import { getUser } from "@/lib/data";
import Image from "next/image";
import styles from "./postUser.module.css";

const getUserAPI = async (slug) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const PostUser = async ({ userId }) => {
  // const user = await getUserAPI(userId);
  const user = await getUser(userId);

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user.img ? user.img : "/noavatar.png"}
        alt=""
        width={50}
        height={50}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author </span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
