import app from "@/lib/ConfigFirebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add form submission logic here
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password).then(
        () => (window.location.href = "/User")
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form
      className="bg-cTwo bg-opacity-50 shadow-md shadow-slate-500 rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-bTwo font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="bg-white bg-opacity-20 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-bTwo font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="bg-white bg-opacity-20 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button
        className="bg-bTwo hover:bg-bOne text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}
