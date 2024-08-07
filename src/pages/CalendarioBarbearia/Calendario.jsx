import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import APIS from '../../api/Calendar/Calendar'; 
import Preloader from "../../layout/preLoader/Preloader.jsx";


moment.locale('pt-br');

const localizer = momentLocalizer(moment);



const Calendario = () => {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
  }, 2000);
  getDates();
  },[]);
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

  const handleSelectSlot = async ({ start, end }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zerar horas para comparar apenas a data

    if (start < today) {
      alert('Não é possível agendar eventos em datas anteriores a hoje.');
      return;
    }

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
    <div className="pagina-calendario col-sm-12 d-flex justify-content-center align-items-center">
       {isLoading ? <Preloader /> :<Calendar
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        messages={messages} // Adicionar as mensagens traduzidas
        style={{
          height: '95vh',
          width: '95%',
          backgroundColor: 'rgb(234, 245, 255)', 
          padding: '20px',
          borderRadius: '10px', 
          fontFamily: 'Roboto, sans-serif', 
          fontSize: '1.4rem',
          textAlign: 'center!important',
          color: 'black'
        }}
      />}
      
    </div>
  );
};

export default Calendario;