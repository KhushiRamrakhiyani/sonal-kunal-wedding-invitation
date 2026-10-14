/**
 * Wedding Calendar Integration
 * Exports iCalendar (.ics) format and creates Google Calendar links
 * for all celebrations of Kunal Weds Sonal.
 */
class WeddingCalendar {
  static downloadICS() {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Kunal Weds Sonal//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',

      // 1. Guru Ghar Aaye & Mehendi Ceremony
      'BEGIN:VEVENT',
      'SUMMARY:Guru Ghar Aaye & Mehendi - Kunal Weds Sonal',
      'DESCRIPTION:Divine blessings & joyful beginnings: Guru Ghar Aaye followed by Mehendi Ceremony.',
      'LOCATION:Our Residence\\, B-301\\, Shikhar Shine\\, Nana Chiloda\\, Ahmedabad - 382330',
      'DTSTART:20261110T053000Z', // 11:00 AM IST (UTC+5:30)
      'DTEND:20261110T173000Z',   // 11:00 PM IST
      'STATUS:CONFIRMED',
      'END:VEVENT',

      // 2. Sacred Thread Ceremony
      'BEGIN:VEVENT',
      'SUMMARY:Sacred Thread Ceremony - Kunal & Yuvraj Lalwani',
      'DESCRIPTION:Sacred Traditions & Blessings: Sacred Thread Ceremony of Kunal & Yuvraj Lalwani.',
      'LOCATION:Our Sweet Home',
      'DTSTART:20261111T053000Z', // 11:00 AM IST
      'DTEND:20261111T093000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',

      // 3. Behrana Sahib
      'BEGIN:VEVENT',
      'SUMMARY:Behrana Sahib - Kunal Weds Sonal',
      'DESCRIPTION:An Evening of Divine Blessings with devotion and blessings from Jhulelal Sai.',
      'LOCATION:Our Sweet Home',
      'DTSTART:20261111T143000Z', // 8:00 PM IST
      'DTEND:20261111T173000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',

      // 4. Carnival
      'BEGIN:VEVENT',
      'SUMMARY:Carnival - Colours of Joy, A Splash of Fun',
      'DESCRIPTION:Let the laughter and celebrations begin at Shayona Farm.',
      'LOCATION:Shayona Farm\\, Nana Chiloda\\, Ahmedabad - 382330',
      'DTSTART:20261112T063000Z', // 12:00 PM IST
      'DTEND:20261112T103000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',

      // 5. Engagement & Sangeet Night
      'BEGIN:VEVENT',
      'SUMMARY:Engagement & Sangeet Night - Kunal Weds Sonal',
      'DESCRIPTION:Dazzling moves\\, glamorous vibes\\, sparkling rings and celebration.',
      'LOCATION:Shayona Farm\\, Nana Chiloda\\, Ahmedabad - 382330',
      'DTSTART:20261112T143000Z', // 8:00 PM IST
      'DTEND:20261112T193000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',

      // 6. The Wedding Ceremony
      'BEGIN:VEVENT',
      'SUMMARY:Wedding Ceremony - Kunal Weds Sonal 💍',
      'DESCRIPTION:A Beautiful Wedlock: Two hearts\\, one promise\\, united forever.',
      'LOCATION:Shayona Farm\\, Nana Chiloda\\, Ahmedabad - 382330',
      'DTSTART:20261113T103000Z', // 4:00 PM IST
      'DTEND:20261113T150000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',

      // 7. Reception
      'BEGIN:VEVENT',
      'SUMMARY:The Reception - Kunal Weds Sonal ✨',
      'DESCRIPTION:An Evening of Love & Celebration\\, enchanting dinner and music.',
      'LOCATION:Shayona Farm\\, Nana Chiloda\\, Ahmedabad - 382330',
      'DTSTART:20261113T153000Z', // 9:00 PM IST
      'DTEND:20261113T203000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',

      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Kunal_Weds_Sonal_Wedding_Schedule.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (window.showToast) {
      window.showToast('📅 Wedding events saved to Calendar!');
    }
  }

  static openGoogleCalendar() {
    const title = encodeURIComponent('Wedding Ceremony - Kunal Weds Sonal 💍');
    const details = encodeURIComponent('A Beautiful Wedlock: Bound by love, blessed by destiny, united forever. Join us as Kunal Lalwani & Sonal Saheta tie the sacred knot.');
    const location = encodeURIComponent('Shayona Farm, Nana Chiloda, Ahmedabad – 382330');
    // 13 Nov 2026, 4:00 PM IST to 11:30 PM IST (20261113T103000Z to 20261113T180000Z)
    const dates = '20261113T103000Z/20261113T180000Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  }
}

window.WeddingCalendar = WeddingCalendar;
