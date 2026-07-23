export type CommentAuthor = {
  _id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
};

export type Comment = {
  _id: string;
  author: CommentAuthor;
  post: string;
  text: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;
};
