import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Grid } from "lucide-react";
import api from "../api/axios";
import RoomCard from "../components/RoomCard";
import BookingModal from "../components/BookingModal";
import AvailabilityCalendar from "../components/AvailabilityCalendar";

const initialFilters = {
  capacity: "",
  date: "",
  startTime: "",
  endTime: "",
  availableNow: false,
};
const roomBookings = (bookings, id) =>
  bookings.filter((booking) => (booking.room?._id || booking.room) === id);

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [filterError, setFilterError] = useState("");
  const [view, setView] = useState("grid");
  const [calendarRoom, setCalendarRoom] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingError, setBookingError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([api.get("/rooms"), api.get("/bookings")])
      .then(([roomResponse, bookingResponse]) => {
        if (!active) return;
        setRooms(roomResponse.data);
        setBookings(bookingResponse.data);
      })
      .catch(() => {
        if (active)
          setLoadError(
            "We could not load your workspace. Please try again or check the API connection.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filteredRooms = useMemo(
    () =>
      rooms.filter((room) => {
        if (filters.capacity && room.capacity < Number(filters.capacity))
          return false;
        if (filters.availableNow) {
          const now = new Date();
          const occupied = roomBookings(bookings, room._id).some(
            (booking) =>
              booking.status === "approved" &&
              now >= new Date(booking.start) &&
              now < new Date(booking.end),
          );
          if (occupied) return false;
        }
        if (!filters.date || !filters.startTime || !filters.endTime)
          return true;
        const start = new Date(`${filters.date}T${filters.startTime}`);
        const end = new Date(`${filters.date}T${filters.endTime}`);
        return !roomBookings(bookings, room._id).some(
          (booking) =>
            booking.status === "approved" &&
            start < new Date(booking.end) &&
            end > new Date(booking.start),
        );
      }),
    [rooms, bookings, filters],
  );

  const findRooms = (event) => {
    event.preventDefault();
    const { date, startTime, endTime } = draftFilters;
    if ((date || startTime || endTime) && !(date && startTime && endTime)) {
      setFilterError(
        "Choose a date, start time and end time to check availability.",
      );
      return;
    }
    if (startTime && endTime <= startTime) {
      setFilterError("The end time must be after the start time.");
      return;
    }
    setFilterError("");
    setFilters(draftFilters);
    document.getElementById("spaces").scrollIntoView({ behavior: "smooth" });
  };

  const requestBooking = async (event, start, end) => {
    event.preventDefault();
    if (!start || !end || new Date(end) <= new Date(start)) {
      setBookingError("Choose a valid start and end time.");
      return;
    }
    if (new Date(start) < new Date()) {
      setBookingError("Choose a start time in the future.");
      return;
    }
    try {
      await api.post("/bookings", { roomId: selectedRoom._id, start, end });
      setSelectedRoom(null);
      setNotice(
        "Booking request sent. You can follow its status in My bookings.",
      );
      setBookingError("");
      const response = await api.get("/bookings");
      setBookings(response.data);
    } catch (error) {
      setBookingError(
        error.response?.data?.error ||
          "Your request could not be sent. Please try again.",
      );
    }
  };
  const updateFilter = (event) =>
    setDraftFilters({
      ...draftFilters,
      [event.target.name]: event.target.value,
    });

  return (
    <main className="studio-home">
      <section
        className="studio-hero studio-container"
        aria-labelledby="hero-heading"
      >
        <div className="studio-hero-copy">
          <p className="studio-eyebrow">Good work needs a good space.</p>
          <h1 id="hero-heading">
            Meet here.
            <br />
            Make something.
          </h1>
          <p className="studio-intro">
            A bright room for your next big thing.
            <br />
            Find the right fit for your team.
          </p>
          <a href="#spaces" className="studio-button">
            Find my space <ArrowRight size={19} />
          </a>
        </div>
        <div className="studio-hero-art">
          <div className="studio-photo-backing" />
          <img
            src="/images/room-studio.svg"
            alt="A light-filled meeting space with a shared table"
          />
          <span className="studio-sticker studio-sticker-top">
            A little room to create
          </span>
          <span className="studio-sticker studio-sticker-bottom">
            Bring your next big idea.
          </span>
        </div>
      </section>
      <div className="studio-container">
        <form className="studio-search" onSubmit={findRooms}>
          <label>
            People
            <select
              name="capacity"
              value={draftFilters.capacity}
              onChange={updateFilter}
            >
              <option value="">Any group size</option>
              {[2, 4, 6, 8, 12, 20].map((size) => (
                <option key={size} value={size}>
                  {size}+ people
                </option>
              ))}
            </select>
          </label>
          <label>
            Date
            <input
              type="date"
              name="date"
              value={draftFilters.date}
              onChange={updateFilter}
            />
          </label>
          <label>
            From
            <input
              type="time"
              name="startTime"
              value={draftFilters.startTime}
              onChange={updateFilter}
            />
          </label>
          <label>
            Until
            <input
              type="time"
              name="endTime"
              value={draftFilters.endTime}
              onChange={updateFilter}
            />
          </label>
          <button type="submit" className="studio-button">
            Find a room <ArrowRight size={18} />
          </button>
        </form>
        <div className="studio-filter-extras">
          <label>
            <input
              type="checkbox"
              checked={draftFilters.availableNow || false}
              onChange={(event) => {
                const next = {
                  ...draftFilters,
                  availableNow: event.target.checked,
                };
                setDraftFilters(next);
                setFilters({ ...filters, availableNow: event.target.checked });
              }}
            />{" "}
            Available now
          </label>
          <button
            type="button"
            onClick={() => {
              setFilters(initialFilters);
              setDraftFilters(initialFilters);
              setFilterError("");
            }}
          >
            Clear filters
          </button>
        </div>
        {filterError && (
          <p role="alert" className="studio-error">
            {filterError}
          </p>
        )}
        {notice && (
          <p role="status" className="studio-notice">
            {notice} <Link to="/bookings">My bookings →</Link>
          </p>
        )}
        <section
          id="spaces"
          className="studio-spaces"
          aria-labelledby="spaces-heading"
        >
          <div className="studio-section-heading">
            <div>
              <h2 id="spaces-heading">Find your kind of room.</h2>
              <p>
                {loading
                  ? "Loading your workspace…"
                  : `${filteredRooms.length} of ${rooms.length} spaces`}{" "}
                · Choose a room to request a booking.
              </p>
            </div>
            <div className="studio-view-switch" aria-label="Room view">
              <button
                type="button"
                className={view === "grid" ? "is-selected" : ""}
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
              >
                <Grid size={16} /> Spaces
              </button>
              <button
                type="button"
                className={view === "calendar" ? "is-selected" : ""}
                onClick={() => setView("calendar")}
                aria-pressed={view === "calendar"}
              >
                <Calendar size={16} /> Calendar
              </button>
            </div>
          </div>
          {loading ? (
            <div className="studio-empty" role="status">
              Getting your spaces ready…
            </div>
          ) : loadError ? (
            <div className="studio-empty" role="alert">
              <h3>Let's reconnect.</h3>
              <p>{loadError}</p>
              <button
                type="button"
                className="studio-button"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="studio-empty">
              <h3>No rooms match yet.</h3>
              <p>Try another time or a smaller group.</p>
              <button
                type="button"
                className="studio-button"
                onClick={() => {
                  setFilters(initialFilters);
                  setDraftFilters(initialFilters);
                  setFilterError("");
                }}
              >
                Clear filters
              </button>
            </div>
          ) : view === "grid" ? (
            <div className="studio-room-grid">
              {filteredRooms.map((room, index) => (
                <RoomCard
                  key={room._id}
                  room={room}
                  index={index}
                  onBook={(chosen) => {
                    setSelectedRoom(chosen);
                    setBookingError("");
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="studio-calendar-layout">
              <div className="studio-room-picker">
                {filteredRooms.map((room) => (
                  <button
                    type="button"
                    key={room._id}
                    onClick={() => setCalendarRoom(room)}
                    className={
                      calendarRoom?._id === room._id ? "is-selected" : ""
                    }
                  >
                    {room.name}
                    <span>{room.capacity} people</span>
                  </button>
                ))}
              </div>
              {calendarRoom ? (
                <div>
                  <h3>{calendarRoom.name}</h3>
                  <AvailabilityCalendar
                    roomId={calendarRoom._id}
                    bookings={roomBookings(bookings, calendarRoom._id)}
                  />
                </div>
              ) : (
                <p className="studio-empty">Pick a room to see its calendar.</p>
              )}
            </div>
          )}
        </section>
        <section className="studio-how" aria-labelledby="how-heading">
          <div>
            <p className="studio-eyebrow">Less admin. More good work.</p>
            <h2 id="how-heading">Room for the whole process.</h2>
          </div>
          <ol>
            <li>
              <span>01</span>
              <h3>Find your fit</h3>
              <p>Choose a room with the right capacity for your team.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Pick your moment</h3>
              <p>Check the calendar and choose your start and end time.</p>
            </li>
            <li>
              <span>03</span>
              <h3>Send your request</h3>
              <p>Track approval and upcoming sessions in My bookings.</p>
            </li>
          </ol>
        </section>
        <footer className="studio-footer">
          <p>A little room for good work.</p>
          <Link to="/bookings">See your booking requests →</Link>
          <span>Photography: Unsplash · illustrative spaces</span>
        </footer>
      </div>
      <BookingModal
        key={selectedRoom?._id || "closed"}
        isOpen={!!selectedRoom}
        onClose={() => {
          setSelectedRoom(null);
          setBookingError("");
        }}
        room={selectedRoom}
        onSubmit={requestBooking}
        error={bookingError}
      />
    </main>
  );
};

export default Rooms;
