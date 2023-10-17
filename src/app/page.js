"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { useState } from "react";

export default function Home() {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openLogModal = () => {
    setIsLogModalOpen(true);
  };

  const closeLogModal = () => {
    setIsLogModalOpen(false);
  };
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  return (
    <main className="flex flex-col min-h-screen bg-fixed bg-[url('../../public/main.jpg')] bg-cover bg-center w-full h-full">
      <Header />
      <main className="flex-grow bg-transparent text-aOnly px-8 py-4 ">
        <h2 className="text-xl font-bold mb-4">
          Welcome to <span className="text-bOne">We-Tech</span>{" "}
        </h2>
        <div className="flex flex-col space-y-12">
          <div className="space-y-3 sm:text-base lg:text-lg">
            <p className="backdrop-blur-sm">
              We are delighted to have you here and introduce you to a world of
              convenience and digitization.
            </p>
            <p className="backdrop-blur-sm">
              In today's fast-paced era, where technology has become an integral
              part of our lives, we aim to simplify your day-to-day tasks by
              offering a wide range of digital services.
            </p>
            <p className="backdrop-blur-sm">
              Our commitment lies in providing you with efficient, secure, and
              user-friendly solutions that enhance your overall experience.
            </p>
            <p className="backdrop-blur-sm">
              Let's dive into the exciting realm of digital transformation and
              explore the myriad of services we have to offer.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <button
              onClick={openLogModal}
              className="text-bTwo rounded-full font-bold p-2 bg-cTwo bg-opacity-25 w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-opacity-50 duration-300 "
            >
              Sign in
            </button>
            <button onClick={openCreateModal}>
              <div className="flex flex-row items-center justify-center border-b hover:border-b-2  p-1 ">
                <p className="self-center">You don't have an account?</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 bg-cTwo bg-opacity-25 rounded-full text-bTwo transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-opacity-50 duration-300"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </button>
            {isLogModalOpen && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm">
                <div className="p-4">
                  {/* Add your form content here */}
                  <div className="">
                    <SignIn />
                    <button onClick={closeLogModal}>
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
              </div>
            )}
            {isCreateModalOpen && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm">
                <div className="p-4 flex justify-center items-center h-screen">
                  <div className="">
                    <SignUp />
                    <button onClick={closeCreateModal}>
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
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </main>
  );
}
