import { createContext, useContext } from "react";
import PostStore from "./postStore";
import JobStore from "./jobStore";

interface Store {
    postStore: PostStore,
    jobStore: JobStore,
}

export const store: Store = {
    postStore: new PostStore(),
    jobStore: new JobStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}