import React, { useState, useEffect } from 'react';
import APIS from '../../api/Calendar/Calendar';

const EventLoader = ({ setEvents, setData, setIsLoading }) => {
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
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      setData(formattedEvents);
    } catch (err) {
      throw err;
    }
  }

  return null;
};

export default EventLoader;