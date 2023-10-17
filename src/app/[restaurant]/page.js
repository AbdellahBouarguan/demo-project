"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingUi from "@/components/LoadingUi";
import ManageMenu from "@/components/ManageMenu";
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

export default function Restaurant(params) {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [isUserHasService, setIsUserHasService] = useState([]);

  const [selectedTab, setSelectedTab] = useState(1);

  const [count, setCount] = useState(0);

  const retrieveServices = async () => {
    try {
      if (isVerified) {
        console.log("wait fetching");
        const q = query(
          collection(getFirestore(app), "Restaurants"),
          where("restauName", "==", params.params.restaurant),
          where("admin", "==", user.displayName)
        );
        const querySnapshot = await getDocs(q);
        const retrievedLst = [];
        querySnapshot.forEach((doc) => {
          retrievedLst.push(doc);
          setIsUserHasService(retrievedLst);
        });
        console.log("done fetching");
      }
    } catch (error) {
      console.log("Error Fetching data: ", error);
    }
  };

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

    retrieveServices();
  }, [isVerified]);
  return (
    <>
      {user ? (
        <div>
          {isVerified ? (
            <main className="flex flex-col bg-fixed bg-[url('../../public/userBg.jpg')] bg-cover bg-center min-h-screen w-full h-full">
              <Header data={user} />
              <main className="flex-grow bg-transparent text-aOnly px-8 py-4 ">
                {isUserHasService.length > 0 ? (
                  <div className="backdrop-blur-sm flex flex-col justify-center items-center font-medium w-fit text-lg my-2">
                    <p>Admin Panel</p>
                    <div>
                      {isUserHasService.map((item, index) => (
                        <div className="text-bOne underline" key={index}>
                          <Link href={item.data().restauName}>
                            {item.data().restauName}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <LoadingUi />
                )}
                <div className="flex flex-row justify-start">
                  <div
                    onClick={async () => {
                      setSelectedTab(1);
                      console.log(count);

                      await retrieveServices().then(() =>
                        console.log(isUserHasService[0].data())
                      );
                    }}
                    className={`bg-cTwo bg-opacity-75 hover:text-bTwo hover:cursor-pointer ${
                      selectedTab == 1 && "text-bOne"
                    } rounded-tl-md border-l border-t border-r px-1 w-fit text-md sm:text-lg sm:font-medium`}
                  >
                    Menu
                  </div>
                  <div
                    onClick={() => setSelectedTab(2)}
                    className={`bg-cTwo bg-opacity-75 hover:text-bTwo hover:cursor-pointer ${
                      selectedTab == 2 && "text-bOne"
                    } border-t border-r px-1 w-fit text-md sm:text-lg sm:font-medium`}
                  >
                    Manage Menu
                  </div>
                  <div
                    onClick={() => setSelectedTab(3)}
                    className={`bg-cTwo bg-opacity-75 hover:text-bTwo hover:cursor-pointer ${
                      selectedTab == 3 && "text-bOne"
                    } rounded-tr-lg border-t border-r px-1 w-fit text-md sm:text-lg sm:font-medium`}
                  >
                    Create QR Code
                  </div>
                </div>
                <div className="bg-cTwo bg-opacity-75 rounded px-8 pt-6 pb-4 mb-1">
                  {selectedTab == 1 && <p>1</p>}
                  {selectedTab == 2 && (
                    <ManageMenu docId={isUserHasService[0]} num={setCount} />
                  )}
                  {selectedTab == 3 && <p>3</p>}
                </div>
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
