import instance from "@/utils/axios.utils";

const job = {
  list: (page, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `jobs/?page=${page}&is_approved=true`;
      if (body?.search) {
        url += `&search=${encodeURIComponent(body.search)}`;
      }
      if (body?.ordering) {
        url += `&ordering=${encodeURIComponent(body.ordering)}`;
      }
      if (body.category) {
        url += `&category=${encodeURIComponent(body.category)}`;
      }
      if (body.location) {
        url += `&location_id=${encodeURIComponent(body.location)}`;
      }

      if (body.jobTypes) {
        url += `&job_type=${encodeURIComponent(body.jobTypes)}`;
      }
       if (body.experience) {
        url += `&experience=${encodeURIComponent(body.experience)}`;
      }

      if (body.created_by) {
        url += `&created_by=${body.created_by}`;
      }

      if (body.salary_range) {
        url += `&salary_range=${body.salary_range}`;
      }

      if (body.tags) {
        url += `&tags=${body.tags}`;
      }

      if (body.date_posted_before) {
        url += `&date_posted_before=${body.date_posted_before}`;
      }

      if (body.date_posted_after) {
        url += `&date_posted_after=${body.date_posted_after}`;
      }
      
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
    return promise;
  },

  create: (data: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `jobs/`;
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
    return promise;
  },

  update: (data: any, id: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `jobs/${id}/`;
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

  delete: (id: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `jobs/${id}/`;
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
    return promise;
  },

  details: (id: any) => {
    let promise = new Promise((resolve, reject) => {
      let url = `jobs/${id}/`;
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
    return promise;
  },
};

export default job;
