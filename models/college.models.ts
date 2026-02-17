import instance from "@/utils/axios.utils";
import axiosWithoutToken from "@/utils/axiosWithoutToken";


const colleges = {
  // 🔓 PUBLIC API – NO TOKEN
  list: () => {
    return new Promise((resolve, reject) => {
      const url = `colleges/`;

      axiosWithoutToken()
        .get(url)
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
  },

  // 🔒 PROTECTED APIs – WITH TOKEN
  create: (data: any) => {
    return new Promise((resolve, reject) => {
      const url = `colleges/`;

      instance()
        .post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
  },

  update: (data: any, id: any) => {
    return new Promise((resolve, reject) => {
      const url = `colleges/${id}/`;

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
  },

  delete: (id: any) => {
    return new Promise((resolve, reject) => {
      const url = `colleges/${id}/`;

      instance()
        .delete(url)
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
  },

  details: (id: any) => {
    return new Promise((resolve, reject) => {
      const url = `colleges/${id}/`;

      instance()
        .get(url)
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
  },
};

export default colleges;
