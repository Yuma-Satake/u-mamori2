"use client";

import { CircularProgress } from "@/components/CircularProgress";
import { PressureChange } from "@/components/PressureChange";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { useWeather } from "@/lib/hooks/useWeather";

export default function Home() {
	const { current, pressureChange, nextHourHeadacheRisk, loading, error } =
		useWeather();

	return (
		// Mobile-first container mimicking a phone screen.
		<div
			className="mx-auto max-w-[420px] min-h-screen bg-white flex flex-col font-[family-name:var(--font-geist-sans)]"
			aria-label="Fitbit Premium Dashboard"
		>
			{/* App bar */}
			<header className="relative flex items-center justify-between py-4 px-3">
				{/* Leading icons & info */}
				<div className="flex items-center gap-3">
					{/* Back arrow */}
					<button
						type="button"
						className="p-1 rounded-full hover:bg-zinc-100 active:bg-zinc-200"
					>
						<svg
							aria-hidden="true"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M15 18l-6-6 6-6" />
						</svg>
					</button>
					{/* Battery pill */}
					<div className="flex items-center gap-1 rounded-[12px] bg-zinc-100 py-1 px-2 text-xs font-medium">
						<svg
							aria-hidden="true"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
							<line x1="23" y1="13" x2="23" y2="11" />
						</svg>
						97%
					</div>
				</div>

				{/* Title */}
				<h1 className="text-lg font-semibold leading-none select-none">
					U-Mamori
				</h1>

				{/* Actions */}
				<div className="flex items-center gap-3">
					{/* Message icon */}
					<button
						type="button"
						className="p-1 rounded-full hover:bg-zinc-100 active:bg-zinc-200"
					>
						<svg
							aria-hidden="true"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
						</svg>
					</button>
					{/* Avatar */}
					<div className="w-8 h-8 rounded-full bg-sky-500 text-white font-semibold flex items-center justify-center select-none">
						A
					</div>
				</div>
			</header>

			{/* Sub-title */}
			<section className="px-4">
				<div className="flex items-center justify-between">
					<h2 className="text-base font-medium">Today</h2>
					<button
						type="button"
						className="p-1 rounded-full hover:bg-zinc-100 active:bg-zinc-200"
					>
						<svg
							aria-hidden="true"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M18 2.01L6 14l-4 8 8-4 12-12" />
						</svg>
					</button>
				</div>
			</section>

			{/* Main content */}
			<main className="flex-1 overflow-y-auto pb-28">
				{/* Pressure Change */}
				<div className="px-4 mt-4">
					{loading ? (
						<div className="flex justify-center">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
						</div>
					) : error ? (
						<div className="text-center text-red-500 text-sm">{error}</div>
					) : pressureChange ? (
						<PressureChange
							change={pressureChange.change}
							trend={pressureChange.trend}
						/>
					) : null}
				</div>

				{/* Sleep ring */}
				<div className="flex flex-col items-center mt-6 gap-4">
					<CircularProgress
						size={200}
						progress={60}
						color="#8062D6"
						trackColor="#E9E5F8"
					>
						{/* Moon icon */}
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
							<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
							<path d="M14 10h.01" />
						</svg>
					</CircularProgress>
					<div className="text-center">
						<p className="text-4xl font-medium">
							<span>1</span>
							<span className="text-xl align-top">h</span>
							<span className="mx-1">47</span>
							<span className="text-xl align-top">m</span>
						</p>
						<p className="text-sm text-zinc-500 mt-1">Sleep</p>
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

				{/* Recovery */}
				<section className="mt-12 px-4 space-y-4">
					<h3 className="text-lg font-semibold">Recovery</h3>

					{/* Card */}
					<div className="relative bg-zinc-50 rounded-xl p-4 flex items-center justify-between">
						<div>
							<p className="text-sm text-zinc-500 mb-1">Sleep duration</p>
							<p className="text-3xl font-medium">1h 47m</p>
							<p className="text-xs text-zinc-500 mt-1">Today</p>
						</div>
						<div className="hidden sm:block">
							<CircularProgress
								size={100}
								strokeWidth={8}
								progress={60}
								color="#8062D6"
								trackColor="#E9E5F8"
							/>
						</div>
						{/* Floating action button inside card */}
						<button
							type="button"
							className="absolute -bottom-6 right-4 w-14 h-14 rounded-2xl bg-[#CDE5DE] shadow-lg flex items-center justify-center text-3xl text-[#006C4F]"
						>
							+
						</button>
					</div>
				</section>
			</main>

			{/* Bottom navigation */}
			<nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-1px_5px_rgba(0,0,0,0.05)]">
				<ul className="flex justify-around py-2">
					<li className="flex flex-col items-center gap-1 text-teal-700">
						<svg
							aria-hidden="true"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="8" x2="12" y2="12" />
							<line x1="12" y1="16" x2="12.01" y2="16" />
						</svg>
						<span className="text-xs font-medium">Today</span>
					</li>
					<li className="flex flex-col items-center gap-1 text-zinc-500">
						<svg
							aria-hidden="true"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
							<line x1="16" y1="2" x2="16" y2="6" />
							<line x1="8" y1="2" x2="8" y2="6" />
							<line x1="3" y1="10" x2="21" y2="10" />
						</svg>
						<span className="text-xs font-medium">Coach</span>
					</li>
					<li className="flex flex-col items-center gap-1 text-zinc-500">
						<svg
							aria-hidden="true"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
							<line x1="9" y1="9" x2="9" y2="9" />
							<line x1="15" y1="9" x2="15" y2="9" />
							<line x1="9" y1="15" x2="9" y2="15" />
							<line x1="15" y1="15" x2="15" y2="15" />
						</svg>
						<span className="text-xs font-medium">You</span>
					</li>
				</ul>
			</nav>
		</div>
	);
}
