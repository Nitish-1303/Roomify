import React from "react";
import { ArrowUpRight, Users, MapPin } from "lucide-react";

const roomPhotos = [
  "/images/room-studio.svg",
  "/images/room-boardroom.svg",
  "/images/room-lounge.svg",
];

const amenityLabels = {
  projector: "Projector",
  avSystem: "AV system",
  whiteboard: "Whiteboard",
  ac: "Air conditioning",
  videoConference: "Video call",
  smartBoard: "Smart board",
};
const roomAmenities = (value) =>
  Array.isArray(value)
    ? value
    : Object.entries(value || {})
        .filter(([, enabled]) => enabled)
        .map(([key]) => amenityLabels[key] || key);

const RoomCard = ({ room, onBook, index = 0 }) => (
  <article className="studio-room-card">
    <div className="studio-room-image">
      <img src={roomPhotos[index % roomPhotos.length]} alt="" loading="lazy" />
      <span className="studio-capacity">
        <Users size={14} />
        {room.capacity} people
      </span>
      <span className="studio-photo-note">Illustrative photo</span>
    </div>
    <div className="studio-room-content">
      <h3>{room.name}</h3>
      <p className="studio-room-location">
        <MapPin size={15} />
        {room.location || "Location not listed"}
      </p>
      {roomAmenities(room.amenities).length > 0 && (
        <ul className="studio-amenities">
          {roomAmenities(room.amenities).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <p className="studio-room-detail">
        A little room for your next big idea.
      </p>
      <button
        type="button"
        onClick={() => onBook(room)}
        className="studio-card-action"
      >
        Request this room <ArrowUpRight size={19} />
      </button>
    </div>
  </article>
);

export default RoomCard;
