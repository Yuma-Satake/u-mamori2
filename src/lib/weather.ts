// OpenWeather API types
export interface WeatherData {
	main: {
		temp: number;
		pressure: number;
		humidity: number;
	};
	weather: Array<{
		id: number;
		main: string;
		description: string;
		icon: string;
	}>;
	name: string;
	dt: number;
}

export interface ForecastData {
	list: Array<{
		dt: number;
		main: {
			pressure: number;
			humidity: number;
		};
		weather: Array<{
			id: number;
			main: string;
			description: string;
			icon: string;
		}>;
	}>;
}

// Gifu City coordinates
const GIFU_LAT = 35.4229;
const GIFU_LON = 136.7604;

export async function getCurrentWeather(): Promise<WeatherData> {
	const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

	if (!apiKey) {
		throw new Error("OpenWeather API key is not configured");
	}

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${GIFU_LAT}&lon=${GIFU_LON}&appid=${apiKey}&units=metric`,
	);

	if (!response.ok) {
		throw new Error("Failed to fetch weather data");
	}

	return response.json();
}

export async function getForecast(): Promise<ForecastData> {
	const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

	if (!apiKey) {
		throw new Error("OpenWeather API key is not configured");
	}

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?lat=${GIFU_LAT}&lon=${GIFU_LON}&appid=${apiKey}&units=metric&cnt=8`,
	);

	if (!response.ok) {
		throw new Error("Failed to fetch forecast data");
	}

	return response.json();
}

export function getPressureChange(
	currentPressure: number,
	nextPressure: number,
): {
	change: number;
	trend: "rising" | "falling" | "stable";
} {
	const change = nextPressure - currentPressure;
	let trend: "rising" | "falling" | "stable";

	if (Math.abs(change) < 1) {
		trend = "stable";
	} else if (change > 0) {
		trend = "rising";
	} else {
		trend = "falling";
	}

	return { change, trend };
}

export function getWeatherIcon(weatherCode: string): string {
	// Weather icon mapping
	const iconMap: Record<string, string> = {
		"01d": "☀️", // clear sky day
		"01n": "🌙", // clear sky night
		"02d": "⛅", // few clouds day
		"02n": "☁️", // few clouds night
		"03d": "☁️", // scattered clouds
		"03n": "☁️",
		"04d": "☁️", // broken clouds
		"04n": "☁️",
		"09d": "🌧️", // shower rain
		"09n": "🌧️",
		"10d": "🌦️", // rain day
		"10n": "🌧️", // rain night
		"11d": "⛈️", // thunderstorm
		"11n": "⛈️",
		"13d": "❄️", // snow
		"13n": "❄️",
		"50d": "🌫️", // mist
		"50n": "🌫️",
	};

	return iconMap[weatherCode] || "🌤️";
}

// Calculate headache risk based on weather conditions
export function calculateHeadacheRisk(
	pressure: number,
	pressureChange: number,
	humidity: number,
	weatherMain: string,
): {
	risk: number; // 0-100
	level: "low" | "medium" | "high";
	icon: string;
} {
	let risk = 0;

	// Pressure change factor (most important)
	const absPressureChange = Math.abs(pressureChange);
	if (absPressureChange > 5) {
		risk += 40;
	} else if (absPressureChange > 3) {
		risk += 25;
	} else if (absPressureChange > 1) {
		risk += 10;
	}

	// Low pressure factor
	if (pressure < 1010) {
		risk += 20;
	} else if (pressure < 1015) {
		risk += 10;
	}

	// High humidity factor
	if (humidity > 80) {
		risk += 15;
	} else if (humidity > 70) {
		risk += 8;
	}

	// Weather condition factor
	switch (weatherMain.toLowerCase()) {
		case "thunderstorm":
			risk += 25;
			break;
		case "rain":
		case "drizzle":
			risk += 15;
			break;
		case "snow":
			risk += 10;
			break;
		case "mist":
		case "fog":
			risk += 8;
			break;
	}

	// Cap at 100
	risk = Math.min(100, risk);

	// Determine level and icon
	let level: "low" | "medium" | "high";
	let icon: string;

	if (risk < 30) {
		level = "low";
		icon = "😊";
	} else if (risk < 60) {
		level = "medium";
		icon = "😐";
	} else {
		level = "high";
		icon = "😣";
	}

	return { risk, level, icon };
}
