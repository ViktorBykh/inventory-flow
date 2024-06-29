export const BASE_URL = "https://team-viktor-bykh-api-admin-5cc705e0.flowfuse.cloud";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: any = null
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
  }

  return fetch(BASE_URL + url, options).then((response) => {
    if (response.status === 409 || 403) {
      return response.json();
    }

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, "POST", data),
  put: <T>(url: string, data: any) => request<T>(url, "PUT", data),
  delete: (url: string) => request(url, "DELETE"),
};
