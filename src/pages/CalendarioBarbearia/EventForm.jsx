import React from 'react';
import moment from 'moment';
import APIS from '../../api/Calendar/Calendar';

const EventForm = ({ events, setEvents }) => {
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

  return null;
};

export default EventForm;