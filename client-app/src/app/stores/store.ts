import { createContext, useContext } from "react";
import PostStore from "./postStore";

interface Store {
    postStore: PostStore
}

export const store: Store = {
    postStore: new PostStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}