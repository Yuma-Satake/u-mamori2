import type { FC, ReactNode } from "react";

interface CircularProgressProps {
	/** Diameter of the SVG in pixels */
	size?: number;
	/** Stroke width of the circle in pixels */
	strokeWidth?: number;
	/** Progress value between 0 and 100 */
	progress: number;
	/** Stroke (progress) color */
	color?: string;
	/** Track/background color */
	trackColor?: string;
	/** Optional children rendered at the center of the circle (e.g., an icon) */
	children?: ReactNode;
}

/**
 * Simple SVG circular progress component using stroke-dashoffset animation.
 */
export const CircularProgress: FC<CircularProgressProps> = ({
	size = 160,
	strokeWidth = 10,
	progress,
	color = "currentColor",
	trackColor = "#E5E7EB", // Tailwind zinc-200
	children,
}) => {
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const clampProgress = Math.min(100, Math.max(0, progress));
	const offset = circumference - (clampProgress / 100) * circumference;

	return (
		<div
			className="relative inline-flex items-center justify-center"
			style={{ width: size, height: size }}
		>
			<svg
				width={size}
				height={size}
				className="rotate-[-90deg]"
				role="presentation"
				aria-hidden="true"
			>
				{/* Track */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke={trackColor}
					strokeWidth={strokeWidth}
					fill="none"
				/>
				{/* Progress */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke={color}
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					fill="none"
				/>
			</svg>
			{/* Inner content */}
			{children && (
				<div className="absolute inset-0 flex items-center justify-center">
					{children}
				</div>
			)}
		</div>
	);
};
