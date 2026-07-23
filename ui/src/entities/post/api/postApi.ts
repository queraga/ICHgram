import { apiClient } from "../../../shared/api/apiClient.ts";
import type { Post } from "../model/types.ts";

type GetPostsResponse = {
  posts: Post[];
};

export const getPosts = async () => {
  const response = await apiClient.get<GetPostsResponse>("/posts");

  return response.data.posts;
};

export async function toggleLike(postId: string) {
  const response = await apiClient.patch(`/posts/${postId}/like`);

  return response.data;
}

export async function createPost(file: File, caption: string) {
  const formData = new FormData();

  formData.append("image", file);
  formData.append("caption", caption);

  const response = await apiClient.post("/posts", formData);

  return response.data;
}

export async function deletePost(postId: string) {
  const response = await apiClient.delete(`/posts/${postId}`);

  return response.data;
}

export async function updatePost(postId: string, caption: string) {
  const response = await apiClient.patch(`/posts/${postId}`, {
    caption,
  });

  return response.data;
}

export async function getFeedPosts() {
  const response = await apiClient.get("/posts/feed");

  return response.data.posts;
}
