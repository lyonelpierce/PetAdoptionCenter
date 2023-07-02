import { useState, useEffect } from "react";

const AddType = ({ onSubmit, editName, editId }) => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editName && editId) {
      onSubmit(name, editId);
    } else {
      onSubmit(name);
    }
  };

  useEffect(() => {
    if (editName && editId) {
      setName(editName);
    }
  }, [editName]);

  return (
    <form className="w-96 flex flex-col gap-3" onSubmit={handleSubmit}>
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
      <button className="bg-yellow-400 rounded-md p-2 text-black mt-2">
        {editName ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default AddType;
