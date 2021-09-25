import http from "./http-common"

class PatientApiService{
    getAll(){
        return http.get("/patients");
    }
    getById(id) {
        return http.get(`/patients/${id}`);
    }

    create(data) {
        return http.post("/patients", data);
    }

    update(id, data) {
        return http.put(`/patients/${id}`, data);
    }

    delete(id) {
        return http.delete(`/patients/${id}`);
    }

    findByName(name) {
        return http.get(`/patients?name=${name}`);
    }

    findByEmail(email) {
        return http.get(`/patients?email=${email}`);
    }
}

export default new PatientApiService();