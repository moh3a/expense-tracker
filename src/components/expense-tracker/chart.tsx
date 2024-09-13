"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple line chart";

const chartConfig = {
	income: {
		label: "Income",
		color: "#22c55e",
	},
	expense: {
		label: "Expense",
		color: "#ef4444",
	},
} satisfies ChartConfig;

export function StatisticsChart({
	chartData,
}: {
	chartData: {
		income: number;
		expense: number;
		date: string;
	}[];
}) {
	return (
		<Card className="border-dashed">
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 12,
							left: 12,
							right: 12,
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(v: string) => new Date(v).toLocaleDateString()}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>
						<ChartLegend content={<ChartLegendContent />} />
						<Line
							dataKey="income"
							type="monotone"
							stroke="var(--color-income)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="expense"
							type="monotone"
							stroke="var(--color-expense)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
