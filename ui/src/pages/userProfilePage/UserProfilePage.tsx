import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getUserById, getUserPosts } from "../../entities/user/api/userApi";
import type { User } from "../../entities/user/model/types";
import type { Post } from "../../entities/post/model/types";
import styles from "./UserProfilePage.module.css";
import { API_URL } from "../../shared/config/api";

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

  useEffect(() => {
    if (!userId) return;

    getUserById(userId).then(setProfileData);
    getUserPosts(userId).then(setPosts);
  }, [userId]);

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

            <button className={styles.followButton}>
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
          <img
            key={post._id}
            src={`${API_URL}${post.imageUrl}`}
            alt=""
            className={styles.postImage}
          />
        ))}
      </div>
    </div>
  );
}
