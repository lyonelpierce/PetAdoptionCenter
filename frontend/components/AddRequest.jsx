import { useState } from "react";

const AddRequest = ({ selectedPetId, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    state: "",
    city: "",
    address: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    annualIncome: "",
    dependents: "",
    housingType: "House",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      petId: selectedPetId,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formValues, selectedPetId);
    setFormValues({
      firstName: "",
      lastName: "",
      state: "",
      city: "",
      address: "",
      zipCode: "",
      phoneNumber: "",
      email: "",
      annualIncome: "",
      dependents: "",
      housingType: "House",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row gap-3">
        <label className="flex flex-col gap-2">
          First Name:
          <input
            type="text"
            name="firstName"
            placeholder="John"
            className="rounded-md p-2 w-full"
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          Last Name:
          <input
            type="text"
            name="lastName"
            placeholder="Doe"
            className="rounded-md p-2 w-full"
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="flex flex-row gap-3">
        <label className="flex flex-col gap-2">
          State:
          <input
            type="text"
            name="state"
            placeholder="NY"
            className="rounded-md p-2 w-full"
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          City:
          <input
            type="text"
            name="city"
            placeholder="Bronx"
            className="rounded-md p-2 w-full"
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 mt-1">
        Address:
        <input
          type="text"
          name="address"
          placeholder="Fordham Rd. 1234"
          className="rounded-md p-2 w-full"
          onChange={handleChange}
          required
        />
      </label>
      <div className="flex flex-row gap-3">
        <label className="flex flex-col gap-2">
          Zip Code:
          <input
            type="number"
            name="zipCode"
            placeholder="123456"
            className="rounded-md p-2 w-full"
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            placeholder="123-456-7890"
            className="rounded-md p-2 w-full"
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 mt-1">
        Email:
        <input
          type="text"
          name="email"
          placeholder="john@doe.com"
          className="rounded-md p-2 w-full"
          onChange={handleChange}
          required
        />
      </label>
      <div className="flex flex-row gap-3">
        <label className="flex flex-col gap-2">
          Annual Income:
          <input
            type="number"
            name="annualIncome"
            placeholder="60.000"
            className="rounded-md p-2 w-full"
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          Dependents:
          <input
            type="number"
            name="dependents"
            placeholder="1"
            className="rounded-md p-2 w-full"
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 mt-1">
        Housing Type:
        <select
          className="rounded-md p-2 w-full"
          name="housingType"
          onChange={handleChange}
        >
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
        </select>
      </label>
      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 w-full text-center py-2 rounded-full mt-5 font-medium"
      >
        Send Request!
      </button>
    </form>
  );
};

export default AddRequest;
