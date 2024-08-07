import API from '../Api';
class calendarEdit {
    allDates = async () => {

        try {
            const response = await API.get(`/allCalendar`);

                return response;
            

            return [];

        } catch (err) {
            throw err;
        }

    };
    insertDates = async (params) => {

        try {
            const response = await API.post(`/createSchedule`, params);

                return response;
            

            return [];

        } catch (err) {
            throw err;
        }

    };
}

export default new calendarEdit();