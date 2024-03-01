"use server"

import {
    connectToDb
} from "./utils";
import {
    Post,
    User
} from "./models";
import {
    revalidatePath
} from "next/cache";
import {
    signIn,
    signOut
} from "./auth";
import bcrypt from 'bcryptjs';

export const addPost = async (formData) => {
    const {
        title,
        desc,
        slug,
        userId,
        img
    } = Object.fromEntries(formData);

    try {
        connectToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
            img
        })
        await newPost.save();
        console.log("saved to db")
        revalidatePath("/blog")
        revalidatePath("/admin")
    } catch (error) {
        throw new Error(error);
    }

    // console.log(title, desc, slug, userId)
}

export const addUser = async (formData) => {
    const {
        username,
        email,
        password,
        img
    } = Object.fromEntries(formData);

    try {
        connectToDb();
        const newUser = new User({
            username,
            email,
            password,
            img,
        });

        await newUser.save();
        console.log("saved to db");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return {
            error: "Something went wrong!"
        };
    }
}

export const deletePost = async (formData) => {
    // "use server"
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

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDb();
  
      await Post.deleteMany({ userId: id });
      await User.findByIdAndDelete(id);
      console.log("deleted from db");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

export const handleGithubLogin = async () => {
    // "use server";
    await signIn("github");
};

export const handleGithubLogout = async () => {
    // "use server";
    await signOut();
};

export const register = async (formData) => {
    const {
        username,
        email,
        password,
        img,
        passwordRepeat
    } =
    Object.fromEntries(formData);

    if (password !== passwordRepeat) {
        return {
            error: "Passwords do not match"
        };
    }

    try {
        connectToDb();

        const user = await User.findOne({
            username
        });

        if (user) {
            return {
                error: "Username already exists"
            };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });

        await newUser.save();
        console.log("saved to db");

        return {
            success: true
        };
    } catch (err) {
        console.log(err);
        return {
            error: "Something went wrong!"
        };
    }
};

export const loginWithCreds = async (formData) => {
    console.log(formData);
    const {
        username,
        password
    } = Object.fromEntries(formData);
    console.log(username, password);
    if (!username || !password) {
        throw new Error("Username or password is missing");
    }

    try {
        await signIn("credentials", {
            username,
            password
        });
    } catch (err) {
        console.log(err);

        if (err.message.includes("CredentialsSignin")) {
            return {
                error: "Invalid username or password"
            };
        }
        throw err;
    }
};