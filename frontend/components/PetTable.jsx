import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { IconTrash, IconPencil } from "@tabler/icons-react";

export default function PetTable({
  pets,
  handleToggle,
  handleDelete,
  handleEdit,
}) {
  // DATA GRID
  const rows = pets.map((pet, index) => ({
    id: index + 1,
    col1: pet.id,
    col2: {
      username: pet.name,
      avatar: `http://localhost:8080/images/${pet.image}`,
      description: pet.description,
    },
    col3: pet.type.name,
    col4: pet.breed.name,
    col5: pet.genre,
    col6: pet.age,
    col7: pet.status,
    col8: "Actions",
    col9: pet.type.id,
    col10: pet.breed.id,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "col2",
      headerName: "Name",
      width: 350,
      renderCell: (params) => (
        <>
          <Avatar className="mr-3" src={params.row.col2.avatar} />
          <div className="flex flex-col">
            {params.row.col2.username}
            <div>{params.row.col2.description}</div>
          </div>
        </>
      ),
    },
    { field: "col3", headerName: "Type", flex: 1 },
    { field: "col4", headerName: "Breed", flex: 1 },
    { field: "col5", headerName: "Gender", flex: 1 },
    { field: "col6", headerName: "Age", flex: 1 },
    {
      field: "col7",
      headerName: "Available",
      flex: 1,
      renderCell: (params) => (
        <>
          <FormControlLabel
            control={
              <Switch
                defaultChecked={params.row.col7}
                onChange={() => handleToggle(params.row.col1, params.row.col7)}
              />
            }
          />
        </>
      ),
    },
    {
      field: "col8",
      headerName: "Actions",
      flex: 1,

      renderCell: (params) => (
        <div className="flex gap-3">
          <IconPencil
            strokeWidth="1.5"
            className="cursor-pointer"
            onClick={() =>
              handleEdit(
                params.row.col1,
                params.row.col2.username,
                params.row.col2.avatar,
                params.row.col2.description,
                params.row.col5,
                params.row.col6,
                params.row.col9,
                params.row.col10
              )
            }
          />
          <IconTrash
            strokeWidth="1.5"
            className="text-red-400 cursor-pointer"
            onClick={() => handleDelete(params.row.col1)}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "asc" }],
          },
        }}
        hideFooterSelectedRowCount
      />
    </div>
  );
}
