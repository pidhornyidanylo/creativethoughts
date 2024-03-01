"use client"

import { addPost } from "@/lib/action";
import styles from "./adminpostform.module.css"


const AdminPostForm = ({userId}) => {
  
  return (
    <form action={addPost} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="slug" placeholder="slug" />
      <input type="text" name="img" placeholder="img" />
      <textarea type="text" name="desc" placeholder="desc" rows={10} />
      <button>Add</button>
    </form>
  );
};

export default AdminPostForm;