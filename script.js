// src/components/Register.js
import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send registration data to the server for authentication
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
// src/components/Chart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Power Generation',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  useEffect(() => {
    // Simulate real-time data updates, replace with actual data source
    const interval = setInterval(() => {
      const now = new Date();
      const newLabels = [...data.labels, now.toLocaleTimeString()];
      const newData = [...data.datasets[0].data, Math.random() * 100]; // Replace with actual data

      if (newLabels.length > 10) {
        newLabels.shift();
        newData.shift();
      }

      setData({
        labels: newLabels,
        datasets: [
          {
            ...data.datasets[0],
            data: newData,
          },
        ],
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div>
      <h2>Real-time Power Generation Chart</h2>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export default Chart;
// src/components/DeviceIntegration.js
import React, { useState, useEffect } from 'react';

const DeviceIntegration = () => {
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate an API call to fetch device data
    setLoading(true);
    fetch('/api/device-data') // Replace with the actual device API endpoint
      .then((response) => response.json())
      .then((data) => {
        setDeviceData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching device data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Device Integration</h2>
      {loading ? (
        <p>Loading device data...</p>
      ) : deviceData ? (
        <div>
          <h3>Device Data</h3>
          <pre>{JSON.stringify(deviceData, null, 2)}</pre>
        </div>
      ) : (
        <p>No data available from the device.</p>
      )}
    </div>
  );
};

export default DeviceIntegration;
// src/components/Notification.js
import React from 'react';

const Notification = () => {
  const showNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Solar System Alert', {
        body: 'There is an issue with your solar energy system.',
        icon: '/solar-icon.png', // Replace with your own icon URL
      });
    } else if ('Notification' in window) {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            showNotification();
          }
        })
        .catch((error) => {
          console.error('Error requesting notification permission:', error);
        });
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <button onClick={showNotification}>Show Notification</button>
    </div>
  );
};

export default Notification;// JavaScript to fetch weather data
const weatherDataElement = document.getElementById('weather-data');

async function getWeatherData() {
  try {
    const apiKey = 'YOUR_API_KEY';
    const city = 'YourCityName';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    weatherDataElement.textContent = `Temperature: ${temperature}°C, Description: ${description}`;
  } catch (error) {
    weatherDataElement.textContent = 'Error fetching weather data.';
  }
}

getWeatherData();
// src/components/EnergyConsumption.js
import React, { useState } from 'react';

const EnergyConsumption = () => {
  const [currentConsumption, setCurrentConsumption] = useState(0);
  const [solarProduction, setSolarProduction] = useState(0);

  const handleCurrentConsumptionChange = (e) => {
    setCurrentConsumption(parseFloat(e.target.value));
  };

  const handleSolarProductionChange = (e) => {
    setSolarProduction(parseFloat(e.target.value));
  };

  const savings = solarProduction - currentConsumption;

  return (
    <div>
      <h2>Energy Consumption Monitoring and Savings Calculator</h2>
      <div>
        <label htmlFor="currentConsumption">Current Consumption (kWh):</label>
        <input
          type="number"
          id="currentConsumption"
          value={currentConsumption}
          onChange={handleCurrentConsumptionChange}
        />
      </div>
      <div>
        <label htmlFor="solarProduction">Solar Production (kWh):</label>
        <input
          type="number"
          id="solarProduction"
          value={solarProduction}
          onChange={handleSolarProductionChange}
        />
      </div>
      <div>
        <p>Savings: {savings} kWh</p>
      </div>
    </div>
  );
};

export default EnergyConsumption;
// src/components/CostSavingsCalculator.js
import React, { useState, useEffect } from 'react';

const CostSavingsCalculator = () => {
  const [energyProduction, setEnergyProduction] = useState(0);
  const [energyConsumption, setEnergyConsumption] = useState(0);
  const [energyCost, setEnergyCost] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    // Simulate fetching energy production, consumption, and cost data.
    // Replace with actual data from your monitoring system or API.

    // For this example, we simulate data:
    setEnergyProduction(5000); // kWh
    setEnergyConsumption(6000); // kWh
    setEnergyCost(0.1); // $ per kWh
  }, []);

  useEffect(() => {
    // Calculate cost savings
    setSavings((energyConsumption - energyProduction) * energyCost);
  }, [energyConsumption, energyProduction, energyCost]);

  return (
    <div>
      <h2>Cost Savings Calculator</h2>
      <div>
        <p>Energy Production (kWh): {energyProduction}</p>
        <p>Energy Consumption (kWh): {energyConsumption}</p>
        <p>Energy Cost ($ per kWh): {energyCost}</p>
      </div>
      <div>
        <h3>Cost Savings:</h3>
        <p>${savings}</p>
      </div>
    </div>
  );
};

export default CostSavingsCalculator;
// src/components/HistoricalData.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const HistoricalData = () => {
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-01-31');
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    // Simulate fetching historical data for the selected time period.
    // Replace with actual data from your system or API.

    // For this example, we simulate data for 31 days.
    const data = [];
    const currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      data.push({
        date: currentDate.toISOString().split('T')[0],
        production: Math.random() * 50, // Simulated production data
        consumption: Math.random() * 50, // Simulated consumption data
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    setHistoricalData(data);
  }, [startDate, endDate]);

  // Prepare data for the chart
  const chartData = {
    labels: historicalData.map((data) => data.date),
    datasets: [
      {
        label: 'Energy Production (kWh)',
        data: historicalData.map((data) => data.production),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Energy Consumption (kWh)',
        data: historicalData.map((data) => data.consumption),
        fill: false,
        borderColor: 'rgba(192,75,75,1)',
      },
    ],
  };

  return (
    <div>
      <h2>Historical Data</h2>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <Line data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default HistoricalData;
// src/components/LocationBasedData.js
import React, { useState, useEffect } from 'react';

const LocationBasedData = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [solarIrradiance, setSolarIrradiance] = useState(null);
  const [localIncentives, setLocalIncentives] = useState([]);

  useEffect(() => {
    // Use the Geolocation API to get the user's latitude and longitude
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        // Fetch sunrise and sunset times
        fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`)
          .then((response) => response.json())
          .then((data) => {
            setSunrise(data.results.sunrise);
            setSunset(data.results.sunset);
          })
          .catch((error) => {
            console.error('Error fetching sunrise and sunset times:', error);
          });

        // Fetch solar irradiance data
        fetch(`https://api.example.com/solar-irradiance?lat=${latitude}&lng=${longitude}`)
          .then((response) => response.json())
          .then((data) => {
            setSolarIrradiance(data.irradiance);
          })
          .catch((error) => {
            console.error('Error fetching solar irradiance data:', error);
          });

        // Fetch local incentives
        fetch(`https://api.example.com/local-incentives?lat=${latitude}&lng=${longitude}`)
          .then((response) => response.json())
          .then((data) => {
            setLocalIncentives(data.incentives);
          })
          .catch((error) => {
            console.error('Error fetching local incentives data:', error);
          });
      });
    }
  }, [latitude, longitude]);

  return (
    <div>
      <h2>Location-Based Data</h2>
      <div>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
      </div>
      <div>
        <p>Sunrise Time: {sunrise}</p>
        <p>Sunset Time: {sunset}</p>
      </div>
      <div>
        <p>Solar Irradiance: {solarIrradiance} W/m²</p>
      </div>
      <div>
        <h3>Local Incentives</h3>
        <ul>
          {localIncentives.map((incentive, index) => (
            <li key={index}>{incentive}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationBasedData;
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    contents.forEach((c) => c.classList.remove('active'));

    tab.classList.add('active');
    contents[index].classList.add('active');
  });
});




