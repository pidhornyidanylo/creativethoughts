// "use server" - can be used just here (in one place yoooo) 

import {
    connectToDb
} from "./utils";
import {
    Post
} from "./models";
import {
    revalidatePath
} from "next/cache";
import {
    signIn,
    signOut
} from "./auth";

export const addPost = async (formData) => {
    "use server"
    const {
        title,
        desc,
        slug,
        userId
    } = Object.fromEntries(formData);

    try {
        connectToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        })
        await newPost.save();
        console.log("saved to db")
    } catch (error) {
        throw new Error(error);
    }

    console.log(title, desc, slug, userId)
}

export const deletePost = async (formData) => {
    "use server"
    const {
        id
    } = Object.fromEntries(formData);

    try {
        connectToDb();
        await Post.findByIdAndDelete(id);
        console.log("deleted from db")
        revalidatePath("/blog");
    } catch (error) {
        throw new Error(error);
    }
}

export const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
};

export const handleGithubLogout = async () => {
    "use server";
    await signOut();
};