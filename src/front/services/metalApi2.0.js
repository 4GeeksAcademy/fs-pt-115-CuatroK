import { data } from "@remix-run/router";

const API_KEY = import.meta.env.VITE_METALS_KEY || "";
const API_URL = "https://api.metalpriceapi.com/v1/latest";
const CURRENCY = import.meta.env.CURRENCY;
const HOURS = import.meta.env.VITE_METALS_TTL_HOURS;

const getCurrentTime = () => Date.now();
const getTodayDate = () => new Date().toISOString.slice(0, 10);

const getFromCache = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveToCache = (key, data) => {
  try {
    localStorage.setItem(key , JSON.stringify(data));
  } catch {}
};

const isDataFresh = () => {
    if (!data?.fetchedAt) return false;
    const CACHE_HOURS = 24
    const maxAge = CACHE_HOURS * 60*60*1000 
    return (getCurrentTime()-data.fetchedAt) < maxAge;
}

export const getDailyMetal = async () => {
  if (!API_KEY) throw new Error("falta la API KEY");

    const goldCache = getFromCache("cuatrok:gold")
    const silverCache = getFromCache("cuatrok:silver")
   if (isDataFresh(goldCache) && isDataFresh(silverCache)){
    return { gold: goldCache, silver: silverCache }
   }



  const url = `${API_URL}?api_key=${API_KEY}&base=${CURRENCY}&currencies=XAG,XAU`;
  const response = await fetch(url);

  if (!response.ok) throw new Error(`error en la api ${response.status}`);

  const data = await response.json();

  if (!data?.rates?.XAU || !data?.rates?.XAG) {
    throw new Error("datos faltantes de la API");
  }

  const goldPrice = data.rates.XAU < 1 ? 1 / data.rates.XAU : data.rates.XAU;
  const silverPrice = data.rates.XAG < 1 ? 1 / data.rates.XAG : data.rates.XAG;

  const timestamp = getCurrentTime();
  const date = getTodayDate();

  const goldData = {
    date,
    currency:CURRENCY,
    priceOz:goldPrice,
    priceGram:goldPrice/31.1034768,
    fetchedAt:timestamp
  }
  const silverData = {

    date,
    currency:CURRENCY,
    priceOz:silverPrice,
    priceGram:silverCache/31.1034768,
    fetchedAt:timestamp
  }


  saveToCache("cuatrok:gold", goldData);
  saveToCache("cuatrok:silver", silverData);

  return { gold: goldData, silver: silverData };
};

export const getDailyGold = async () => {
    const data = await getDailyMetal()
    return data.gold
}

export const getDailySilver = async () => {
    const data = await getDailyMetal()
    return data.silver
} 