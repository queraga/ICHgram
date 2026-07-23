import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getUserById,
  getUserPosts,
  toggleFollow,
  getMe,
} from "../../entities/user/api/userApi";
import type { User } from "../../entities/user/model/types";
import type { Post } from "../../entities/post/model/types";
import styles from "./UserProfilePage.module.css";
import { API_URL } from "../../shared/config/api";
import { PostModal } from "../../widgets/postModal/PostModal";

type UserProfileData = {
  user: User;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
};

export function UserProfilePage() {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    getMe().then(setCurrentUser);
  }, []);

  useEffect(() => {
    if (!userId) return;

    getUserById(userId).then(setProfileData);
    getUserPosts(userId).then(setPosts);
  }, [userId]);

  const handleFollow = async () => {
    if (!userId) return;

    await toggleFollow(userId);

    setProfileData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        isFollowing: !prev.isFollowing,
        followersCount: prev.isFollowing
          ? prev.followersCount - 1
          : prev.followersCount + 1,
      };
    });
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }
  console.log("POSTS:", posts);
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <img
          className={styles.avatar}
          src={`${API_URL}${profileData.user.avatarUrl}`}
          alt={profileData.user.username}
        />

        <div className={styles.profileInfo}>
          <div className={styles.topRow}>
            <h2>{profileData.user.username}</h2>

            <button className={styles.followButton} onClick={handleFollow}>
              {profileData.isFollowing ? "Unfollow" : "Follow"}
            </button>

            <button className={styles.messageButton}>Message</button>
          </div>

          <div className={styles.stats}>
            <span>
              <b>{profileData.postsCount}</b> posts
            </span>

            <span>
              <b>{profileData.followersCount}</b> followers
            </span>

            <span>
              <b>{profileData.followingCount}</b> following
            </span>
          </div>

          <div className={styles.bio}>
            <strong>{profileData.user.fullName}</strong>

            <p>{profileData.user.bio}</p>

            {profileData.user.website && (
              <a
                href={profileData.user.website}
                target="_blank"
                rel="noreferrer"
              >
                {profileData.user.website}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.postsGrid}>
        {posts.map((post) => (
          <button
            key={post._id}
            className={styles.postButton}
            onClick={() => setSelectedPost(post)}
          >
            <img
              src={`${API_URL}${post.imageUrl}`}
              alt={post.caption}
              className={styles.postImage}
            />
          </button>
        ))}
      </div>
      {selectedPost && currentUser && (
        <PostModal
          post={selectedPost}
          user={profileData.user}
          currentUser={currentUser}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}
