import express from "express"

import { getPosts, createPost, getPost, deletePost, updatePost } from "../controller/post.js"

const router = express.Router()

router.get("/posts", getPosts)
router.post("/post", createPost)
router.get("/post/:id", getPost)
router.delete("/post/:id", deletePost)
router.patch("/post/:id", updatePost)


export default router