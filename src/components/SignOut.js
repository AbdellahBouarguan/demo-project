import app from "@/lib/ConfigFirebase";
import { getAuth, signOut } from "firebase/auth";

export default function SignOut() {
  const handleSignOut = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth(app);
      await signOut(auth).then(() => (window.location.href = "/"));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-white bg-red-600 p-1 rounded-md"
    >
      Sign Out
    </button>
  );
}
