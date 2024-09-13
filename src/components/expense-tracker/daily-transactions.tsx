import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Account, Transaction } from "@/lib/types";
import { TransactionCard } from "./transaction-card";

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
						<TransactionCard
							key={transaction.id}
							transaction={transaction}
							accounts={accounts}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
