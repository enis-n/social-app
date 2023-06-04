import { Profile } from "./profile";

export interface Post {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    venue: string;
    hostUsername: string;
    isCancelled?: boolean;
    isGoing: boolean;
    isHost: boolean;
    host?: Profile;
    attendees: Profile[];
}

export class PostFormValues {
    id?: string = undefined;
    title: string = '';

}
