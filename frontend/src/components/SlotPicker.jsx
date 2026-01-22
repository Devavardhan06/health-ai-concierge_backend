const SlotPicker = ({ slots, selectedSlot, onSlotSelect }) => {
  if (!slots || slots.length === 0) {
    return (
      <div className="slot-picker">
        <p className="no-slots">No available slots for this date</p>
      </div>
    );
  }

  return (
    <div className="slot-picker">
      <h3>Available Time Slots</h3>
      <div className="slots-grid">
        {slots.map((slot, index) => (
          <button
            key={index}
            className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
            onClick={() => onSlotSelect(slot)}
          >
            {slot.start} - {slot.end}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotPicker;