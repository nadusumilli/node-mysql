import { Request, Response } from 'express';

export const fetchAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = {}; //await Post.find();
        res.status(200).json(posts);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const createPost = async (req: Request, res: Response) => {
    const post = req.body;
    const newPost = {}; //new Post(post);
    try {
        // await newPost.save();
        res.status(201).json(newPost);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
};
export const updatePost = async (req: Request, res: Response) => {
    const { id: _id } = req.params;
    const post = req.body;
    // if (!mongoose.Types.ObjectId.isValid(_id)) {
    //     return res.status(404).send('No post with that id');
    // }
    const updatedPost = {}; //await Post.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
    const { id: _id } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(_id)) {
    //     return res.status(404).send('No post with that id');
    // }
    // await Post.findByIdAndRemove(_id);
    res.json({ message: 'Post deleted successfully' });
};

export default { fetchAllPosts, createPost, updatePost, deletePost };
