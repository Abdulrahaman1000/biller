import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { getOS } from "./utils";
import { userInfo } from "os";

const API = (
  method: any,
  url: any,
  data: any,
  callback: any,
  failback: any,
  token: any
) => {
  // const api = "http://127.0.0.1:8000/api/user/";
  // const api = 'http://159.223.1.96/api/user/';
  const api = "https://api.datanow.ng/api/user/882285/";
  // const api = 'https://api.billerdev.ng/api/user/';
  let parameter = "";
  if (method === "get") {
    parameter += "?";
    for (const key in data) {
      parameter += "&" + key + "=" + data[key];
    }
  }
  axios({
    method: method,
    url: api + url + parameter,
    timeout: 60000, // 60 seconds timeout
    data: method === "get" ? {} : { source: getOS(), ...data },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + (token ? token : ""),
    },
  })
    .then((response) => {
      console.log(response);
      const data = response.data;
      if (response.status === 200) {
        callback(data);
      } else if (data.errors) {
        let errorString = "";
        const objectValues = Object.values(data.errors);
        objectValues.map((error) => {
          errorString = errorString + error + ", ";
        });
        failback(errorString);
      } else {
        failback(data.message);
      }
    })
    .catch((error) => {
      console.log(error);

      if (error.response) {
        if (error.response.status === 401) {
          // const history = useNavigate();
          // history('/signin');
          localStorage.setItem("user", "[]");
          window.location.assign("/signin");
        }
        // console.log('error', error.response.data);
        let errorString = "";
        const objectValues = Object.values(error.response.data);
        objectValues.map((error) => {
          errorString = errorString + error + ", ";
        });
        failback(errorString);
      }
    });
};

export default API;
