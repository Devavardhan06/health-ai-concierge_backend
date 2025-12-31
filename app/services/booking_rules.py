def is_slot_bookable(slot, existing_events):
    if not existing_events:
        return True  # No conflicts

    for event in existing_events:
        if not (
            slot["end"] <= event["start"]
            or slot["start"] >= event["end"]
        ):
            return False

    return True
