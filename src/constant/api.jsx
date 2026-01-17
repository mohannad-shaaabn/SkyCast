import axios from 'axios';


export const fetchWeather = async (city) => {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=46f6ad75f40b44aeb3b53357251903&q=${city}&days=3&aqi=no&alerts=no`;
  const res = await axios.get(url);
  return res.data;
};


export default fetchWeather;
