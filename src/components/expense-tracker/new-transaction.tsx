import { useState } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Account, Transaction, TransactionType } from "@/lib/types";

type NewTransactionProps = {
	accounts: Account[];
	onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
};

export function NewTransaction({
	accounts,
	onAddTransaction,
}: NewTransactionProps) {
	const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>(
		{
			type: "expense",
			category: "",
			amount: 0,
			date: new Date().toISOString().split("T")[0],
			accountId: 0,
			toAccountId: 0,
		}
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onAddTransaction(newTransaction);
		setNewTransaction({
			type: "expense",
			category: "",
			amount: 0,
			date: new Date().toISOString().split("T")[0],
			accountId: 0,
			toAccountId: 0,
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>New Transaction</CardTitle>
				<CardDescription>
					Add a new income, expense, or transfer
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit}
					className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="type">Type</Label>
						<Select
							value={newTransaction.type}
							onValueChange={(value: TransactionType) =>
								setNewTransaction({ ...newTransaction, type: value })
							}>
							<SelectTrigger id="type">
								<SelectValue placeholder="Select type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="income">Income</SelectItem>
								<SelectItem value="expense">Expense</SelectItem>
								<SelectItem value="transfer">Transfer</SelectItem>
							</SelectContent>
						</Select>
					</div>
					{newTransaction.type !== "transfer" && (
						<div className="space-y-2">
							<Label htmlFor="category">Category</Label>
							<Input
								id="category"
								value={newTransaction.category}
								onChange={(e) =>
									setNewTransaction({
										...newTransaction,
										category: e.target.value,
									})
								}
								placeholder="Enter category"
							/>
						</div>
					)}
					<div className="space-y-2">
						<Label htmlFor="amount">Amount</Label>
						<Input
							id="amount"
							type="number"
							value={newTransaction.amount}
							onChange={(e) =>
								setNewTransaction({
									...newTransaction,
									amount: parseFloat(e.target.value),
								})
							}
							placeholder="Enter amount"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="date">Date</Label>
						<Input
							id="date"
							type="date"
							value={newTransaction.date}
							onChange={(e) =>
								setNewTransaction({ ...newTransaction, date: e.target.value })
							}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="account">
							{newTransaction.type === "transfer" ? "From Account" : "Account"}
						</Label>
						<Select
							value={newTransaction.accountId.toString()}
							onValueChange={(value) =>
								setNewTransaction({
									...newTransaction,
									accountId: parseInt(value),
								})
							}>
							<SelectTrigger id="account">
								<SelectValue placeholder="Select account" />
							</SelectTrigger>
							<SelectContent>
								{accounts.map((account) => (
									<SelectItem
										key={account.id}
										value={account.id.toString()}>
										{account.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					{newTransaction.type === "transfer" && (
						<div className="space-y-2">
							<Label htmlFor="toAccount">To Account</Label>
							<Select
								value={newTransaction.toAccountId?.toString()}
								onValueChange={(value) =>
									setNewTransaction({
										...newTransaction,
										toAccountId: parseInt(value),
									})
								}>
								<SelectTrigger id="toAccount">
									<SelectValue placeholder="Select account" />
								</SelectTrigger>
								<SelectContent>
									{accounts.map((account) => (
										<SelectItem
											key={account.id}
											value={account.id.toString()}>
											{account.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}
					<Button type="submit">Add Transaction</Button>
				</form>
			</CardContent>
		</Card>
	);
}
