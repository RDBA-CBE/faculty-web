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

      if (body.job_role) {
        url += `&job_role_id=${encodeURIComponent(body.job_role)}`;
      }

      

      // if (body?.department) {
      //   url += `&department=${encodeURIComponent(body.department)}`;
      // }

      if (body?.department) {
        url += `&department_master_id=${encodeURIComponent(body.department)}`;
      }

      //  if (body?.job_role) {
      //   url += `&role_ids=${encodeURIComponent(body.job_role)}`;
      // }

      if (body.jobTypes) {
        url += `&job_type_id=${encodeURIComponent(body.jobTypes)}`;
      }

      if (body.colleges) {
        url += `&college=${encodeURIComponent(body.colleges)}`;
      }

      if (body.created_by) {
        url += `&created_by=${body.created_by}`;
      }

      if (body.salary_range) {
        url += `&salary_range_id=${body.salary_range}`;
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

  

      if (body.experience_id?.length > 0) {
        url += `&experience_id=${encodeURIComponent(body.experience_id)}`;
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

  appliedJobList: (userId, body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `users/${userId}/applied-jobs/`;
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

      if (body?.department) {
        url += `&department=${encodeURIComponent(body.department)}`;
      }

      if (body.jobTypes) {
        url += `&job_type_id=${encodeURIComponent(body.jobTypes)}`;
      }
      if (body.experience) {
        url += `&experience=${encodeURIComponent(body.experience)}`;
      }

      if (body.colleges) {
        url += `&college=${encodeURIComponent(body.colleges)}`;
      }

      if (body.created_by) {
        url += `&created_by=${body.created_by}`;
      }

      if (body.salary_range) {
        url += `&salary_range_id=${body.salary_range}`;
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

  filterList: (body) => {
    let promise = new Promise((resolve, reject) => {
      let url = `jobs/filters/cascade`;

      const params = [];

      if (body?.location?.length>0) {
        params.push(`location_id=${body.location}`);
      }

      // if (body?.category?.length>0) {
      //   params.push(`category_id=${body.category}`);
      // }

      if (body.job_role) {
        params.push(`job_role_id=${body.job_role}`);

      }
      if (body.category) {
        params.push(`job_category_id=${body.category}`);

      }

      if (body?.colleges?.length>0) {
        params.push(`college_id=${body.colleges}`);
      }

      if (body?.department?.length>0) {
        params.push(`department_master_id=${body.department}`);
      }

      if (body?.experience_id?.length > 0) {
        params.push(`experience_id=${encodeURIComponent(body.experience_id)}`);
      }


      

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }
      console.log('✌️url --->', url);

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
