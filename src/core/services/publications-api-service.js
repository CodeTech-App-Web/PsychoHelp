import http from "./http-common"

class PublicationsApiService{
    getAll(){
        return http.get("/publications");
    }
    // getById(id) {
    //     return http.get(`/publications/${id}?_expand=psychologist`);
    // }

    getById(id) {
        return http.get(`/publications/${id}`);
    }

    create(data) {
        return http.post("/publications",data);
    }

    update(id, data) {
        return http.put(`/publications/${id}`, data);
    }

    delete(id) {
        return http.delete(`/publications/${id}`);
    }

    findByTitle(title) {
        return http.get(`/publications?title=${title}`);
    }
}

export default new PublicationsApiService();