type SuccessResponse<C = any> = {
  ok: true;
  message: C;
};

type ErrorResponse<C = any> = {
  ok: false;
  description: C;
};

type APIResponse<C = any> = SuccessResponse<C> | ErrorResponse<C>;

export default APIResponse;
