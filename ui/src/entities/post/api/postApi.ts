import { apiClient } from "../../../shared/api/apiClient.ts";
import type { Post } from "../model/types.ts";

type GetPostsResponse = {
  posts: Post[];
};

export const getPosts = async () => {
  const response = await apiClient.get<GetPostsResponse>("/posts");

  return response.data.posts;
};
