export type PostAuthor = {
  _id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
};

export type Post = {
  _id: string;
  author: PostAuthor;
  imageUrl: string;
  caption: string;
  likes: string[];
  createdAt: string;
  updated: string;
};
