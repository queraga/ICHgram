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

export async function toggleFollow(userId: string) {
  const response = await apiClient.patch(`/users/${userId}/follow`);
  return response.data;
}

type UpdateProfileData = {
  fullName: string;
  username: string;
  bio: string;
  website: string;
};

export async function updateProfile(data: UpdateProfileData) {
  const response = await apiClient.patch("/users/me", data);
  return response.data.user;
}

export async function updateAvatar(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);

  await apiClient.patch("/users/me/avatar", formData);
}
