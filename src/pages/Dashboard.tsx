import React, { useEffect, useState } from "react";
import axios from "axios";

interface Event {
  _id: string;
  totalseats: number;
  status: string;
  eventname: string;
}

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState("");

  const [form, setForm] = useState({
    user_id: "",
    seats: "",
  });

  const API = "http://localhost:8000/api/events";
  

  // Fetch events
  const fetchEvents = async () => {
    const res = await axios.get(`${API}/listevents`);
    setEvents(res.data.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Book seats (CREATE RESERVATION)
  const handleBook = async () => {
    if (!form.user_id || !form.seats || !selectedEventId) {
      alert("Please fill all fields and select an event");
      return;
    }

    await axios.post(`${API}/create`, {
      user_id: form.user_id,
      event_id: selectedEventId,
      seats: Number(form.seats),
    });

    setForm({ user_id: "", seats: "" });
    setSelectedEventId("");
    fetchEvents();
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "15px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Event Dashboard</h1>

      {/* BOOKING FORM */}
      <div
        style={{
          padding: "20px",
          background: "#f8f9fa",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h3>Book Event Seats</h3>

        <input
          placeholder="User ID"
          value={form.user_id}
          style={inputStyle}
          onChange={(e) =>
            setForm({ ...form, user_id: e.target.value })
          }
        />

        <input
          placeholder="Seats"
          value={form.seats}
          style={inputStyle}
          onChange={(e) =>
            setForm({ ...form, seats: e.target.value })
          }
        />

        <button onClick={handleBook} style={buttonStyle}>
          Book Now
        </button>

        {selectedEventId && (
          <p style={{ marginTop: "10px" }}>
           Event Selected
          </p>
        )}
      </div>

      {/* EVENTS TABLE */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Event Name</th>
            <th style={cellStyle}>Total Seats</th>
            <th style={cellStyle}>Status</th>
            <th style={cellStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td style={cellStyle}>{event.eventname}</td>
              <td style={cellStyle}>{event.totalseats}</td>
              <td style={cellStyle}>{event.status}</td>

              <td style={cellStyle}>
                <button
                  onClick={() => setSelectedEventId(event._id)}
                  style={selectBtn}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* STYLES */
const inputStyle = {
  padding: "10px",
  margin: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#007bff",
  color: "white",
  cursor: "pointer",
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center" as const,
};

const selectBtn = {
  padding: "6px 10px",
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
};

export default Dashboard;