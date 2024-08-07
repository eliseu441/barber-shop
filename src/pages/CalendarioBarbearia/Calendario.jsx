import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importar o locale do moment para português
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Importar os estilos do calendário
import APIS from '../../api/Calendar/Calendar'; 
import { useEffect } from 'preact/hooks';

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
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);

  async function getDates() {
    try {
      const response = await APIS.allDates()
      const formattedEvents = await response.data.map(event => ({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      console.log(formattedEvents)
      setData(formattedEvents);
    } catch (err) {
      throw err;
    }
  }
  useEffect(() => {
    getDates();
  },[]);
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
      const newEvent = { title, start: formattedStart, end_time: formattedEnd, description: '', user_id: 1,  viewer_id: 1 }; // Supondo userId = 1

      try {
        const response = await APIS.insertDates(newEvent);
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
        events={data}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        messages={messages} // Adicionar as mensagens traduzidas
        style={{
          height: '100vh',
          backgroundColor: 'rgb(234, 245, 255)', 
          padding: '20px',
          borderRadius: '10px', 
          fontFamily: 'Roboto, sans-serif', 
          fontSize: '1.4rem',
          textAlign: 'center!important',
          color: 'black'
        }}
      />
    </div>
  );
};

export default Calendario;