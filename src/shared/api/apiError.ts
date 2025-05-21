export const extractErrorLogData = ({ message, response, config }) => {
  return {
    message,
    status: response.status,
    statusText: response.statusText,
    data: response.data,
    config: {
      url: config.url,
      method: config.method,
      headers: config.headers,
    },
  };
};
