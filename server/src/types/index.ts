export interface UserAndRequest extends Request {
  user: {
    id: number;
    email: string;
  };
}
