"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Swal from "sweetalert2";

import { IconPlus } from "@tabler/icons-react";

import AddType from "@components/AddType";
import TypeTable from "@components/TypeTable";

const style = {
  width: 430,
  bgcolor: "#f3f4f6",
  py: 4,
  px: 5,
};

export default function BasicTable() {
  const { data: session } = useSession();
  const [types, setTypes] = useState([]);
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");

  // DRAWER STATE
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // GET TYPE LIST
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(
          "https://petadoptioncenter-production.up.railway.app/types"
        );
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  // HANDLE ADD
  const handleAdd = () => {
    setEditName("");
    setEditId("");
    handleOpen();
  };

  // NEW-EDIT TYPE WITH TOKEN
  const handleFormSubmit = (name, id) => {
    const token = session.user.token;

    const endpoint = id
      ? `https://petadoptioncenter-production.up.railway.app/edittype/${id}`
      : "https://petadoptioncenter-production.up.railway.app/addtype";

    fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: name,
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
  const handleEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
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

        fetch(
          `https://petadoptioncenter-production.up.railway.app/deletetype/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              // Remove the pet from the table
              const updatedTypes = types.filter((type) => type.id !== id);
              setTypes(updatedTypes);
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
                Species
              </Typography>
              <button
                onClick={handleAdd}
                className="text-sm font-medium bg-yellow-400 rounded-full px-4 py-2 text-black flex gap-1 items-center"
              >
                <IconPlus strokeWidth="1.5" />
                Add Specie
              </button>
            </div>
            <TypeTable
              types={types}
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
              <button
                className="sm:hidden absolute top-2 right-2 bg-gray-300 rounded-full p-2"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="mb-2"
              >
                {editName ? "Edit Specie" : "Add Specie"}
              </Typography>
              <AddType
                onSubmit={handleFormSubmit}
                editName={editName}
                editId={editId}
              />
            </Drawer>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
