export default interface APIResponse {
  ok: boolean;
  description?: string;
  message?: string | number | { [key: string]: any };
}
