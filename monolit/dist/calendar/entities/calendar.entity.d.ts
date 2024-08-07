export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    permission: number;
    events: Event[];
}
export declare class Event {
    id: number;
    title: string;
    start: Date;
    end_time: Date;
    description?: string;
    viewer_id?: number;
    user: User;
}
