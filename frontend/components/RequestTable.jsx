import { DataGrid } from "@mui/x-data-grid";
import { IconFileDownload, IconBan, IconCheck } from "@tabler/icons-react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function RequestTable({ requests, handleToggle, handleReject }) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const handleOpen = (row, type) => {
    setSelectedRow(row);
    setSelectedType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setSelectedType(null);
  };

  // DATA GRID
  const rows =
    requests && requests.length > 0
      ? requests.map((request, index) => ({
          id: index + 1,
          col1: request.id,
          col2: {
            firstName: request.firstName,
            lastName: request.lastName,
          },
          col3: request.pet.name,
          col4: request.phoneNumber,
          col5: request.email,
          col6: request.annualIncome,
          col7: request.housingType,
          col8: request.status,
          col9: request.irsTaxPdf,
          col10: request.pet.id,
          col11: request.pet.type.name,
          col12: request.pet.breed.name,
          col13: request.pet.age,
          col14: request.pet.genre,
          col15: request.state,
          col16: request.city,
          col17: request.zipCode,
          col18: request.address,
          col19: request.dependents,
          col20: request.pet.image,
        }))
      : [];

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "col2",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <div className="flex flex-col">
          <button
            onClick={() => handleOpen(params.row, "name")}
            className="text-blue-600"
          >
            {params.row.col2.firstName} {params.row.col2.lastName}
          </button>
        </div>
      ),
    },
    {
      field: "col3",
      headerName: "Pet Name",
      flex: 1,
      renderCell: (params) => (
        <button
          onClick={() => handleOpen(params.row, "pet")}
          className="text-blue-600"
        >
          {params.row.col3}
        </button>
      ),
    },
    { field: "col4", headerName: "Phone", flex: 1 },
    { field: "col5", headerName: "Email", flex: 1 },
    { field: "col6", headerName: "Income", flex: 1 },
    { field: "col7", headerName: "Housing", flex: 1 },
    {
      field: "col8",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <>
          {params.row.col8 === "PENDING" ? (
            <div className="bg-yellow-400 py-1 px-3 rounded-full">Pending</div>
          ) : params.row.col8 === "REJECTED" ? (
            <div className="bg-red-400 py-1 px-3 rounded-full">Rejected</div>
          ) : (
            <div className="bg-green-400 py-1 px-3 rounded-full">Approved</div>
          )}
        </>
      ),
    },
    {
      field: "col9",
      headerName: "Tax Info",
      flex: 1,
      renderCell: (params) => (
        <>
          <a
            href={"http://localhost:8080/files/" + params.row.col9}
            target="_blank"
            rel="noreferrer"
          >
            <IconFileDownload className="cursor-pointer text-blue-600" />
          </a>
        </>
      ),
    },
    {
      field: "col10",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-2">
          <IconCheck
            className="cursor-pointer text-green-500"
            onClick={() => handleToggle(params.row.col1)}
          />
          <IconBan
            className="cursor-pointer text-red-400"
            onClick={() => handleReject(params.row.col1)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedType === "name" && selectedRow && (
            <div>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-center font-semibold mb-3"
              >
                Applicant Information
              </Typography>
              <ul>
                <li>
                  <span className="font-semibold">Name: </span>
                  {selectedRow.col2.firstName} {selectedRow.col2.lastName}
                </li>
                <li>
                  <span className="font-semibold">Email: </span>
                  {selectedRow.col5}
                </li>
                <li>
                  <span className="font-semibold">Phone: </span>
                  {selectedRow.col4}
                </li>
                <li>
                  <span className="font-semibold">State: </span>
                  {selectedRow.col15}
                </li>
                <li>
                  <span className="font-semibold">City: </span>
                  {selectedRow.col16}
                </li>
                <li>
                  <span className="font-semibold">Zip Code: </span>
                  {selectedRow.col17}
                </li>
                <li>
                  <span className="font-semibold">Address: </span>
                  {selectedRow.col18}
                </li>
                <li>
                  <span className="font-semibold">Annual Income: </span>
                  {selectedRow.col6}
                </li>
                <li>
                  <span className="font-semibold">Dependents: </span>
                  {selectedRow.col19}
                </li>
                <li>
                  <span className="font-semibold">Housing Type: </span>
                  {selectedRow.col7}
                </li>
              </ul>
            </div>
          )}
          {selectedType === "pet" && selectedRow && (
            <div>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-center font-semibold mb-3"
              >
                Pet Info
              </Typography>
              <img
                src={`http://localhost:8080/images/${selectedRow.col20}`}
                alt="Pet Image"
                className="rounded-lg mb-3"
              />
              <ul>
                <li>
                  <span className="font-semibold">Name: </span>
                  {selectedRow.col3}
                </li>
                <li>
                  <span className="font-semibold">Type: </span>
                  {selectedRow.col11}
                </li>
                <li>
                  <span className="font-semibold">Breed: </span>
                  {selectedRow.col12}
                </li>
                <li>
                  <span className="font-semibold">Gender: </span>
                  {selectedRow.col14}
                </li>
                <li>
                  <span className="font-semibold">Age: </span>
                  {selectedRow.col13}
                </li>
              </ul>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}
