import { DataGrid } from "@mui/x-data-grid";
import { IconTrash, IconPencil } from "@tabler/icons-react";

export default function TypeTable({ types, handleDelete, handleEdit }) {
  // DATA GRID
  const rows = types.map((type, index) => ({
    id: index + 1,
    col1: type.id,
    col2: type.name,
    col3: "Actions",
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
    {
      field: "col3",
      headerName: "Actions",
      flex: 1,

      renderCell: (params) => (
        <div className="flex gap-3">
          <IconPencil
            strokeWidth="1.5"
            className="cursor-pointer"
            onClick={() => handleEdit(params.row.col1, params.row.col2)}
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
