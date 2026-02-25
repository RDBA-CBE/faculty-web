import instance from "@/utils/axios.utils";

const save = {
   create: (data: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `savelists/`;
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
      let url = `savelists/${id}/`;
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

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const url = `savelists/${id}/`; // id = userId

      instance()
        .delete(url) // <-- body goes here
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

export default save;
