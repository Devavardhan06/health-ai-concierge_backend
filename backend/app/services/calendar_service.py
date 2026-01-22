from google.oauth2 import service_account
from googleapiclient.discovery import build
from datetime import datetime
import pytz


SCOPES = ["https://www.googleapis.com/auth/calendar"]
SERVICE_ACCOUNT_FILE = "credentials.json"
CALENDAR_ID = "primary"
TIME_ZONE = "Asia/Kolkata"

tz = pytz.timezone(TIME_ZONE)


credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE,
    scopes=SCOPES
)

service = build("calendar", "v3", credentials=credentials)



def get_existing_events(start, end):
    """
    Always returns a list.
    Ensures RFC3339 timezone-compliant timestamps.
    """

    # 🔑 Ensure timezone-aware datetimes
    if start.tzinfo is None:
        start = tz.localize(start)
    if end.tzinfo is None:
        end = tz.localize(end)

    events_result = service.events().list(
        calendarId=CALENDAR_ID,
        timeMin=start.isoformat(),
        timeMax=end.isoformat(),
        singleEvents=True,
        orderBy="startTime"
    ).execute()

    events = []

    for event in events_result.get("items", []):
        events.append({
            "start": datetime.fromisoformat(
                event["start"]["dateTime"].replace("Z", "")
            ),
            "end": datetime.fromisoformat(
                event["end"]["dateTime"].replace("Z", "")
            )
        })

    return events  # ✅ ALWAYS a list



def create_event(start, end, summary, description):
    """
    Creates a Google Calendar event with proper timezone.
    """

    if start.tzinfo is None:
        start = tz.localize(start)
    if end.tzinfo is None:
        end = tz.localize(end)

    event = {
        "summary": summary,
        "description": description,
        "start": {
            "dateTime": start.isoformat(),
            "timeZone": TIME_ZONE
        },
        "end": {
            "dateTime": end.isoformat(),
            "timeZone": TIME_ZONE
        },
    }

    return service.events().insert(
        calendarId=CALENDAR_ID,
        body=event
    ).execute()
