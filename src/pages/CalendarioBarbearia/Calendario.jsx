import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendario = () => {
  const [events, setEvents] = useState([
    {
      title: 'Reunião com cliente',
      start: '2023-10-10T10:00:00',
      end: '2023-10-10T12:00:00',
    },
    {
      title: 'Consulta médica',
      start: '2023-10-11T14:00:00',
      end: '2023-10-11T15:00:00',
    },
    {
      title: 'Almoço com amigo',
      start: '2023-10-12T12:00:00',
      end: '2023-10-12T13:00:00',
    },
  ]);

  const handleDateClick = (arg) => {
    const title = window.prompt('Novo evento:');
    if (title) {
      setEvents([...events, { title, start: arg.date, end: arg.date }]);
    }
  };

  return (
    <div className="pagina-calendario col-sm-12">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default Calendario;