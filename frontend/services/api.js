// api.js
// const API_BASE = ""; <- this will be handled by proxy

async function request(endpoint, options = {}) {
  const response = await fetch(`${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // for cookies
  });

  if (!response.ok) {
    let errorMessage = "API Error";
    try {
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      }
    } catch (error) {
      // Ignore JSON parsing errors
    }
    throw new Error(errorMessage);
  }

  // Check if the response has a body
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return null; // Return null if there's no body
}
export function getUserProfile() {
  console.log("User fetch");
  return request("/api/auth/profile");
}

export function getMyPosts(page) {
  return request(`/api/posts/getposts/dashboard?page=${page}`);
}

export function getPosts(page) {
  return request(`/api/posts/getposts?page=${page}`);
}

export function createPost(data) {
  return request("/api/posts/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function signIn(formData) {
  return request("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}

export function signUp(formData) {
  return request("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}
