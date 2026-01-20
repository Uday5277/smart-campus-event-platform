const EventCard = ({ event, onRegister }) => {
    return (
        <div className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Seats Left:</strong> {event.availableSeats}</p>
            <button 
                onClick={() => onRegister(event.id)} 
                disabled={event.availableSeats <= 0}
            >
                {event.availableSeats <= 0 ? "Event Full" : "Register Now"}
            </button>
        </div>
    );
};

export default EventCard;