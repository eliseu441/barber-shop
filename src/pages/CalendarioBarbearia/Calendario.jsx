import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importar o locale do moment para português
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Importar os estilos do calendário
import APIS from '../../api/Calendar/Calendar'; 

// Configurar o moment para usar o locale em português
moment.locale('pt-br');

const localizer = momentLocalizer(moment);

// Definir as traduções para o calendário
const messages = {
  allDay: 'Dia inteiro',
  previous: 'Anterior',
  next: 'Próximo',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'Não há eventos neste intervalo.',
  showMore: total => `+ Ver mais (${total})`
};

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

  const handleSelectSlot = async ({ start, end }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zerar horas para comparar apenas a data

    if (start < today) {
      alert('Não é possível agendar eventos em datas anteriores a hoje.');
      return;
    }

    // Verificar se o evento começa e termina no mesmo dia
    if (start.toDateString() !== end.toDateString()) {
      alert('O evento deve começar e terminar no mesmo dia.');
      return;
    }

    const isCollision = events.some(event => 
      (start < event.end && end > event.start)
    );

    if (isCollision) {
      alert('O horário do novo evento colide com um evento existente.');
      return;
    }

    const title = window.prompt('Novo evento:');
    if (title) {
      const formattedStart = moment(start).format('YYYY-MM-DDTHH:mm:ss');
      const formattedEnd = moment(end).format('YYYY-MM-DDTHH:mm:ss');
      const newEvent = { title, start: formattedStart, end_time: formattedEnd, description: '', userId: 1 }; // Supondo userId = 1

      try {
        return console.log(newEvent)
        const response = await APIS.insertDates({ newEvent });
        setEvents([...events, response.data]);
      } catch (error) {
        console.error('Erro ao criar evento:', error);
        alert('Erro ao criar evento. Tente novamente.');
      } 
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
        messages={messages} // Adicionar as mensagens traduzidas
        style={{
          height: '100vh',
          backgroundColor: '#f8f9fa', 
          padding: '20px',
          borderRadius: '10px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          fontFamily: 'Arial, sans-serif', 
          textAlign: 'center!important',
          color: '#333'
        }}
      />
    </div>
  );
};

export default Calendario;