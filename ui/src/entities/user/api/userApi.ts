import { apiClient } from "../../../shared/api/apiClient";

export async function getMe() {
  const response = await apiClient.get("/users/me");
  return response.data.user;
}

export async function getMyPosts() {
  const response = await apiClient.get("/users/me/posts");
  return response.data.posts;
}

export async function searchUsers(query: string) {
  const response = await apiClient.get(`/users/search?q=${query}`);
  return response.data.users;
}

export async function getUserById(userId: string) {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
}

export async function getUserPosts(userId: string) {
  const response = await apiClient.get(`/users/${userId}/posts`);
  return response.data.posts;
}
