"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Account, Transaction } from "@/lib/types";
import { DailyTransactions } from "./daily-transactions";
import { Statistics } from "./statistics";
import { NewTransaction } from "./new-transaction";
import { Accounts } from "./accounts";

export function ExpenseTracker() {
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const addAccount = (newAccount: Omit<Account, "id">) => {
		setAccounts([...accounts, { ...newAccount, id: Date.now() }]);
	};

	const addTransaction = (newTransaction: Omit<Transaction, "id">) => {
		const transaction = { ...newTransaction, id: Date.now() };
		setTransactions([...transactions, transaction]);

		// Update account balance(s)
		setAccounts(
			accounts.map((account) => {
				if (transaction.type === "transfer") {
					if (account.id === transaction.accountId) {
						return {
							...account,
							balance: account.balance - transaction.amount,
						};
					}
					if (account.id === transaction.toAccountId) {
						return {
							...account,
							balance: account.balance + transaction.amount,
						};
					}
				} else if (account.id === transaction.accountId) {
					return {
						...account,
						balance:
							account.balance +
							(transaction.type === "income"
								? transaction.amount
								: -transaction.amount),
					};
				}
				return account;
			})
		);
	};

	return (
		<Tabs
			defaultValue="daily"
			className="w-full max-w-4xl mx-auto">
			<TabsList className="grid w-full grid-cols-4">
				<TabsTrigger value="daily">Daily Transactions</TabsTrigger>
				<TabsTrigger value="stats">Statistics</TabsTrigger>
				<TabsTrigger value="new">New Transaction</TabsTrigger>
				<TabsTrigger value="accounts">Accounts</TabsTrigger>
			</TabsList>

			<TabsContent value="daily">
				<DailyTransactions
					transactions={transactions}
					accounts={accounts}
				/>
			</TabsContent>

			<TabsContent value="stats">
				<Statistics
					accounts={accounts}
					transactions={transactions}
				/>
			</TabsContent>

			<TabsContent value="new">
				<NewTransaction
					accounts={accounts}
					onAddTransaction={addTransaction}
				/>
			</TabsContent>

			<TabsContent value="accounts">
				<Accounts
					accounts={accounts}
					onAddAccount={addAccount}
				/>
			</TabsContent>
		</Tabs>
	);
}
