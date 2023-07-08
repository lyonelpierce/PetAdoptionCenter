import { useState, useEffect } from "react";

const AddPet = ({
  onSubmit,
  editPetId,
  editPetName,
  editPetAvatar,
  editPetDescription,
  editPetGenre,
  editPetAge,
  editPetTypeId,
  editPetBreedId,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [genre, setGenre] = useState("Male");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState(null);
  const [types, setTypes] = useState([]);
  const [breeds, setBreeds] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("type", type);
    formData.append("breed", breed);
    formData.append("genre", genre);
    formData.append("age", age);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("image", image);

    if (editPetId) {
      onSubmit(formData, editPetId);
    } else {
      onSubmit(formData);
    }
  };

  useEffect(() => {
    // Fetch the list of types from the backend
    fetch(
      "https://petadoptioncenter-production.up.railway.app/typeswithoutbreeds"
    )
      .then((response) => response.json())
      .then((data) => {
        setTypes(data);
      })
      .catch((error) => {
        console.error("Error fetching types:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch the list of breeds based on the selected type
    if (type !== "") {
      fetch(
        `https://petadoptioncenter-production.up.railway.app/breeds/${type}`
      )
        .then((response) => response.json())
        .then((data) => {
          setBreeds(data);
        })
        .catch((error) => {
          console.error("Error fetching breeds:", error);
        });
    }
  }, [type]);

  useEffect(() => {
    if (editPetId) {
      setName(editPetName);
      setType(editPetTypeId);
      setBreed(editPetBreedId);
      setGenre(editPetGenre);
      setAge(editPetAge);
      setDescription(editPetDescription);
    }
  }, [editPetName, editPetGenre, editPetAge, editPetDescription]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <form className="w-96 flex flex-col gap-3" onSubmit={handleSubmit}>
      {editPetId && (
        <img
          src={
            editPetAvatar.startsWith(
              "https://petadoptioncenter-production.up.railway.app/images/"
            )
              ? editPetAvatar
              : "https://petadoptioncenter-production.up.railway.app/images/" +
                editPetAvatar
          }
          alt="Pet Image"
          className="rounded-lg w-full h-60 object-cover"
        />
      )}
      <label className="flex flex-col gap-2">
        Name:
        <input
          type="text"
          placeholder="Pet name"
          className="rounded-md p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="flex flex-col gap-2">
        Type:
        <select
          className="rounded-md p-2 w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Select type</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        Breed:
        <select
          className="rounded-md p-2 w-full"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        >
          <option value="">Select breed</option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        Gender:
        <select
          className="rounded-md p-2 w-full"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        Age:
        <input
          type="number"
          placeholder="Age in years"
          className="rounded-md p-2 w-full"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </label>
      <label className="flex flex-col gap-2">
        Description:
        <textarea
          className="rounded-md p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label className="flex flex-col gap-2">
        Image:
        <input
          type="file"
          className="rounded-md p-2 w-full"
          onChange={handleImageChange}
          required={!editPetId} // Set the required attribute based on the presence of editPetId
        />
      </label>
      <button className="bg-yellow-400 rounded-md p-2 text-black mt-2">
        {editPetId ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default AddPet;
