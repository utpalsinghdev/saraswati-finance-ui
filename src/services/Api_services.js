import BaseService from "./Base_services";

const ApiService = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            BaseService(param)
                .then((response) => {
                    resolve(response);
                })
                .catch((errors) => {
                    reject(errors);
                });
        });
    },
};

export default ApiService;