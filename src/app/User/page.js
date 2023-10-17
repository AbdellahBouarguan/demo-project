"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingUi from "@/components/LoadingUi";
import MenuInit from "@/components/MenuInit";
import app from "@/lib/ConfigFirebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [isMenuInitOpen, setIsMenuInitOpen] = useState(false);
  const [isUserHasService, setIsUserHasService] = useState([]);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
        setIsVerified(currentUser.emailVerified);
      } else {
        // User is signed out
        setUser(null);
        setIsVerified(null);
        window.location.href = "/";
      }
    });
    const retrieveServices = async () => {
      try {
        if (isVerified) {
          const q = query(
            collection(getFirestore(app), "Restaurants"),
            where("admin", "==", user.displayName)
          );
          const querySnapshot = await getDocs(q);
          const retrievedLst = [];
          querySnapshot.forEach((doc) => {
            retrievedLst.push(doc.data());
            setIsUserHasService(retrievedLst);
          });
        }
      } catch (error) {
        console.log("Error Fetching data: ", error);
      }
    };
    retrieveServices();
  }, [isVerified]);

  const openMenuInit = () => {
    setIsMenuInitOpen(true);
  };
  const closeMenuInit = () => {
    setIsMenuInitOpen(false);
  };
  return (
    <>
      {user ? (
        <div>
          {isVerified ? (
            <main className="flex flex-col bg-fixed bg-[url('../../public/userBg.jpg')] bg-cover bg-center min-h-screen w-full h-full">
              <Header data={user} />
              <main className="flex-grow bg-transparent text-aOnly px-8 py-4 space-y-2">
                {isUserHasService && (
                  <div className="backdrop-blur-sm flex flex-col justify-center items-center font-medium w-fit text-lg my-2">
                    <p>My Services:</p>
                    <div>
                      {isUserHasService.map((item, index) => (
                        <div className="text-bOne underline" key={index}>
                          <Link href={item.restauName}>{item.restauName}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <h1 className="backdrop-blur-sm font-medium w-fit text-lg my-2">
                  The Available Digitization Services:
                </h1>
                <div
                  onClick={openMenuInit}
                  className="bg-bTwo w-fit rounded-lg p-4 hover:cursor-pointer"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    Restaurant Menu
                  </h2>
                  <p className="">
                    We digitize a restaurant menu, and allow customers to place
                    orders using a QR code,
                  </p>
                </div>
                {isMenuInitOpen && (
                  <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-cTwo bg-opacity-25 backdrop-blur-md">
                    <div className="p-4 flex flex-col justify-center items-center h-screen">
                      <MenuInit name={user} />
                      <button onClick={closeMenuInit}>
                        <div className="flex items-center  justify-center bg-cTwo bg-opacity-50 rounded-full ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 rounded-full"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </main>
              <Footer />
            </main>
          ) : (
            <div className="p-4 flex flex-col justify-center items-center h-screen bg-black text-white">
              <div className="space-y-4 mb-4 bg-white bg-opacity-25 shadow-md shadow-slate-500 rounded px-8 pt-6 pb-4">
                <p className="lg:text-xl text-lg">
                  Account Successfully Created
                </p>
                <p>Check Your Email To Validate This Account</p>
                <p>
                  And Then Click{"  "}
                  <button
                    className="text-bTwo underline"
                    onClick={() => window.location.reload()}
                  >
                    Refresh
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <LoadingUi />
        </div>
      )}
    </>
  );
}
