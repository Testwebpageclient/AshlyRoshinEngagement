// Calendar helper for export to iCal (.ics) and Google Calendar

export interface EventDetails {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO format e.g. 20260815T160000
  endDate: string;   // ISO format e.g. 20260815T220000
}

export const ENGAGEMENT_EVENT: EventDetails = {
  title: "Ashly & Roshin Engagement Ceremony & Reception",
  description: "Join us in celebrating the Engagement of Ashly & Roshin.\\n\\nCeremony: 4:00 PM at St. Joseph's Church, Amalapuram.\\nReception: 6:00 PM at Bosco Parish Hall, Vyakulamatha Church Kaippattor.",
  location: "St. Joseph's Church, Amalapuram & Bosco Parish Hall, Vyakulamatha Church Kaippattor",
  startDate: "20260815T160000",
  endDate: "20260815T220000",
};

export function generateGoogleCalendarUrl(event = ENGAGEMENT_EVENT): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description.replace(/\\n/g, '\n'),
    location: event.location,
    dates: `${event.startDate}/${event.endDate}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(event = ENGAGEMENT_EVENT) {
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ashly and Roshin Engagement//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    `DTSTART:${event.startDate}`,
    `DTEND:${event.endDate}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Ashly & Roshin Engagement Tomorrow!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Ashly_and_Roshin_Engagement.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
