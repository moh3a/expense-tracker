import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, ArrowRightIcon } from "lucide-react";
import { Account, Transaction } from "@/lib/types";

type DailyTransactionsProps = {
	transactions: Transaction[];
	accounts: Account[];
};

export function DailyTransactions({
	transactions,
	accounts,
}: DailyTransactionsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Daily Transactions</CardTitle>
				<CardDescription>Your recent transactions</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{transactions.map((transaction) => (
						<div
							key={transaction.id}
							className="flex items-center justify-between p-2 border rounded">
							<div className="flex items-center space-x-2">
								{transaction.type === "income" ? (
									<ArrowUpIcon className="text-green-500" />
								) : transaction.type === "expense" ? (
									<ArrowDownIcon className="text-red-500" />
								) : (
									<ArrowRightIcon className="text-blue-500" />
								)}
								<span className="font-medium">
									{transaction.type === "transfer"
										? "Transfer"
										: transaction.category}
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<span
									className={`font-bold ${
										transaction.type === "income"
											? "text-green-500"
											: transaction.type === "expense"
											? "text-red-500"
											: "text-blue-500"
									}`}>
									${transaction.amount.toFixed(2)}
								</span>
								<span className="text-sm text-gray-500">
									{transaction.date}
								</span>
								<span className="text-sm text-gray-500">
									{accounts.find((a) => a.id === transaction.accountId)?.name}
									{transaction.type === "transfer" &&
										` → ${
											accounts.find((a) => a.id === transaction.toAccountId)
												?.name
										}`}
								</span>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
