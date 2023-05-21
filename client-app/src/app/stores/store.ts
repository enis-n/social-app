import { createContext, useContext } from "react";
import PostStore from "./postStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
    postStore: PostStore;
    commonStore: CommonStore;
    userStore: UserStore
}

export const store: Store = {
    postStore: new PostStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}