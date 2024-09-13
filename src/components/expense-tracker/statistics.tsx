import { DollarSignIcon } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Account, Transaction } from "@/lib/types";
import { calculateTotals, getChartData } from "@/lib/utils";
import { StatisticsChart } from "./chart";

type StatisticsProps = {
	accounts: Account[];
	transactions: Transaction[];
};

export function Statistics({ accounts, transactions }: StatisticsProps) {
	const totals = calculateTotals(accounts);
	const chartData = getChartData(transactions);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Statistics</CardTitle>
				<CardDescription>Overview of your finances</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-3 gap-4 mb-6">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Assets
							</CardTitle>
							<DollarSignIcon className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-green-500">
								${totals.assets.toFixed(2)}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Liabilities
							</CardTitle>
							<DollarSignIcon className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-red-500">
								${totals.liabilities.toFixed(2)}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Net Worth</CardTitle>
							<DollarSignIcon className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div
								className={`text-2xl font-bold ${
									totals.total >= 0 ? "text-green-500" : "text-red-500"
								}`}>
								${totals.total.toFixed(2)}
							</div>
						</CardContent>
					</Card>
				</div>
				<StatisticsChart chartData={chartData} />
			</CardContent>
		</Card>
	);
}
