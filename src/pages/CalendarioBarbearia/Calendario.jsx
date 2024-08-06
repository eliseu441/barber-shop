import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [events, setEvents] = useState([
    {
      title: 'Reunião com cliente',
      start: new Date(2023, 9, 10, 10, 0), // 10 de Outubro de 2023, 10:00 AM
      end: new Date(2023, 9, 10, 12, 0),   // 10 de Outubro de 2023, 12:00 PM
    },
    {
      title: 'Consulta médica',
      start: new Date(2023, 9, 11, 14, 0), // 11 de Outubro de 2023, 2:00 PM
      end: new Date(2023, 9, 11, 15, 0),   // 11 de Outubro de 2023, 3:00 PM
    },
    {
      title: 'Almoço com amigo',
      start: new Date(2023, 9, 12, 12, 0), // 12 de Outubro de 2023, 12:00 PM
      end: new Date(2023, 9, 12, 13, 0),   // 12 de Outubro de 2023, 1:00 PM
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Novo evento:');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  return (
    <div className="pagina-calendario col-sm-12">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: '80vh' }}
      />
    </div>
  );
};

export default Calendario;