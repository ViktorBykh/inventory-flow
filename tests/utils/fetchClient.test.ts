import { BASE_URL, client } from "../../src/utils/fetchClient";

const mockFetch = jest.fn();

jest.spyOn(global, "fetch").mockImplementation(mockFetch);

afterEach(() => {
  jest.clearAllMocks();
});

describe("fetchClient", () => {
  it("should send a GET request", async () => {
    const mockResponse = { data: "mock data" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await client.get("/test");
    expect(fetch).toHaveBeenCalledWith(BASE_URL + "/test", { method: "GET" });
    expect(response).toEqual(mockResponse);
  });

  it("should send a POST request", async () => {
    const requestData = { name: "Test Product" };
    const mockResponse = { id: "1", ...requestData };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await client.post("/products", requestData);
    expect(fetch).toHaveBeenCalledWith(BASE_URL + "/products", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    expect(response).toEqual(mockResponse);
  });

  it("should send a PUT request", async () => {
    const requestData = { id: "1", name: "Updated Product" };
    const mockResponse = { ...requestData, updatedAt: "2023-06-15" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await client.put("/products/1", requestData);
    expect(fetch).toHaveBeenCalledWith(BASE_URL + "/products/1", {
      method: "PUT",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    expect(response).toEqual(mockResponse);
  });

  it("should send a DELETE request", async () => {
    const mockResponse = { message: "Product deleted successfully" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await client.delete("/products/1");
    expect(fetch).toHaveBeenCalledWith(BASE_URL + "/products/1", {
      method: "DELETE",
    });
    expect(response).toEqual(mockResponse);
  });

  it("should handle error responses", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(client.get("/nonexistent")).rejects.toThrow();
    expect(fetch).toHaveBeenCalledWith(BASE_URL + "/nonexistent", {
      method: "GET",
    });
  });
});
