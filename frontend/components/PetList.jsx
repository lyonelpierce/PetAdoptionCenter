"use client";

import PetCard from "@components/PetCard";

import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { useState, useEffect } from "react";
import AddRequest from "./AddRequest";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  flex: 1,
  bgcolor: "#f3f4f6",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const handleOpen = (pet) => {
    setSelectedPet(pet);
    setSelectedPetId(pet.id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedPet(null);
    setOpen(false);
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(
          "https://petadoptioncenter-production.up.railway.app/pets"
        );
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  const handleFormSubmit = (formValues) => {
    const formData = new FormData();
    formData.append("file", formValues.taxDeclaration);

    // Append other form values to the FormData object
    formData.append("firstName", formValues.firstName);
    formData.append("lastName", formValues.lastName);
    formData.append("state", formValues.state);
    formData.append("city", formValues.city);
    formData.append("address", formValues.address);
    formData.append("annualIncome", formValues.annualIncome);
    formData.append("housingType", formValues.housingType);
    formData.append("dependents", formValues.dependents);
    formData.append("email", formValues.email);
    formData.append("phoneNumber", formValues.phoneNumber);
    formData.append("zipCode", formValues.zipCode);
    formData.append("pet.id", formValues.petId);
    formData.append("status", "PENDING");

    fetch("https://petadoptioncenter-production.up.railway.app/requests", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // console.log(response);
          handleClose();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className="w-full flex-center flex-col p-2">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-xl font-medium mb-">Adopt Me!</h2>
        {/* <button className="bg-yellow-400 px-4 py-2 rounded-full font-medium hover:bg-yellow-500 flex items-center">
          View More
          <IconArrowRight strokeWidth={1.5} size={20} />
        </button> */}
      </div>
      <Card className="p-5" sx={{ borderRadius: 1.5, flex: 1 }}>
        <ul className="flex flex-col sm:flex-row gap-7 flex-wrap">
          {pets
            .sort((a, b) => b.id - a.id)
            .filter((pet) => pet.status === true)
            .slice(0, 4)
            .map((pet, i) => (
              <PetCard key={i} pet={pet} onOpenModal={() => handleOpen(pet)} />
            ))}
        </ul>
      </Card>

      <div className="flex justify-between items-center mb-1 mt-7">
        <h2 className="text-xl font-medium mb-5">They made it!</h2>
      </div>
      <Card className="p-7" sx={{ borderRadius: 1.5 }}>
        <ul className="flex flex-col sm:flex-row gap-7 flex-wrap">
          {pets
            .sort((a, b) => b.id - a.id)
            .filter((pet) => pet.status === false)
            .slice(0, 4)
            .map((pet, i) => (
              <PetCard key={i} pet={pet} onOpenModal={() => handleOpen(pet)} />
            ))}
        </ul>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-full h-full sm:w-3/6 sm:h-2/3">
          {selectedPet && (
            <>
              <h2 className="text-center text-2xl font-medium mb-7">
                Request Adoption
              </h2>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-2/5 w-full mr-5 flex flex-col">
                  <img
                    src={
                      `https://petadoptioncenter-production.up.railway.app/images/` +
                      selectedPet.image
                    }
                    alt="{selectedPet.name} Image"
                    className="rounded-lg"
                  />
                  <ul className="mt-2 mb-5">
                    <li>
                      <h2 className="text-xl font-medium text-center">
                        {selectedPet.name}
                      </h2>
                    </li>
                    <li>
                      <span className="font-medium">Specie: </span>
                      {selectedPet.type.name}
                    </li>
                    <li>
                      <span className="font-medium">Breed: </span>
                      {selectedPet.breed.name}
                    </li>
                    <li>
                      <span className="font-medium">Gender: </span>
                      {selectedPet.genre}
                    </li>
                    <li>
                      <span className="font-medium">Age: </span>
                      {selectedPet.age}
                    </li>
                    <li>
                      <span className="font-medium">History: </span>
                      {selectedPet.description}
                    </li>
                  </ul>
                </div>
                <div className="w-full sm:w-2/3">
                  <AddRequest
                    selectedPetId={selectedPetId}
                    onSubmit={handleFormSubmit}
                  />
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </section>
  );
};

export default PetList;
