import React, { useState, useEffect } from "react";
import "../styles/hrLeaveAndAttendance.css";
import { apiUrl } from "../api";
import axios from "axios";
import { useAuth } from "../utils/auth";
import { Button, ButtonGroup, Container } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import Info from "./HrtodoList/Info";
import WeeklyUserLoginMap from "./HrtodoList/WeeklyUserLoginMap";
import DiallyLoginMap from "./HrtodoList/DialyAttendanceMap";
import MonthlyLoginMap from "./HrtodoList/MonthlyAttendanceMap";
import DailyMapUserMood from "./HrtodoList/DailyMapUserMood";
import UserMoodAllDay from "./CheckIn&moodmap/UserMoodAllDay";
import UserMoodOnDate from "./CheckIn&moodmap/UserMoodOnDate";

function HRLeavesAndAttendance({ employees }) {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [userData, setUserData] = useState([]);
  const [searchDate, setSearchDate] = useState(new Date());
  const [curDept, setcurDept] = useState("AllDepts.");
  const [curStatus, setcurStatus] = useState("All");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [curDate, setCurDate] = useState(new Date());
  const [tableRows, setTableRows] = useState([]);
  const [tabelRawData, setTabelRawData] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [status, setStatus] = useState("Status");

  // Handler to update the state when the user selects a new option
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const auth = useAuth();

  const handleCurDateChange = (date) => {
    setCurDate(date);
  };

  const handleDateChange = (date) => {
    setSearchDate(date);
  };

  const attendanceStatus = (userData) => {
    const param = {
      totalEmployee: 0,
      onTime: 0,
      absent: 0,
      lateArrival: 0,
      earlyDeparture: 0,
    };

    userData.forEach((user) => {
      param.totalEmployee++;

      const today = new Date();
      const todayDate = today.toDateString();

      const todayRecord = user.checkInOutHistory.find((record) => {
        const checkInDate = new Date(record.checkIn).toDateString();
        return checkInDate === todayDate;
      });

      if (!todayRecord || !todayRecord.checkIn) {
        param.absent++;
      } else {
        const checkInTime = new Date(todayRecord.checkIn);
        const checkOutTime = todayRecord.checkOut
          ? new Date(todayRecord.checkOut)
          : null;

        const onTimeLimit = new Date(today.setHours(9, 0, 0)); // 09:00 AM
        const earlyDepartureLimit = new Date(today.setHours(17, 0, 0)); // 05:00 PM

        if (checkInTime <= onTimeLimit) {
          param.onTime++;
        } else {
          param.lateArrival++;
        }
        if (checkOutTime && checkOutTime < earlyDepartureLimit) {
          param.earlyDeparture++;
        }
      }
    });

    setUserData(param);
  };

  const handleDeptChange = (e) => {
    setcurDept(e.target.value); // Update state based on selected value
  };

  const generateTimeOptions = () => {
    const options = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0); // Start at 12:00 AM

    for (let i = 0; i < 24 * 60; i += 15) {
      const time = new Date(start.getTime() + i * 60 * 1000);
      const timeString = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      options.push(timeString);
    }
    return options;
  };

  // Get the generated options
  const timeOptions = generateTimeOptions();

  // Parse ISO 8601 timestamps into Date objects
  const parseTimeString = (timeString) => {
    return new Date(timeString);
  };

  // Function to calculate work hours
  const calculateWorkHours = (checkInTime, checkOutTime) => {
    const checkInDate = parseTimeString(checkInTime);
    const checkOutDate = parseTimeString(checkOutTime);
    const difference = Math.abs(checkOutDate - checkInDate);
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const processUserData = (tabelRawData) => {
    const filteredRows = tabelRawData
      .filter((user) => {
        // Filter by department
        if (curDept !== "AllDepts." && user.team !== curDept) {
          return false;
        }

        // Filter by name
        if (
          nameSearch &&
          !user.name.toLowerCase().includes(nameSearch.toLowerCase())
        ) {
          return false;
        }

        // Find today's check-in and check-out record in checkInOutHistory
        const todayRecord = user.checkInOutHistory.find((record) => {
          const recordDate = new Date(record.checkIn); // checkIn contains the date
          return recordDate.toDateString() === curDate.toDateString();
        });

        // If no record for today, the employee is absent
        if (!todayRecord || !todayRecord.checkIn) {
          return true; // Keep the user as they are absent
        }

        return true;
      })
      .map((user) => {
        // Find today's record
        const todayRecord = user.checkInOutHistory.find((record) => {
          const recordDate = new Date(record.checkIn);
          return recordDate.toDateString() === curDate.toDateString();
        });

        // Default status
        let status = "On Time";

        // Check status based on checkIn and checkOut times
        if (!todayRecord || !todayRecord.checkIn) {
          status = "Absent";
        } else if (
          parseTimeString(todayRecord.checkIn).getTime() >
          parseTimeString("09:00 AM").getTime()
        ) {
          status = "Late Arrival";
        }

        if (
          todayRecord &&
          todayRecord.checkOut &&
          parseTimeString(todayRecord.checkOut).getTime() <
          parseTimeString("06:00 PM").getTime()
        ) {
          status = "Early Departure";
        }

        // Calculate work hours if both checkIn and checkOut exist
        const workHours =
          todayRecord?.checkIn && todayRecord?.checkOut
            ? calculateWorkHours(todayRecord.checkIn, todayRecord.checkOut)
            : "N/A";

        // Format time for display
        const formatTime = (dateString) => {
          if (!dateString) return "N/A";
          const date = new Date(dateString);
          return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        };

        return {
          id: user._id,
          empName: user.name,
          dept: user.team,
          date: curDate.toDateString(),
          status: status,
          checkIn: formatTime(todayRecord?.checkIn),
          checkOut: formatTime(todayRecord?.checkOut),
          workHours,
        };
      });

    setTableRows(filteredRows);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Time formatting
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      const timeString = `${now.getHours() % 12 || 12}:${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
        }:${now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()
        } ${ampm}`;
      setCurrentTime(timeString);

      // Date formatting
      const day = now.toLocaleDateString("en-US", { weekday: "long" });
      const month = now.toLocaleDateString("en-US", { month: "long" });
      const dayNumber = now.getDate();
      const year = now.getFullYear();
      const dateString = `${dayNumber}th ${month} ${year}`;
      setCurrentDate(dateString);
    };

    const fetchUserData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        };

        const { data } = await axios.get(`${apiUrl}/getUserData`, config);
        if (data) {
          attendanceStatus(data.data);
          setTabelRawData(data.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    const intervalId = setInterval(updateTime, 1000);
    updateTime();
    fetchUserData();

    return () => clearInterval(intervalId);
  }, [auth.token]);

  // New effect to process table data
  useEffect(() => {
    if (tabelRawData.length > 0) {
      processUserData(tabelRawData);
    }
  }, [tabelRawData, checkIn, checkOut, curDate, curDept, nameSearch]);

  const [selectedOption, setSelectedOption] = useState("day");

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div
      style={{ backgroundColor: "#002525" }}
      className="attendance-leave-container"
    >
      <div className="attendance-upper-container">
        <div className="attendance-date-time">
          <div className="attendance-time">
            <img src="../images/attendance-time.svg" alt="attendance-time" />
            <div className="attendance-time-compo">
              <div className="attendance-time-view">{currentTime}</div>
              <div className="attendance-time-insight">Realtime Insight</div>
            </div>
          </div>
          <div className="attendance-date">
            <div className="attendance-today">Today</div>
            <div className="attendance-date-view">{currentDate}</div>
          </div>
          <div>
            <button
              style={{ backgroundColor: "#002525" }}
              className="view-attendance"
            >
              View Attendance
            </button>
          </div>
        </div>
        <br></br>
        <Info employees={employees} />

        <Container>
          {/* Toggle Button Group */}
          <ButtonGroup className="button-group">
            <Button
              color="success"

              variant={selectedOption === "day" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("day")}
            >
              Day
            </Button>
            <Button
              color="success"
              variant={selectedOption === "week" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("week")}
            >
              Week
            </Button>
            <Button
              color="success"
              variant={selectedOption === "month" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("month")}
            >
              Month
            </Button>
          </ButtonGroup>

          {/* Conditionally render components */}
          {selectedOption === "day" && <DiallyLoginMap employees={employees} />}
          {selectedOption === "week" && <WeeklyUserLoginMap employees={employees} />}
          {selectedOption === "month" && <MonthlyLoginMap employees={employees} />}
        </Container>

        <UserMoodAllDay employees={employees} />
        <UserMoodOnDate employees={employees} />
      </div>
    </div>
  );
}

export default HRLeavesAndAttendance;
