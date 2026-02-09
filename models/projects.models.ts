import instance from "@/utils/axios.utils";

const projects = {
   create: (data: any, id: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `projects/${id}/`;
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
      let url = `projects/${id}/`;
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
      const url = `projects/${id}/`; // id = userId

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

export default projects;
