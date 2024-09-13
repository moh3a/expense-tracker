export type AccountType = "asset" | "liability";

export type Account = {
	id: number;
	name: string;
	type: AccountType;
	balance: number;
};

export type TransactionType = "income" | "expense" | "transfer";

export type Transaction = {
	id: number;
	type: TransactionType;
	category?: string;
	amount: number;
	date: string;
	accountId: number;
	toAccountId?: number;
};
