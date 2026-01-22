from app.models.analytics import AnalyticsEvent

def log_event(db, event_type: str, event_data: str = ""):
    event = AnalyticsEvent(
        event_type=event_type,
        event_data=event_data
    )
    db.add(event)
    db.commit()
