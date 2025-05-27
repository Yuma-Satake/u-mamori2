import { getWeatherIcon } from "@/lib/weather";

interface WeatherDisplayProps {
	pressure: number;
	weather: {
		main: string;
		description: string;
		icon: string;
	};
	temperature: number;
	headacheRisk?: {
		risk: number;
		level: "low" | "medium" | "high";
		icon: string;
	} | null;
}

export function WeatherDisplay({
	pressure,
	weather,
	temperature,
	headacheRisk,
}: WeatherDisplayProps) {
	return (
		<div className="grid grid-cols-3 gap-4 px-4 text-center">
			{/* Current Pressure */}
			<div className="flex flex-col items-center gap-2">
				<div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
					<div className="text-center">
						<div className="text-lg font-bold text-blue-600">
							{Math.round(pressure)}
						</div>
						<div className="text-xs text-blue-500">hPa</div>
					</div>
				</div>
				<span className="text-xs text-zinc-500">Pressure</span>
			</div>

			{/* Current Weather */}
			<div className="flex flex-col items-center gap-2">
				<div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
					<div className="text-center">
						<div className="text-2xl">{getWeatherIcon(weather.icon)}</div>
						<div className="text-xs text-orange-600">
							{Math.round(temperature)}°C
						</div>
					</div>
				</div>
				<span className="text-xs text-zinc-500">Weather</span>
			</div>

			{/* Headache Risk */}
			<div className="flex flex-col items-center gap-2">
				{headacheRisk ? (
					<div
						className={`w-20 h-20 rounded-full flex items-center justify-center ${
							headacheRisk.level === "low"
								? "bg-green-100"
								: headacheRisk.level === "medium"
									? "bg-yellow-100"
									: "bg-red-100"
						}`}
					>
						<div className="text-center">
							<div className="text-2xl">{headacheRisk.icon}</div>
							<div
								className={`text-xs font-bold ${
									headacheRisk.level === "low"
										? "text-green-600"
										: headacheRisk.level === "medium"
											? "text-yellow-600"
											: "text-red-600"
								}`}
							>
								{Math.round(headacheRisk.risk)}%
							</div>
						</div>
					</div>
				) : (
					<div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
						<div className="text-gray-400">-</div>
					</div>
				)}
				<span className="text-xs text-zinc-500">
					{headacheRisk ? "頭痛リスク" : "-"}
				</span>
			</div>
		</div>
	);
}
