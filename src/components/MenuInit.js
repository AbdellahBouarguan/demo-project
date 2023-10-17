import { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import app from "@/lib/ConfigFirebase";

export default function MenuInit(params) {
  const [RestaurantName, setRestaurantName] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleCreate = async () => {
    setButtonDisabled(true);
    try {
      const firestore = getFirestore(app);
      const collectionRef = collection(firestore, "Restaurants");
      await addDoc(collectionRef, {
        admin: params.name.displayName,
        restauName: RestaurantName,
      });
      console.log("Document written with ID: ", collectionRef.id);
      window.location.reload();
    } catch (error) {
      console.error("Error adding restaurent: ", error);
    }
  };

  return (
    <div className="bg-cTwo bg-opacity-75 shadow-md shadow-slate-500 rounded px-8 pt-6 pb-4 mb-1">
      <div className="flex flex-col justify-center items-center w-full h-auto">
        <label className="block text-bTwo font-bold mb-2" htmlFor="name">
          Restaurant Name:
        </label>
        <input
          className="bg-white bg-opacity-20 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="restaurantName"
          type="text"
          placeholder="Resataurant"
          value={RestaurantName}
          onChange={(event) => setRestaurantName(event.target.value)}
        />
        <button
          className="bg-bTwo hover:bg-bOne text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          onClick={handleCreate}
          disabled={isButtonDisabled}
        >
          Create
        </button>
      </div>
    </div>
  );
}
