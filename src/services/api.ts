const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) || "http://localhost:5000/api";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  details?: unknown;
}

type RequestOptions = RequestInit & {
  fallbackMessage?: string;
};

export class ApiClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiClientError";
  }
}

export const apiRequest = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok || !payload?.success) {
    throw new ApiClientError(
      payload?.message || options.fallbackMessage || `Request failed for ${endpoint}`
    );
  }

  return payload.data;
};

export const formatApiDate = (value?: string | null) => {
  if (!value) return "Just now";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
