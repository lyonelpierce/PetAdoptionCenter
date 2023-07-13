import { useState, useEffect } from "react";

const AddBreed = ({ onSubmit, editId, editName, editType, editTypeId }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editName && editId && editTypeId) {
      onSubmit(editId, name, editTypeId);
    } else {
      onSubmit(editId, name, type);
    }
  };

  useEffect(() => {
    if (editName && editId && editType) {
      setName(editName);
      setType(editTypeId);
    }
  }, [editName, editType]);

  useEffect(() => {
    // Fetch type options from the API endpoint
    fetch("https://petadoptioncenter-production.up.railway.app/types")
      .then((response) => response.json())
      .then((data) => {
        setTypeOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching type options:", error);
      });
  }, []);

  return (
    <form className="w-full flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2">
        Name:
        <input
          type="text"
          placeholder="Type name"
          className="rounded-md p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="flex flex-col gap-2">
        Specie:
        <select
          className="rounded-md p-2 w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Select type</option>
          {typeOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
      <button className="bg-yellow-400 rounded-md p-2 text-black mt-2">
        {editName ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default AddBreed;
