import http from "./http-common"

class PublicationsApiService{
    getAll(){
        return http.get("/publications");
    }
}

export default new PublicationsApiService();