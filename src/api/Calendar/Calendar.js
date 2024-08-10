import API from '../Api';
class calendarEdit {
    allDates = async () => {

        try {
            const response = await API.get(`/allCalendar`);

                return response;

        } catch (err) {
            throw err;
        }

    };
    insertDates = async (params) => {

        try {
            const response = await API.post(`/createSchedule`, params);

                return response;

        } catch (err) {
            throw err;
        }

    };
    insertUsers = async (params) => {

        try {
            const response = await API.post(`/createUser`, params);
                return response;

        } catch (err) {
            throw err;
        }

    };
    findUser = async (params) => {
        try {
            console.log(params)
            const response = await API.get(`/findUser`, {params});
            return response;
        } catch (err) {
            throw err;
        }
    };
}

export default new calendarEdit();