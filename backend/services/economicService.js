import axios from 'axios';

const FMP_BASE_URL = 'https://financialmodelingprep.com/api/v3/economic_calendar';

const COUNTRY_TO_CURRENCY = {
  'US': 'USD',
  'United States': 'USD',
  'AU': 'AUD',
  'Australia': 'AUD',
  'UK': 'GBP',
  'United Kingdom': 'GBP',
  'EU': 'EUR',
  'Euro Area': 'EUR',
  'CA': 'CAD',
  'Canada': 'CAD',
  'CH': 'CHF',
  'Switzerland': 'CHF',
  'JP': 'JPY',
  'Japan': 'JPY',
  'NZ': 'NZD',
  'New Zealand': 'NZD'
};

export const fetchLiveMarketCalendar = async (fromDate, toDate) => {
  try {
    const response = await axios.get(FMP_BASE_URL, {
      params: {
        from: fromDate,
        to: toDate,
        apikey: process.env.ECONOMIC_API_KEY
      }
    });

    if (!Array.isArray(response.data)) {
      return [];
    }

    return response.data
      .filter(event => event.impact === 'High' || event.impact === 'Medium')
      .map(event => ({
        id: event.date + '_' + event.event,
        timestamp: event.date,
        currency: COUNTRY_TO_CURRENCY[event.country] || event.country,
        metricName: event.event,
        actual: event.actual !== null ? parseFloat(event.actual) : null,
        consensus: event.estimate !== null ? parseFloat(event.estimate) : null,
        previous: event.previous !== null ? parseFloat(event.previous) : null
      }));
  } catch (error) {
    console.error('Production economic API error:', error.message);
    throw new Error('Failed to synchronize fundamental pipeline');
  }
};