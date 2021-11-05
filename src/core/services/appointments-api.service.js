import http from "./http-common"

class AppointmentsApiService{

    updateAppointment(id, data) {
        return http.put(`/appointments/${id}`, data);
    }

    getAppointmentId(id) {
        return http.get(`/appointments/${id}`);
    }
}

export default new AppointmentsApiService();