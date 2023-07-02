"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Swal from "sweetalert2";

import { IconPlus } from "@tabler/icons-react";

import AddBreed from "@components/AddBreed";
import BreedTable from "@components/BreedTable";

const style = {
  width: 450,
  bgcolor: "#f3f4f6",
  p: 4,
};

export default function BasicTable() {
  const { data: session } = useSession();
  const [breeds, setBreeds] = useState([]);
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editTypeId, setEditTypeId] = useState("");

  // DRAWER STATE
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // GET TYPE LIST
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch("http://localhost:8080/breeds");
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  // HANDLE ADD
  const handleAdd = () => {
    setEditName("");
    setEditId("");
    handleOpen();
  };

  // NEW-EDIT BREED WITH TOKEN
  const handleFormSubmit = (id, name, type) => {
    const token = session.user.token;

    const breedData = {
      name: name,
      type: {
        id: type,
      },
    };

    console.log(id, name);

    const endpoint = id
      ? `http://localhost:8080/editbreed/${id}`
      : "http://localhost:8080/addbreed";

    fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(breedData),
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

  // EDIT TYPE WITH TOKEN
  const handleEdit = (id, name, type, typeId) => {
    setEditId(id);
    setEditName(name);
    setEditType(type);
    setEditTypeId(typeId);
    console.log(id, name, type, typeId);

    handleOpen();
  };

  // DELETE TYPE WITH TOKEN
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with the deletion
        const token = session.user.token;

        fetch(`http://localhost:8080/deletebreed/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              // Remove the pet from the table
              const updatedBreeds = breeds.filter((type) => type.id !== id);
              setBreeds(updatedBreeds);
              console.log("Type deleted successfully");
            } else {
              throw new Error("Failed to delete type");
            }
          })
          .catch((error) => {
            console.error("Error deleting type:", error);
          });
      }
    });
  };

  return (
    <div className="w-full">
      <Card sx={{ borderRadius: 3 }}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <div className="flex flex-row justify-between p-3 mb-2">
              <Typography gutterBottom variant="h5" component="div">
                Breeds
              </Typography>
              <button
                onClick={handleAdd}
                className="text-sm font-medium bg-yellow-400 rounded-full px-4 py-2 text-black flex gap-1 items-center"
              >
                <IconPlus strokeWidth="1.5" />
                Add Breed
              </button>
            </div>
            <BreedTable
              breeds={breeds}
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
                {editName ? "Edit Breed" : "Add Breed"}
              </Typography>
              <AddBreed
                onSubmit={handleFormSubmit}
                editId={editId}
                editName={editName}
                editType={editType}
                editTypeId={editTypeId}
              />
            </Drawer>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
