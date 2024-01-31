/* eslint-disable react/prop-types */
import "./avatarprofile.css";

export function AvatarProfile({ isShrunk }) {
  return (
    <div className={`avatar-container ${isShrunk ? "shrink" : ""}`}>
      <img
        className={`avatar-img ${isShrunk ? "shrink" : ""}`}
        src="./assets/Alex-Headshot-BG-Removed-SQ.png"
        alt="AC-Profile"
      />
    </div>
  );
}
