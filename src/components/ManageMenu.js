import { arrayUnion, updateDoc } from "firebase/firestore";
import { useState } from "react";
import CSVUpload from "./CSVUpload";

export default function ManageMenu(params) {
  const [isSubmited, setIsSubmited] = useState(false);
  const [csvData, setCsvData] = useState();

  const handleMenuItemSubmit = async (event) => {
    event.preventDefault();
    setIsSubmited(true);

    // Get the form data
    const category = event.target.category.value;
    const name = event.target.name.value;
    const description = event.target.description.value;
    const price = parseFloat(event.target.price.value);

    // Create a new menu item object
    const newItem = {
      category,
      name,
      description,
      price,
    };

    // Add the new menu item to the list
    try {
      await updateDoc(params.docId.ref, { Menu: arrayUnion(newItem) });

      console.log("Object added to the array successfully.");
    } catch (error) {
      console.error("Error adding object to the array:", error);
    }

    // Reset the form fields
    event.target.reset();
    setIsSubmited(false);
  };
  return (
    <>
      <form onSubmit={handleMenuItemSubmit} className="flex flex-col">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          placeholder="Category"
          className="bg-white bg-opacity-20 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="bg-white bg-opacity-20 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Description"
          className="bg-white bg-opacity-20 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        ></textarea>

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          className="bg-white bg-opacity-20 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          placeholder="Price"
          step="0.01"
          required
        />

        <button
          className={`bg-bTwo hover:bg-bOne ${
            isSubmited && "cursor-wait"
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4`}
          type="submit"
          disabled={isSubmited}
        >
          Add Item
        </button>
        <button onClick={() => console.log(csvData)}>test</button>
      </form>
      <CSVUpload data={setCsvData} />
      <div className="">
        <table className="table-fixed">
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
