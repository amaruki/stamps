const https = require('https')

const apiKey = '6f2f83835834f679bfb8f84d7a27dbfc'
const cityName = 'Jakarta'
const countryCode = 'ID'
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryCode}&appid=${apiKey}&units=metric`

https.get(url, (res) => {
    let data = ''

    res.on('data', (chunk) => {
        data += chunk
    })

    res.on('end', () => {
        const weatherData = JSON.parse(data)
        const dailyTemps = {}
        const dateObjects = {}

        weatherData.list.forEach(item => {
            const date = new Date(item.dt * 1000)
            const dateKey = date.toISOString().split('T')[0]

            if (!dailyTemps[dateKey]) {
                dailyTemps[dateKey] = []
                dateObjects[dateKey] = date
            }

            dailyTemps[dateKey].push(item.main.temp);
        });

        console.log("Weather Forecast:")
        Object.keys(dailyTemps).slice(0, 5).forEach(dateKey => {
            const temps = dailyTemps[dateKey]
            const avgTemp = (temps.reduce((sum, val) => sum + val, 0) / temps.length).toFixed(1)
            const formattedDate = dateObjects[dateKey].toLocaleDateString('en-GB', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            console.log(`${formattedDate}: ${avgTemp}°C`)
        });
    });

})