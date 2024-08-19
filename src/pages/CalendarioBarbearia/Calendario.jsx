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
  const [closeAdvice, setCloseAdvice] = useState(true);


  useEffect(() => {
    console.log('Usuário:', usuario);
    console.log('Perfil:', perfil);

    const fetchEvents = async () => {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();

    const intervalId = setInterval(() => {
      fetchEvents();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [usuario, perfil]);

  useEffect(() => {
    function darkenColor(hex, percent) {
      // Converte o hex para RGB
      const r = parseInt(hex.substring(1, 3), 16);
      const g = parseInt(hex.substring(3, 5), 16);
      const b = parseInt(hex.substring(5, 7), 16);

      // Aplica o fator de escurecimento
      const darken = (value) => Math.max(0, Math.min(255, Math.floor(value * (1 - percent))));

      const dr = darken(r);
      const dg = darken(g);
      const db = darken(b);

      // Converte de volta para hex
      const toHex = (num) => num.toString(16).padStart(2, '0');
      return `#${toHex(dr)}${toHex(dg)}${toHex(db)}`;
    }

    function getDarkPrimaryColor() {
      // Lista de cores primárias exceto vermelho
      const primaryColors = ['#0000FF', '#00FF00', '#FFFF00']; // Azul, Verde, Amarelo
      const randomIndex = Math.floor(Math.random() * primaryColors.length);
      const color = primaryColors[randomIndex];
      return darkenColor(color, 0.3); // Escurece a cor em 30%
    }
    document.querySelectorAll('.rbc-event').forEach(event => {
      event.style.backgroundColor = getDarkPrimaryColor();
    })
  }, [events, closeAdvice]);

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

  const handleSelectSlot = async ({ start, end }) => {
    if (perfil !== 1) {
      alert('Agendamento não permitido para este usuário.');
      return;
    }

    // Cria uma instância do momento para a data e hora atual
    const today = moment().startOf('day'); // Começa no início do dia atual

    // Usa moment para comparar datas
    const startMoment = moment(start).startOf('minute'); // Início do evento
    const endMoment = moment(end).startOf('minute'); // Fim do evento

    if (startMoment.isBefore(today)) {
      alert('Não é permitido agendar para uma data anterior ao dia atual.');
      return;
    }

    if (startMoment.isSameOrAfter(endMoment)) {
      alert('O evento deve começar antes de terminar.');
      return;
    }

    if (!startMoment.isSame(endMoment, 'day')) {
      alert('O evento deve começar e terminar no mesmo dia.');
      return;
    }

    // Verifica se há colisão com eventos existentes
    const isCollision = events.some(event =>
      startMoment.isBefore(moment(event.end)) &&
      endMoment.isAfter(moment(event.start))
    );

    if (isCollision) {
      alert('O horário do novo agendamento colide com um agendamento existente.');
      return;
    }

    const title = window.prompt('Novo agendamento:');
    if (title) {
      const formattedStart = startMoment.format('YYYY-MM-DDTHH:mm:ss');
      const formattedEnd = endMoment.format('YYYY-MM-DDTHH:mm:ss');
      const newEvent = { title, start: formattedStart, end_time: formattedEnd, description: '', user_id: 1, viewer_id: 1 };

      try {
        const response = await APIS.insertDates(newEvent);
        setEvents(prevEvents => [...prevEvents, response.data]); // Atualiza o estado de forma imutável
      } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        alert('Erro ao criar agendamento. Tente novamente.');
      }
    }
    window.location.reload()()
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
    window.location.reload()
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
    <>
      {closeAdvice ?
        <div class="button-calendar " onClick={e=> setCloseAdvice(false)}>

          <div class="card ">
            <div class="message-text-container">
              <p class="message-text">Informações de uso</p>
              <p class="sub-text">apenas um horario por dia pode ser agendado, <br></br>para agendar clique no <p style={{ color: 'red', fontWeight: 'bolder' }}>numero do dia destacado em azul!</p></p>

            </div>


          </div>
        </div>
        : <></>}
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
    </>
  );
};

export default Calendario;