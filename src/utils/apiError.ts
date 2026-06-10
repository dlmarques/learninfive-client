import { isAxiosError } from "axios";

export type ApiErrorCode =
  | "AUTH_TOKEN_MISSING"
  | "AUTH_TOKEN_INVALID"
  | "USER_NOT_FOUND"
  | "TOPIC_NOT_FOUND"
  | "USER_ALREADY_EXISTS"
  | "TOPIC_GENERATION_IN_PROGRESS"
  | string;

export type ApiError = {
  statusCode?: number;
  code?: ApiErrorCode;
  message?: string | string[];
};

export const getApiError = (error: unknown): ApiError => {
  if (isAxiosError<ApiError>(error)) {
    const responseData = error.response?.data;

    return {
      statusCode:
        responseData?.statusCode ?? error.response?.status ?? error.status,
      code: responseData?.code,
      message: responseData?.message ?? error.message,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  if (typeof error !== "object" || error === null) {
    return {};
  }

  const maybeApiError = error as {
    status?: number;
    response?: {
      status?: number;
      data?: ApiError;
    };
  };
  const responseData = maybeApiError.response?.data;

  return {
    statusCode:
      responseData?.statusCode ??
      maybeApiError.response?.status ??
      maybeApiError.status,
    code: responseData?.code,
    message: responseData?.message,
  };
};
