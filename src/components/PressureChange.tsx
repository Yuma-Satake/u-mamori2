interface PressureChangeProps {
	change: number;
	trend: "rising" | "falling" | "stable";
}

export function PressureChange({ change, trend }: PressureChangeProps) {
	const getTrendIcon = () => {
		switch (trend) {
			case "rising":
				return "↗️";
			case "falling":
				return "↘️";
			case "stable":
				return "→";
			default:
				return "→";
		}
	};

	const getTrendColor = () => {
		switch (trend) {
			case "rising":
				return "text-green-600";
			case "falling":
				return "text-red-600";
			case "stable":
				return "text-gray-600";
			default:
				return "text-gray-600";
		}
	};

	return (
		<div className="flex flex-col items-center gap-2 bg-blue-50 rounded-xl p-4">
			<div className="text-2xl">{getTrendIcon()}</div>
			<div className="text-center">
				<p className={`text-lg font-medium ${getTrendColor()}`}>
					{change > 0 ? "+" : ""}
					{change.toFixed(1)} hPa
				</p>
				<p className="text-xs text-gray-500">Pressure Change</p>
			</div>
		</div>
	);
}
