import { apiClient } from "../../../shared/api/apiClient";

export async function getComments(postId: string) {
  const response = await apiClient.get(`/posts/${postId}/comments`);

  return response.data.comments;
}

export async function createComment(postId: string, text: string) {
  const response = await apiClient.post(`/posts/${postId}/comments`, {
    text,
  });

  return response.data.comment;
}

export async function toggleCommentLike(commentId: string) {
  const response = await apiClient.patch(`/comments/${commentId}/like`);

  return response.data;
}
