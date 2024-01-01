import React, { Component } from 'react';
import axios from 'axios';
import { apiUrl, netErrorMsg, facebookId, apiAccessKey,apiUserId } from "../config/constant";
const instance = axios.create({
  baseURL: 'apiUrl',
  timeout: 5000,
  headers: {
    'Accept-Version': 1,
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
	'api-key':apiAccessKey,
	'user-id':apiUserId, 
  },
});

export default instance;


