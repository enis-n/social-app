import { makeAutoObservable, runInAction } from "mobx";
import { Post } from "../models/post";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class PostStore {
    postRegistry = new Map<string, Post>();
    selectedPost: Post | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get postsByDate() {
        return Array.from(this.postRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadPosts = async () => {
        try {
            const posts = await agent.Posts.list();
            posts.forEach(post => {
                post.date = post.date.split('T')[0];
                this.postRegistry.set(post.id, post);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectPost = (id: string) => {
        this.selectedPost = this.postRegistry.get(id);
    }

    cancelSelectedPost = () => {
        this.selectedPost = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectPost(id) : this.cancelSelectedPost();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createPost = async (post: Post) => {
        this.loading = true;
        post.id = uuid();
        try {
            await agent.Posts.create(post);
            runInAction(() => {
                this.postRegistry.set(post.id, post);
                this.selectedPost = post;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updatePost = async (post: Post) => {
        this.loading = true;
        try {
            await agent.Posts.update(post);
            runInAction(() => {
                this.postRegistry.set(post.id, post);
                this.selectedPost = post;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deletePost = async (id: string) => {
        this.loading = true;
        try {
            await agent.Posts.delete(id);
            runInAction(() => {
                this.postRegistry.delete(id);
                if (this.selectedPost?.id === id) this.cancelSelectedPost();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}