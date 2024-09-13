import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

import { Account, Transaction } from "./types";

export const calculateTotals = (accounts: Account[]) => {
	const assets = accounts
		.filter((a) => a.type === "asset")
		.reduce((sum, a) => sum + a.balance, 0);
	const liabilities = accounts
		.filter((a) => a.type === "liability")
		.reduce((sum, a) => sum + a.balance, 0);
	return { assets, liabilities, total: assets - liabilities };
};

export const getChartData = (transactions: Transaction[]) => {
	const data: { [date: string]: { income: number; expense: number } } = {};
	transactions.forEach((t) => {
		if (!data[t.date]) {
			data[t.date] = { income: 0, expense: 0 };
		}
		if (t.type === "income") data[t.date].income += t.amount;
		if (t.type === "expense") data[t.date].expense += t.amount;
	});
	return Object.entries(data).map(([date, values]) => ({ date, ...values }));
};
