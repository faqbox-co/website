export default interface IToken {
  username?: string;
  name?: string;
  email?: string;
  picture?: string;
  sub: string;
  iat: number;
  exp: number;
  jti: string;
}
