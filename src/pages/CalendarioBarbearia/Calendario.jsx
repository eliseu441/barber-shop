import React, { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import APIS from '../../api/Calendar/Calendar';
import Preloader from "../../layout/preLoader/Preloader.jsx";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useAppParams } from '../../layout/AppParams/AppParams.jsx';

moment.locale('pt-br');

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const { usuario, perfil } = useAppParams();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Usuário:', usuario);
    console.log('Perfil:', perfil);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getDates();
  }, [usuario, perfil]);

  useEffect(() => {
    const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
  }, []);



  useEffect(() => {
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

    const translateMonth = () => {
      const toolbarLabel = document.querySelector('.rbc-toolbar-label');
      if (toolbarLabel) {
        const [month, year] = toolbarLabel.textContent.split(' ');
        const translatedMonth = monthTranslations[month];
        if (translatedMonth) {
          toolbarLabel.setAttribute('data-translated-month', `${translatedMonth} ${year}`);
        }
      }
    };

    translateMonth();

    const toolbarLabel = document.querySelector('.rbc-toolbar-label');
    if (toolbarLabel) {
      const observer = new MutationObserver(translateMonth);
      observer.observe(toolbarLabel, { childList: true });
    }
  }, []);

  const getDates = async () => {
    try {
      const response = await APIS.allDates();
      const formattedEvents = response.data.map(event => ({
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      setEvents(formattedEvents);
    } catch (err) {
      console.error('Erro ao buscar eventos:', err);
    }
  };

  const handleSelectSlot = async ({ start, end }) => {
    if (perfil !== 1) {
      alert('Agendamento não permitido para este usuário.');
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start.toDateString() !== end.toDateString()) {
      alert('O evento deve começar e terminar no mesmo dia.');
      return;
    }

    const isCollision = events.some(event =>
      (start < event.end && end > event.start)
    );

    if (isCollision) {
      alert('O horário do novo agendamento colide com um agendamento existente.');
      return;
    }

    const title = window.prompt('Novo agendamento:');
    if (title) {
      const formattedStart = moment(start).format('YYYY-MM-DDTHH:mm:ss');
      const formattedEnd = moment(end).format('YYYY-MM-DDTHH:mm:ss');
      const newEvent = { title, start: formattedStart, end_time: formattedEnd, description: '', user_id: 1, viewer_id: 1 };

      try {
        const response = await APIS.insertDates(newEvent);
        setEvents([...events, response.data]);
      } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        alert('Erro ao criar agendamento. Tente novamente.');
      }
    }
  };

  const handleDeleteEvent = async (event) => {
    if (window.confirm(`Deseja realmente deletar o agendamento "${event.title}"?`)) {
      try {
        await APIS.deleteDate(event.id);
        setEvents(events.filter(e => e.id !== event.id));
      } catch (error) {
        console.error('Erro ao deletar agendamento:', error);
        alert('Erro ao deletar agendamento. Tente novamente.');
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
      {isLoading && <Preloader />}
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleDeleteEvent}
        messages={messages}
        style={{
          height: '90vh',
          width: '90%',
          backgroundColor: 'rgb(200, 200, 200)',
          padding: '10px',
          borderRadius: '5px',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '1rem',
          color: 'black'
        }}
      />
    </div>
    
  );
};

export default Calendario;
