import { DataGrid } from "@mui/x-data-grid";
import { IconTrash, IconPencil } from "@tabler/icons-react";

export default function BreedTable({ breeds, handleDelete, handleEdit }) {
  // DATA GRID
  const rows = breeds.map((breed, index) => ({
    id: index + 1,
    col1: breed.id,
    col2: breed.name,
    col3: breed.type.name,
    col4: "Actions",
    col5: breed.type.id,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "col2",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <>
          <div className="flex flex-col">{params.row.col2}</div>
        </>
      ),
    },
    { field: "col3", headerName: "Type", flex: 1 },
    {
      field: "col4",
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
                params.row.col2,
                params.row.col3,
                params.row.col5
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
