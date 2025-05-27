"use client";

import { CircularProgress } from "@/components/CircularProgress";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { useWeather } from "@/lib/hooks/useWeather";

export default function Home() {
	const { current, nextHourHeadacheRisk, loading } = useWeather();

	// 頭痛リスクに基づいてサークルの色を決定
	const getCircleColor = () => {
		if (!nextHourHeadacheRisk) return "#8062D6"; // デフォルト色（紫）

		switch (nextHourHeadacheRisk.level) {
			case "low":
				return "#22c55e"; // 緑色
			case "medium":
				return "#3b82f6"; // 青色
			case "high":
				return "#ef4444"; // 赤色
			default:
				return "#8062D6"; // デフォルト色
		}
	};

	const getTrackColor = () => {
		if (!nextHourHeadacheRisk) return "#E9E5F8"; // デフォルト色

		switch (nextHourHeadacheRisk.level) {
			case "low":
				return "#dcfce7"; // 薄い緑色
			case "medium":
				return "#dbeafe"; // 薄い青色
			case "high":
				return "#fee2e2"; // 薄い赤色
			default:
				return "#E9E5F8"; // デフォルト色
		}
	};

	return (
		// Mobile-first container mimicking a phone screen.
		<div className="mx-auto max-w-[420px] min-h-screen bg-white flex flex-col font-[family-name:var(--font-geist-sans)] p-2">
			{/* App bar */}
			<header className="relative flex items-center justify-between py-4 px-3">
				{/* Leading icons & info */}

				{/* Title */}
				<h1 className="text-lg font-semibold leading-none select-none">
					U-Mamori
				</h1>
			</header>

			{/* Main content */}
			<main className="flex-1 overflow-y-auto pb-28">
				{/* Headache Risk Circle */}
				<div className="flex flex-col items-center mt-6 gap-4 pb-5">
					<CircularProgress
						size={200}
						progress={nextHourHeadacheRisk ? nextHourHeadacheRisk.risk : 0}
						color={getCircleColor()}
						trackColor={getTrackColor()}
					>
						{/* Headache Risk Icon and Info */}
						{nextHourHeadacheRisk ? (
							<div className="text-center">
								<div className="text-4xl mb-2">{nextHourHeadacheRisk.icon}</div>
								<div
									className="text-2xl font-bold"
									style={{ color: getCircleColor() }}
								>
									{Math.round(nextHourHeadacheRisk.risk)}%
								</div>
							</div>
						) : loading ? (
							<div className="text-center">
								<div className="w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mb-2" />
								<div className="text-sm text-gray-500">読み込み中</div>
							</div>
						) : (
							<div className="text-center">
								<svg
									aria-hidden="true"
									width="56"
									height="56"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#8062D6"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
									<path d="M12 17h.01" />
								</svg>
								<div className="text-sm text-gray-500 mt-2">データなし</div>
							</div>
						)}
					</CircularProgress>
					<div className="text-center">
						{nextHourHeadacheRisk ? (
							<>
								<p className="text-2xl font-medium">
									{nextHourHeadacheRisk.level === "low" && "低リスク"}
									{nextHourHeadacheRisk.level === "medium" && "中リスク"}
									{nextHourHeadacheRisk.level === "high" && "高リスク"}
								</p>
								<p className="text-sm text-zinc-500 mt-1">頭痛リスク</p>
								{current && (
									<p className="text-xs text-zinc-400 mt-1">
										気圧: {Math.round(current.main.pressure)} hPa
									</p>
								)}
							</>
						) : loading ? (
							<>
								<p className="text-2xl font-medium text-gray-400">---</p>
								<p className="text-sm text-zinc-500 mt-1">頭痛リスク</p>
							</>
						) : (
							<>
								<p className="text-2xl font-medium text-gray-400">データなし</p>
								<p className="text-sm text-zinc-500 mt-1">頭痛リスク</p>
							</>
						)}
					</div>
				</div>

				{/* Weather Metrics */}
				{current ? (
					<WeatherDisplay
						pressure={current.main.pressure}
						weather={current.weather[0]}
						temperature={current.main.temp}
						headacheRisk={nextHourHeadacheRisk}
					/>
				) : (
					<div className="grid grid-cols-3 gap-4 px-4 mt-8 text-center">
						{/* Loading placeholders */}
						<div className="flex flex-col items-center gap-2">
							<div className="w-20 h-20 rounded-full bg-gray-100 animate-pulse" />
							<span className="text-xs text-zinc-500">Loading...</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<div className="w-20 h-20 rounded-full bg-gray-100 animate-pulse" />
							<span className="text-xs text-zinc-500">Loading...</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<div className="w-20 h-20 rounded-full bg-gray-100 animate-pulse" />
							<span className="text-xs text-zinc-500">Loading...</span>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
