import axios from 'axios';

const FXSTREET_BASE_URL = 'https://calendar-api.fxstreet.com';

export const fetchEconomicIndicators = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${FXSTREET_BASE_URL}/v1/eventDates`, {
      params: {
        start: startDate,
        end: endDate
      },
      headers: {
        'Authorization': `Bearer ${process.env.FXSTREET_API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from FXStreet:', error.message);
    throw error;
  }
};