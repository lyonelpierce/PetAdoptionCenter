"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import RequestTable from "@components/RequestTable";
import Swal from "sweetalert2";

const style = {
  width: 450,
  bgcolor: "#f3f4f6",
  p: 4,
};

export default function BasicTable() {
  const { data: session, loading } = useSession();
  const [requests, setRequests] = useState([]);
  const [sessionLoaded, setSessionLoaded] = useState(false);

  useEffect(() => {
    if (!loading && session) {
      setSessionLoaded(true);
    }
  }, [loading, session]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (sessionLoaded && session && session.user && session.user.token) {
          const token = session.user.token;
          const response = await fetch("http://localhost:8080/requests", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setRequests(data);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [sessionLoaded, session]);

  // APPROVE STATUS WITH TOKEN
  const handleToggle = (id) => {
    const token = session.user.token;

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to approve the status and send an approval email to the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Approve",
      confirmButtonColor: "#4ade80",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/approve/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire({
                title: "Status Updated",
                text: "The status has been approved.",
                icon: "success",
              }).then(() => {
                window.location.reload();
              });
            } else {
              throw new Error("Failed to update status");
            }
          })
          .catch((error) => {
            console.error("Error updating status:", error);
          });
      }
    });
  };

  // REJECT STATUS WITH TOKEN
  const handleReject = (id) => {
    const token = session.user.token;

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject the status and send a rejection email to the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f87171",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/reject/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire({
                title: "Status Updated",
                text: "The status has been rejected.",
                icon: "success",
              }).then(() => {
                window.location.reload();
              });
            } else {
              throw new Error("Failed to update status");
            }
          })
          .catch((error) => {
            console.error("Error updating status:", error);
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
                Requests
              </Typography>
            </div>
            <RequestTable
              requests={requests}
              handleToggle={handleToggle}
              handleReject={handleReject}
            />
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
