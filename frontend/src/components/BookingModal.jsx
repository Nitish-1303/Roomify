import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const BookingModal = ({ isOpen, onClose, room, onSubmit, error }) => {
  const dialog = useRef(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (isOpen && dialog.current && !dialog.current.open)
      dialog.current.showModal();
  }, [isOpen]);

  if (!isOpen || !room) return null;

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    try {
      await onSubmit(event, start, end);
    } finally {
      setSending(false);
    }
  };

  return (
    <dialog
      ref={dialog}
      className="studio-booking-dialog"
      aria-labelledby="booking-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="studio-booking-top">
        <p className="studio-eyebrow">Make a little room.</p>
        <button
          type="button"
          className="studio-icon-button"
          aria-label="Close booking"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <h2 id="booking-title">{room.name}</h2>
      <p>
        {room.location} · {room.capacity} people
      </p>
      <form onSubmit={submit}>
        <label>
          Starts
          <input
            type="datetime-local"
            required
            value={start}
            onChange={(event) => setStart(event.target.value)}
          />
        </label>
        <label>
          Ends
          <input
            type="datetime-local"
            required
            value={end}
            min={start || undefined}
            onChange={(event) => setEnd(event.target.value)}
          />
        </label>
        {error && (
          <p role="alert" className="studio-error">
            {error}
          </p>
        )}
        <p className="studio-booking-hint">
          This sends a booking request. Check My bookings for its approval
          status.
        </p>
        <button type="submit" disabled={sending} className="studio-button">
          {sending ? "Sending request…" : "Send booking request →"}
        </button>
      </form>
    </dialog>
  );
};

export default BookingModal;
