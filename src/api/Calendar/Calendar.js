import API from '../Api';
class calendarEdit {
    insertDates = async (params) => {

        try {
            const response = await API.post(`/createSchedule`, params);

            if (response.status === 200) {
                const data = response.data;
                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }

    };
}

export default new calendarEdit();