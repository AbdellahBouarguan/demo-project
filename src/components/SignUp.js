import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "@/lib/ConfigFirebase";

export default function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth(app);
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;
      await updateProfile(user, { displayName: name });
      await sendEmailVerification(user).then(() => {
        setIsMessageModalOpen(true);
      });
      window.location.href = "/User";
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="bg-cTwo bg-opacity-50 shadow-md shadow-slate-500 rounded px-8 pt-6 pb-8 mb-4">
      {isMessageModalOpen ? (
        <div className="space-y-4">
          <p className="lg:text-xl text-lg">Account Successfully Created</p>
          <p>Check Your Email To Validate This Account</p>
          <p>After That You Can Sign In Normaly</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-bTwo font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="bg-white bg-opacity-20 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
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
            <label
              className="block text-bTwo font-bold mb-2"
              htmlFor="password"
            >
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
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  );
}
