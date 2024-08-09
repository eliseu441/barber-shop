import React, { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import APIS from '../../api/Calendar/Calendar';
import Preloader from "../../layout/preLoader/Preloader.jsx";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br'); // Configura a localidade para português do Brasil

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  document.addEventListener('DOMContentLoaded', () => {
    const monthTranslations = {
      'January': 'janeiro',
      'February': 'fevereiro',
      'March': 'março',
      'April': 'abril',
      'May': 'maio',
      'June': 'junho',
      'July': 'julho',
      'August': 'agosto',
      'September': 'setembro',
      'October': 'outubro',
      'November': 'novembro',
      'December': 'dezembro'
    };
  
    const toolbarLabel = document.querySelector('.rbc-toolbar-label');
    if (toolbarLabel) {
      const [month, year] = toolbarLabel.textContent.split(' ');
      const translatedMonth = monthTranslations[month];
      if (translatedMonth) {
        toolbarLabel.textContent = `${translatedMonth} ${year}`;
      }
    }
  });

  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getDates();
  }, []);

  async function getDates() {
    try {
      const response = await APIS.allDates();
      const formattedEvents = response.data.map(event => ({
        id: event.id, // Supondo que o evento tenha um ID
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      setData(formattedEvents);
    } catch (err) {
      throw err;
    }
  }

  const handleSelectSlot = async ({ start, end }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
      const newEvent = { title, start: formattedStart, end_time: formattedEnd, description: '', user_id: 1, viewer_id: 1 };

      try {
        const response = await APIS.insertDates(newEvent);
        setEvents([...events, response.data]);
      } catch (error) {
        console.error('Erro ao criar evento:', error);
        alert('Erro ao criar evento. Tente novamente.');
      }
    }
  };

  const handleDeleteEvent = async (event) => {
    if (window.confirm(`Deseja realmente deletar o evento "${event.title}"?`)) {
      try {
        await APIS.deleteDate(event.id);
        setEvents(events.filter(e => e.id !== event.id));
      } catch (error) {
        console.error('Erro ao deletar evento:', error);
        alert('Erro ao deletar evento. Tente novamente.');
      }
    }
  };

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

  return (
    <div className="pagina-calendario col-sm-12 d-flex justify-content-center align-items-center">
      {isLoading ? <Preloader /> : <></>}
      <Calendar
        selectable
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleDeleteEvent} // Adicionando a função de deletar ao selecionar o evento
        messages={messages}
        style={{
          height: '90vh',
          width: '90%',
          backgroundColor: 'rgb(255, 255, 255)',
          padding: '10px',
          borderRadius: '5px',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '1rem',
          textAlign: 'center!important',
          color: 'black'
        }}
      />

    </div>
  );
};

export default Calendario;