/* eslint-disable react/prop-types */
import "./avatarprofile.css";

export function AvatarProfile({ isShrunk }) {
  return (
    <div className={`avatar-container ${isShrunk ? "shrink" : ""}`}>
      <img
        className={`avatar-img ${isShrunk ? "shrink" : ""}`}
        src="./assets/Alex-Cartoonized5.png"
        alt="AC-Profile"
      />
    </div>
  );
}
