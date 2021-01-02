import Cookies from "js-cookie";

export default function Logout() {
  Cookies.remove("spotifyAuthToken");
  window.location.reload(false);
}
