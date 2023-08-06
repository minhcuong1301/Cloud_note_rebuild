import axiosClient from "./axiosClient";
const userApi = {
  register(data) {
    const url = `/register`;
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "/login";
    return axiosClient.post(url, data);
  },
  refreshToken() {
    return axiosClient.post("/refesh-token");
  },
  update(data, id) {
    const url = "/user/" + id;
    return axiosClient.patch(url, data);
  },
  delete(id, data) {
    const url = "/user/" + id;
    return axiosClient.post(url, data);
  },
  getAll(id) {
    const url = "/allUsers/" + id;
    return axiosClient.get(url);
  },
  lock2(id, data) {
    const url = "/create-pass-2/" + id;
    return axiosClient.post(url, data);
  },
  open2(id, data) {
    const url = "/open-pass-2/" + id;
    return axiosClient.post(url, data);
  },
  getNewUsers() {
    const url = "/lastUser";
    return axiosClient.get(url);
  },
  profile(id) {
    const url = "/profile/" + id;
    return axiosClient.get(url);
  },
  search(key) {
    const url = "/notes_search?key=" + key;
    return axiosClient.get(url);
  },
  userOnline() {
    const url = "/login";
    return axiosClient.get(url);
  },
  updateProfile(userId, updatedFields) {
    const url = `/profile/change_Profile/${userId}`;
    return axiosClient.patch(url, updatedFields);
  }
};

export default userApi;
