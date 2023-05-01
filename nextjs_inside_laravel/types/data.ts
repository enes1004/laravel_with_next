

interface UserData extends Timestamps{
    id: number;
    email: string;
    name: string; 
    email_verified_at: string;
}

interface PostData extends Timestamps{
    id: number;
    content: string;
    title: string;
    user_id: number;
    user: UserData;
}