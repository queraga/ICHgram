import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMe,
  updateProfile,
  updateAvatar,
} from "../../entities/user/api/userApi";
import { API_URL } from "../../shared/config/api";
import type { User } from "../../entities/user/model/types";

import styles from "./EditProfilePage.module.css";

export function EditProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    getMe().then((data) => {
      setUser(data);
      setUsername(data.username);
      setWebsite(data.website || "");
      setBio(data.bio || "");
    });
  }, []);

  const handleSave = async () => {
    if (!user) return;

    await updateProfile({
      fullName: user.fullName,
      username,
      website,
      bio,
    });

    navigate("/profile");
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    await updateAvatar(file);

    const updatedUser = await getMe();

    setUser(updatedUser);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.editPage}>
      <h1>Edit profile</h1>

      <div className={styles.userCard}>
        <img src={`${API_URL}${user.avatarUrl}`} alt={user.username} />

        <div>
          <strong>{user.username}</strong>
          <p>{user.bio}</p>
        </div>
        <input
          type="file"
          accept="image/*"
          id="avatarInput"
          hidden
          onChange={handleAvatarChange}
        />
        <button onClick={() => document.getElementById("avatarInput")?.click()}>
          New photo
        </button>
      </div>

      <label>
        Username
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>

      <label>
        Website
        <input
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </label>

      <label>
        About
        <textarea
          value={bio}
          maxLength={150}
          onChange={(event) => setBio(event.target.value)}
        />
        <span>{bio.length} / 150</span>
      </label>

      <button className={styles.saveButton} onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
