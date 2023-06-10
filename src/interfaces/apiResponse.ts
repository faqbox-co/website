export default interface APIResponse {
  ok: boolean;
  description?: string;
  message?: string | { [key: string]: any };
}
