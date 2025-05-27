import { useState, useEffect } from "react";
import {
	getCurrentWeather,
	getForecast,
	getPressureChange,
	calculateHeadacheRisk,
	type WeatherData,
	type ForecastData,
} from "../weather";

interface WeatherState {
	current: WeatherData | null;
	forecast: ForecastData | null;
	pressureChange: {
		change: number;
		trend: "rising" | "falling" | "stable";
	} | null;
	nextHourHeadacheRisk: {
		risk: number;
		level: "low" | "medium" | "high";
		icon: string;
	} | null;
	loading: boolean;
	error: string | null;
}

export function useWeather() {
	const [state, setState] = useState<WeatherState>({
		current: null,
		forecast: null,
		pressureChange: null,
		nextHourHeadacheRisk: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		async function fetchWeatherData() {
			try {
				setState((prev) => ({ ...prev, loading: true, error: null }));

				const [currentData, forecastData] = await Promise.all([
					getCurrentWeather(),
					getForecast(),
				]);

				// Calculate pressure change from current to next hour
				let pressureChange = null;
				let nextHourHeadacheRisk = null;

				if (forecastData.list.length > 0) {
					const currentPressure = currentData.main.pressure;
					const nextPressure = forecastData.list[0].main.pressure;
					pressureChange = getPressureChange(currentPressure, nextPressure);

					// Calculate headache risk for next hour
					const nextHourData = forecastData.list[0];
					nextHourHeadacheRisk = calculateHeadacheRisk(
						nextHourData.main.pressure,
						pressureChange.change,
						nextHourData.main.humidity,
						nextHourData.weather[0].main,
					);
				}

				setState({
					current: currentData,
					forecast: forecastData,
					pressureChange,
					nextHourHeadacheRisk,
					loading: false,
					error: null,
				});
			} catch (error) {
				setState((prev) => ({
					...prev,
					loading: false,
					error:
						error instanceof Error
							? error.message
							: "Failed to fetch weather data",
				}));
			}
		}

		fetchWeatherData();

		// Refresh data every 10 minutes
		const interval = setInterval(fetchWeatherData, 10 * 60 * 1000);

		return () => clearInterval(interval);
	}, []);

	return state;
}
