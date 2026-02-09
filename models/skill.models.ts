import instance from "@/utils/axios.utils";

const skill = {

  create: (data: any, id: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `skills/${id}/`;
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
      let url = `skills/${id}/`;
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
      const url = `skills/${id}/`; // id = userId

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

export default skill;
