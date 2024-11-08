import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "./usercheck.css";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { LogoutOutlined } from "@mui/icons-material";
import UserFresh from "./UserFresh";
import { apiUrl } from "../../api";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserCheckInUsers = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [employeeId, setEmployeeId] = useState(user ? user._id : ""); // Ensure user exists
  const [message, setMessage] = useState("");
  const [checkInData, setCheckInData] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  console.log(isCheckedIn, isCheckedOut);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (employeeId) {
      fetchCheckInByUser(); // Fetch data only if employeeId is valid
    }
  }, [employeeId]);

  const handleCheckIn = async () => {
    if (isCheckedIn) {
      setMessage("You are already checked in!");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${apiUrl}/api/attendance/checkin`,
        {
          employeeId,
        }
      );
      setMessage(response.data.message);
      await fetchCheckInByUser(); // Await to ensure fresh data
    } catch (error) {
      console.error("Check-in error:", error);
      setMessage(
        error.response ? error.response.data.message : "Check-in failed"
      );
      setOpenSnackbar(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCheckOut = async () => {
    if (!isCheckedIn || isCheckedOut) {
      setMessage("You cannot check out!");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/attendance/checkout`,
        {
          employeeId,
        }
      );
      setMessage(response.data.message);
      await fetchCheckInByUser(); // Await to ensure fresh data
    } catch (error) {
      console.error("Check-out error:", error);
      setMessage(
        error.response ? error.response.data.message : "Check-out failed"
      );
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchCheckInByUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/attendance/checkin/${employeeId}`
      );
      console.log(response.data); // Log response data for debugging
      setCheckInData(response.data);
      setIsCheckedIn(response.data.isCheckedIn); // Ensure these properties exist
      setIsCheckedOut(response.data.isCheckedOut); // Ensure these properties exist
    } catch (error) {
      console.error("Error fetching check-in data:", error);
      setMessage(
        error.response
          ? error.response.data.message
          : "Failed to fetch check-in data"
      );
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="attendance-container">
      <Button
        size="small"
        style={{
          textTransform: "none",
          color: "white",
          backgroundColor: isCheckedIn ? "transparent" : "#008080",

          border: isCheckedIn ? "1px solid white" : "#008080",

          borderRadius: "10px",
        }}
        variant="contained"
        color="primary"
        onClick={handleCheckIn}
        disabled={isCheckedIn}
        className="check-in-button"
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <span style={{ fontSize: "12px", padding: "3px" }}>
            {" "}
            <LoginOutlinedIcon style={{ fontSize: "17px" }} /> Check In
          </span>
        )}
      </Button>

       <UserFresh fetchCheckInByUser={fetchCheckInByUser }  employeeId={employeeId} checkInData={checkInData}/>

      <Button
        size="small"
        variant="contained"
        onClick={handleCheckOut}
        disabled={!isCheckedIn || isCheckedOut || loading}
        style={{
          textTransform: "none",

          backgroundColor:
            !isCheckedIn || isCheckedOut ? "transparent" : "#008080",

          color: "white",
          borderRadius: "10px",

          border: !isCheckedIn || isCheckedOut ? "1px solid white" : "white",
        }}
        className="check-out-button"
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <span style={{ fontSize: "12px", padding: "3px" }}>
            {" "}
            <LogoutOutlined style={{ fontSize: "17px" }} /> Check out{" "}
          </span>
        )}
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserCheckInUsers;
