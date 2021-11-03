import http from "../http-common";

class HistoryDataService {
  getAll() {
    return http.get("/historys");
  }

  get(timer_id) {
    return http.get(`/historys/${timer_id}`);
  }

  create(data) {
    return http.post("/historys", data);
  }

  // update(timer_id, data) {
  //   return http.put(`/historys/${timer_id}`, data);
  // }

  delete(timer_id) {
    return http.delete(`/historys/${timer_id}`);
  }

  deleteAll() {
    return http.delete(`/historys`);
  }

  // findByTitle(first_name) {
  //   return http.get(`/actors?first_name=${first_name}`);
  // }
}

export default new HistoryDataService();