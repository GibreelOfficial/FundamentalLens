import React, { useState, useEffect } from 'react';

const GAUGES = {
  inflation: { target: 0.02, label: "2% Gauge" },
  gdp: { min: 0.005, max: 0.0075, label: "0.5% - 0.75% QoQ Gauge" },
  unemployment: { min: 0.035, max: 0.045, label: "3.5% - 4.5% Gauge" },
  pmi: { target: 50, label: "50 Expansion/Contraction" }
};

export default function Dashboard() {
  const [currencies, setCurrencies] = useState([
    {
      code: 'AUD',
      interestRate: 0.0435,
      inflationRate: 0.038,
      unemploymentRate: 0.041,
      gdpGrowth: 0.002,
      pmi: 49.5,
      bias: 'Indecisive'
    },
    {
      code: 'GBP',
      interestRate: 0.05,
      inflationRate: 0.022,
      unemploymentRate: 0.038,
      gdpGrowth: 0.006,
      pmi: 52.4,
      bias: 'Bullish'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-950 p-4 border border-gray-800 rounded">
          <h3 className="text-sm text-gray-400">Inflation Target</h3>
          <p className="text-lg font-semibold text-amber-500">{(GAUGES.inflation.target * 100)}%</p>
        </div>
        <div className="bg-gray-950 p-4 border border-gray-800 rounded">
          <h3 className="text-sm text-gray-400">PMI Expansion Line</h3>
          <p className="text-lg font-semibold text-amber-500">{GAUGES.pmi.target}</p>
        </div>
        <div className="bg-gray-950 p-4 border border-gray-800 rounded">
          <h3 className="text-sm text-gray-400">Unemployment Range</h3>
          <p className="text-lg font-semibold text-amber-500">{(GAUGES.unemployment.min * 100)}% - {(GAUGES.unemployment.max * 100)}%</p>
        </div>
        <div className="bg-gray-950 p-4 border border-gray-800 rounded">
          <h3 className="text-sm text-gray-400">GDP Target QoQ</h3>
          <p className="text-lg font-semibold text-amber-500">{(GAUGES.gdp.min * 100)}% - {(GAUGES.gdp.max * 100)}%</p>
        </div>
      </div>

      <div className="bg-gray-950 border border-gray-800 rounded overflow-hidden">
        <div className="p-4 border-b border-gray-800 bg-gray-900/50">
          <h2 className="text-lg font-bold">Currency Fundamental Metrics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900 text-gray-400 text-sm border-b border-gray-800">
                <th className="p-3">Currency</th>
                <th className="p-3">Interest Rate</th>
                <th className="p-3">Inflation (YoY)</th>
                <th className="p-3">Unemployment</th>
                <th className="p-3">GDP Growth</th>
                <th className="p-3">PMI</th>
                <th className="p-3">Bias Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {currencies.map((currency) => (
                <tr key={currency.code} className="hover:bg-gray-900/30">
                  <td className="p-3 font-bold text-amber-500">{currency.code}</td>
                  <td className="p-3">{(currency.interestRate * 100).toFixed(2)}%</td>
                  <td className={`p-3 ${currency.inflationRate > GAUGES.inflation.target ? 'text-red-400' : 'text-emerald-400'}`}>
                    {(currency.inflationRate * 100).toFixed(1)}%
                  </td>
                  <td className="p-3">{(currency.unemploymentRate * 100).toFixed(1)}%</td>
                  <td className="p-3">{(currency.gdpGrowth * 100).toFixed(2)}%</td>
                  <td className={`p-3 ${currency.pmi >= GAUGES.pmi.target ? 'text-emerald-400' : 'text-red-400'}`}>
                    {currency.pmi}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      currency.bias === 'Bullish' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      currency.bias === 'Bearish' ? 'bg-red-950 text-red-400 border border-red-800' :
                      'bg-gray-800 text-gray-400 border border-gray-700'
                    }`}>
                      {currency.bias}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}