import instance from "@/utils/axios.utils";

const achievements = {
   create: (data: any, id: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `achievements/${id}/`;
      instance()
        .post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.message);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  update: (data: any, id: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `achievements/${id}/`;
      instance()
        .patch(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.message);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  delete: (body, id) => {
    return new Promise((resolve, reject) => {
      const url = `achievements/${id}/`; // id = userId

      instance()
        .delete(url, { data: body }) // <-- body goes here
        .then((res) => resolve(res.data))
        .catch((error) => {
          if (error.response) {
            reject(error.response.message);
          } else {
            reject(error);
          }
        });
    });
  },
};

export default achievements;
