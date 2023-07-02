"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { IconPlus } from "@tabler/icons-react";

import AddPet from "@components/AddPet";
import PetTable from "@components/PetTable";

const style = {
  width: 450,
  bgcolor: "#f3f4f6",
  p: 4,
};

export default function BasicTable() {
  const { data: session } = useSession();
  const [pets, setPets] = useState([]);

  // EDIT PET STATE
  const [editPetId, setEditPetId] = useState("");
  const [editPetName, setEditPetName] = useState("");
  const [editPetAvatar, setEditPetAvatar] = useState("");
  const [editPetDescription, setEditPetDescription] = useState("");
  const [editPetGenre, setEditPetGenre] = useState("");
  const [editPetAge, setEditPetAge] = useState("");
  const [editPetTypeId, setEditPetTypeId] = useState("");
  const [editPetBreedId, setEditPetBreedId] = useState("");

  // NEW PET WITH TOKEN
  const handleFormSubmit = (formData, id) => {
    const token = session.user.token;

    console.log(id);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const endpoint = id
      ? `http://localhost:8080/editpet/${id}`
      : "http://localhost:8080/addpet";

    fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          handleClose();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // EDIT STATUS WITH TOKEN
  const handleToggle = (id) => {
    const token = session.user.token;

    fetch(`http://localhost:8080/updatestatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Status updated successfully");
        } else {
          throw new Error("Failed to update status");
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  // DELETE PET WITH TOKEN
  const handleDelete = (id) => {
    const token = session.user.token;

    fetch(`http://localhost:8080/deletepet/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Remove the pet from the table
          const updatedPets = pets.filter((pet) => pet.id !== id);
          setPets(updatedPets);
          console.log("Pet deleted successfully");
        } else {
          throw new Error("Failed to delete pet");
        }
      })
      .catch((error) => {
        console.error("Error deleting pet:", error);
      });
  };

  // HANDLE ADD PET
  const handleAdd = () => {
    setEditPetId("");
    setEditPetName("");
    setEditPetAvatar("");
    setEditPetDescription("");
    setEditPetGenre("");
    setEditPetAge("");
    setEditPetTypeId("");
    setEditPetBreedId("");
    handleOpen();
  };

  // HANDLE EDIT PET
  const handleEdit = (
    id,
    name,
    avatar,
    description,
    genre,
    age,
    typeId,
    breedId
  ) => {
    setEditPetId(id);
    setEditPetName(name);
    setEditPetAvatar(avatar);
    setEditPetDescription(description);
    setEditPetGenre(genre);
    setEditPetAge(age);
    setEditPetTypeId(typeId);
    setEditPetBreedId(breedId);
    handleOpen();
  };

  // DRAWER STATE
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // GET PET LIST
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://localhost:8080/pets");
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="w-full">
      <Card sx={{ borderRadius: 3 }}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <div className="flex flex-row justify-between p-3 mb-2">
              <Typography gutterBottom variant="h5" component="div">
                Pets
              </Typography>
              <button
                onClick={handleAdd}
                className="text-sm font-medium bg-yellow-400 rounded-full px-4 py-2 text-black flex gap-1 items-center"
              >
                <IconPlus strokeWidth="1.5" />
                Add Pet
              </button>
            </div>
            <PetTable
              pets={pets}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
            <Drawer
              open={open}
              anchor="right"
              onClose={handleClose}
              PaperProps={{
                elevation: 3,
                sx: style,
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="mb-2"
              >
                {editPetId ? "Edit Pet" : "Add Pet"}
              </Typography>
              <AddPet
                onSubmit={handleFormSubmit}
                editPetId={editPetId}
                editPetName={editPetName}
                editPetAvatar={editPetAvatar}
                editPetDescription={editPetDescription}
                editPetGenre={editPetGenre}
                editPetAge={editPetAge}
                editPetTypeId={editPetTypeId}
                editPetBreedId={editPetBreedId}
              />
            </Drawer>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
