import * as config from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchData = fetch(url);

    const res = await Promise.race([fetchData, timeout(config.TIMEOUT_SEC)]);
    const { data } = await res.json();
    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchData = fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchData, timeout(config.TIMEOUT_SEC)]);
    const { data } = await res.json();
    if (!res.ok) throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    if (!uploadData) {
      return getJSON(url);
    }
    if (uploadData) {
      return sendJSON(url, uploadData);
    }
  } catch (err) {
    throw err;
  }
};
