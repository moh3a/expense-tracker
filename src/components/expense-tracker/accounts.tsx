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
import { Account, AccountType } from "@/lib/types";

type AccountsProps = {
	accounts: Account[];
	onAddAccount: (account: Omit<Account, "id">) => void;
};

export function Accounts({ accounts, onAddAccount }: AccountsProps) {
	const [newAccount, setNewAccount] = useState<Omit<Account, "id">>({
		name: "",
		type: "asset",
		balance: 0,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onAddAccount(newAccount);
		setNewAccount({ name: "", type: "asset", balance: 0 });
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Accounts</CardTitle>
				<CardDescription>Manage your accounts</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit}
					className="space-y-4 mb-6">
					<div className="space-y-2">
						<Label htmlFor="accountName">Account Name</Label>
						<Input
							id="accountName"
							value={newAccount.name}
							onChange={(e) =>
								setNewAccount({ ...newAccount, name: e.target.value })
							}
							placeholder="Enter account name"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="accountType">Account Type</Label>
						<Select
							value={newAccount.type}
							onValueChange={(value: AccountType) =>
								setNewAccount({ ...newAccount, type: value })
							}>
							<SelectTrigger id="accountType">
								<SelectValue placeholder="Select account type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="asset">Asset</SelectItem>
								<SelectItem value="liability">Liability</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="initialBalance">Initial Balance</Label>
						<Input
							id="initialBalance"
							type="number"
							value={newAccount.balance}
							onChange={(e) =>
								setNewAccount({
									...newAccount,
									balance: parseFloat(e.target.value),
								})
							}
							placeholder="Enter initial balance"
						/>
					</div>
					<Button type="submit">Add Account</Button>
				</form>
				<div className="space-y-4">
					{accounts.map((account) => (
						<div
							key={account.id}
							className="flex items-center justify-between p-2 border rounded">
							<div className="flex items-center space-x-2">
								<span className="font-medium">{account.name}</span>
								<span className="text-sm text-gray-500">({account.type})</span>
							</div>
							<span
								className={`font-bold ${
									account.type === "asset" ? "text-green-500" : "text-red-500"
								}`}>
								${account.balance.toFixed(2)}
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
