import { makeAutoObservable, runInAction } from "mobx";
import { Post } from "../models/post";
import agent from "../api/agent";

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

    get groupedPosts() {
        return Object.entries(
            this.postsByDate.reduce((posts, post) => {
                const date = post.date;
                posts[date] = posts[date] ? [...posts[date], post] : [post]
                return posts;
            }, {} as { [key: string]: Post[] })
        )
    }


    loadPosts = async () => {
        this.loadingInitial = true;
        try {
            const posts = await agent.Posts.list();
            posts.forEach(post => {
                this.setPost(post);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadPost = async (id: string) => {
        let post = this.getPost(id);
        if (post) {
            this.selectedPost = post;
            return post;
        } else {
            this.loadingInitial = true;
            try {
                post = await agent.Posts.details(id);
                this.setPost(post);
                runInAction(() => {
                    this.selectedPost = post;
                })
                this.setLoadingInitial(false);
                return post;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setPost = (post: Post) => {
        post.date = post.date.split('T')[0];
        this.postRegistry.set(post.id, post);
    }

    private getPost = (id: string) => {
        return this.postRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createPost = async (post: Post) => {
        this.loading = true;
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