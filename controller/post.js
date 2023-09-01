import mongoose from "mongoose"
import { Schema, model } from "mongoose"

mongoose.connect("mongodb+srv://dominik-blog:testblog@mybloggie.r7m5ydd.mongodb.net/postDB")

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    upperCase: true,
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: Date
})

const Post = model("Post", postSchema)

const post1 = new Post({
  title: "Something new",
  content: "Just Testing it here",
  author: "Dom",
  date: new Date().toLocaleString()
})

const post2 = new Post({
  title: "welcome",
  content: "welcome to our blog",
  author: "Dom2",
  date: new Date().toLocaleString()
})

const post3 = new Post({
  title: "Tour round it",
  content: "Post many post",
  author: "Dom3",
  date: new Date().toLocaleString()
})

const defaultPost = [post1, post2, post3]


export const getPosts = async (req, res) => {
  try {
    const response = await Post.find({})

    if (response.length === 0) {
      try {
        await Post.insertMany(defaultPost)
        console.log("Added success")
      } catch (error) {
        console.log("an error occurred", error.message)
      }
      res.redirect("/")
    }else{
      res.send(response)
    }
    console.log(response)
  } catch (error) {
    console.log("could not fetch", error)
  }
}

export const createPost = async (req, res) => {
  const newPost = new Post(
    {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: new Date().toLocaleString()
    }
  ) 

  try {
    await newPost.save()
    res.send("Post added Successfully")
  } catch (error) {
    console.log(error.message)
  }
}

export const getPost = async (req, res) => {
  const id = req.params.id
  try {
    const singlePost = await Post.find({_id: id})
    res.send(singlePost)
  } catch (error) {
    console.log("could not find") 
  }
}

export const deletePost = async (req, res) => {
  const id = req.params.id

  try {
    await Post.deleteOne({_id: id})
    res.send("Post Deleted Successfuly")
  } catch (error) {
    console.log("Couldn't Delete")
  }
}

export const updatePost = async (req, res) => {
  const id = req.params.id
  const existingPost = Post.find({_id: id})

  const updated = {
    title: req.body.title || existingPost.title,
    content: req.body.content || existingPost.content,
    author: req.body.author || existingPost.author,
    date: new Date().toLocaleString()
  }

  try {
    await Post.updateOne({_id: id}, {title: updated.title, content: updated.content, author: updated.author, date: updated.date})
    res.send("Post Updated Successfully")
  } catch (error) {
    console.log("could not update")
  }

}