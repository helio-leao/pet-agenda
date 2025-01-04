export default interface Session {
  user: {
    _id: string;
  };
  accessToken: string;
  refreshToken: string;
}
