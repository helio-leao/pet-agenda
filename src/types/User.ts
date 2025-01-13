export default interface User {
  _id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  pictureUrl: string;
  verified: boolean;
  createdAt: string;
}
