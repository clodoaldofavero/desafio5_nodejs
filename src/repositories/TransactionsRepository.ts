import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length === 0)
      return { income: 0, outcome: 0, total: 0 };

    const incomeTransactions = this.transactions.filter(
      (transaction: Transaction) => {
        return transaction.type === 'income';
      },
    );

    const income = incomeTransactions.reduce((acc, current: Transaction) => {
      return acc + current.value;
    }, 0);

    const outcomeTransactions = this.transactions.filter(
      (transaction: Transaction) => {
        return transaction.type === 'outcome';
      },
    );

    const outcome = outcomeTransactions.reduce((acc, current: Transaction) => {
      return acc + current.value;
    }, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
