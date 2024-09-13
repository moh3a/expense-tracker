import { Account, Transaction } from "@/lib/types";
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";

export function TransactionCard({
	transaction,
	accounts,
}: {
	transaction: Transaction;
	accounts: Account[];
}) {
	return (
		<div className="flex items-center justify-between p-2 border rounded">
			<div className="flex items-center space-x-2">
				{transaction.type === "income" ? (
					<ArrowUpIcon className="text-green-500" />
				) : transaction.type === "expense" ? (
					<ArrowDownIcon className="text-red-500" />
				) : (
					<ArrowRightIcon className="text-blue-500" />
				)}
				<span className="font-medium">
					{transaction.type === "transfer" ? "Transfer" : transaction.category}
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
				<span className="text-sm text-gray-500">{transaction.date}</span>
				<span className="text-sm text-gray-500">
					{accounts.find((a) => a.id === transaction.accountId)?.name}
					{transaction.type === "transfer" &&
						` → ${
							accounts.find((a) => a.id === transaction.toAccountId)?.name
						}`}
				</span>
			</div>
		</div>
	);
}
