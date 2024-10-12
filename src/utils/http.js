const axios = require('axios');

const postUrl = async (parUrl, parBody, parConfig) => {
  const aArray = ['192.168.1.64'];
  const { protocol, hostname, host, pathname, search } = new URL(parUrl);
  if (aArray.includes(hostname)) return axios.post(`${protocol}${host}${pathname}${search}`, parBody, parConfig);
};

const putUrl = async (parUrl, parBody, parConfig) => {
  const aArray = ['192.168.1.64'];
  const { protocol, hostname, host, pathname, search } = new URL(parUrl);
  if (aArray.includes(hostname)) return axios.put(`${protocol}${host}${pathname}${search}`, parBody, parConfig);
};

const getUrl = async (parUrl, parConfig) => {
  const aArray = ['192.168.1.64'];
  const { protocol, hostname, host, pathname, search } = new URL(parUrl);
  if (aArray.includes(hostname)) return axios.get(`${protocol}${host}/${pathname}${search}`, parConfig);
};

const deleteUrl = async (parUrl, parConfig) => {
  const aArray = ['192.168.1.64'];
  const { protocol, hostname, host, pathname, search } = new URL(parUrl);
  if (aArray.includes(hostname)) return axios.delete(`${protocol}${host}${pathname}${search}`, parConfig);
};

module.exports = { postUrl, putUrl, getUrl, deleteUrl };
