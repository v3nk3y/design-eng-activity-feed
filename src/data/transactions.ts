import type { PaymentMethod, Transaction, TransactionAccount, TransactionStatus, TransactionType } from '../types/transaction';

export const OPERATING_ACCOUNT: TransactionAccount = {
  id: 'acct_operating',
  name: 'Operating account',
  lastFour: '4821',
  type: 'checking',
};

function externalAccount(id: string, name: string, lastFour: string): TransactionAccount {
  return { id, name, lastFour, type: 'external' };
}

type TransactionSeed = Pick<
  Transaction,
  | 'id'
  | 'merchant'
  | 'category'
  | 'date'
  | 'amount'
  | 'status'
  | 'type'
  | 'description'
  | 'sourceAccount'
  | 'destinationAccount'
  | 'paymentMethod'
  | 'referenceNumber'
  | 'initiatedAt'
> &
  Partial<Pick<Transaction, 'postedAt' | 'failureReason' | 'memo'>>;

function createTransaction(seed: TransactionSeed): Transaction {
  return { ...seed };
}

/** Default sample set — includes a few edge cases on purpose. */
export const sampleTransactions: Transaction[] = [
  createTransaction({
    id: 'txn_1',
    merchant: 'Stripe',
    category: 'Software',
    date: '2026-05-12',
    amount: -49.99,
    status: 'posted',
    type: 'payment',
    description: 'Stripe billing — Relay Pro subscription',
    sourceAccount: OPERATING_ACCOUNT,
    destinationAccount: externalAccount('acct_stripe', 'Stripe', '0001'),
    paymentMethod: 'card',
    referenceNumber: 'STR-20260512-88421',
    initiatedAt: '2026-05-12T09:14:22Z',
    postedAt: '2026-05-12T09:14:25Z',
    memo: 'Monthly SaaS subscription',
  }),
  createTransaction({
    id: 'txn_2',
    merchant: 'Client Payment — Acme Corp Q1 Retainer',
    category: 'Income',
    date: '2026-05-10',
    amount: 2500,
    status: 'pending',
    type: 'deposit',
    description: 'Inbound ACH from Acme Corp',
    sourceAccount: externalAccount('acct_acme', 'Acme Corp', '7724'),
    destinationAccount: OPERATING_ACCOUNT,
    paymentMethod: 'ach',
    referenceNumber: 'ACH-20260510-11903',
    initiatedAt: '2026-05-10T16:02:00Z',
    memo: 'Q1 retainer — invoice #INV-2041',
  }),
  createTransaction({
    id: 'txn_3',
    merchant: 'WeWork',
    category: 'Office',
    date: 'May 8, 2026',
    amount: -320,
    status: 'posted',
    type: 'payment',
    description: 'WeWork monthly coworking membership',
    sourceAccount: OPERATING_ACCOUNT,
    destinationAccount: externalAccount('acct_wework', 'WeWork', '3388'),
    paymentMethod: 'ach',
    referenceNumber: 'ACH-20260508-55201',
    initiatedAt: '2026-05-08T01:00:00Z',
    postedAt: '2026-05-08T06:30:12Z',
  }),
  createTransaction({
    id: 'txn_4',
    merchant: 'Unknown Merchant',
    date: '2026-05-07',
    amount: -12.5,
    status: 'failed',
    type: 'payment',
    description: 'Card authorization attempt',
    sourceAccount: OPERATING_ACCOUNT,
    destinationAccount: externalAccount('acct_unknown', 'Unknown Merchant', '----'),
    paymentMethod: 'card',
    referenceNumber: 'CRD-20260507-00412',
    initiatedAt: '2026-05-07T22:41:09Z',
    failureReason: 'Insufficient funds',
  }),
  createTransaction({
    id: 'txn_5',
    merchant: 'Amazon Web Services',
    category: 'Infrastructure',
    date: '2026-05-05',
    amount: -1847.22,
    status: 'posted',
    type: 'payment',
    description: 'AWS monthly infrastructure charges',
    sourceAccount: OPERATING_ACCOUNT,
    destinationAccount: externalAccount('acct_aws', 'Amazon Web Services', '6290'),
    paymentMethod: 'ach',
    referenceNumber: 'ACH-20260505-90144',
    initiatedAt: '2026-05-05T03:15:00Z',
    postedAt: '2026-05-05T08:00:44Z',
    memo: 'April usage — production + staging',
  }),
];

const MOCK_MERCHANTS = ['Coffee Shop', 'Payroll', 'Client Payment', 'Uber', 'Notion'] as const;

const MOCK_CATEGORIES = ['Software', 'Income', 'Meals', 'Travel', undefined] as const;
const MOCK_STATUSES: TransactionStatus[] = ['posted', 'pending', 'failed'];
const MOCK_PAYMENT_METHODS: PaymentMethod[] = ['ach', 'card', 'wire', 'check'];

function buildReferenceNumber(id: string): string {
  const suffix = id.replace(/\D/g, '').slice(-5).padStart(5, '0');
  return `REF-${suffix}`;
}

function buildTransactionDetails(
  merchant: string,
  amount: number,
  status: TransactionStatus,
  date: string,
  id: string,
): Pick<
  Transaction,
  | 'type'
  | 'description'
  | 'sourceAccount'
  | 'destinationAccount'
  | 'paymentMethod'
  | 'referenceNumber'
  | 'initiatedAt'
  | 'postedAt'
  | 'failureReason'
> {
  const isCredit = amount > 0;
  const type: TransactionType = isCredit ? 'deposit' : 'payment';
  const paymentMethod = MOCK_PAYMENT_METHODS[Math.abs(id.length) % MOCK_PAYMENT_METHODS.length]!;
  const external = externalAccount(`acct_ext_${id}`, merchant, String(Math.floor(Math.random() * 9000) + 1000));

  return {
    type,
    description: isCredit ? `Inbound payment from ${merchant}` : `Payment to ${merchant}`,
    sourceAccount: isCredit ? external : OPERATING_ACCOUNT,
    destinationAccount: isCredit ? OPERATING_ACCOUNT : external,
    paymentMethod,
    referenceNumber: buildReferenceNumber(id),
    initiatedAt: `${date}T12:00:00Z`,
    postedAt: status === 'posted' ? `${date}T18:00:00Z` : undefined,
    failureReason: status === 'failed' ? 'Payment could not be completed' : undefined,
  };
}

/** Creates a one-off transaction for dev toolbar testing. */
export function createMockTransaction(): Transaction {
  const n = Math.floor(Math.random() * MOCK_MERCHANTS.length);
  const merchant = MOCK_MERCHANTS[n]!;
  const amount = Math.random() > 0.35 ? -(5 + Math.floor(Math.random() * 400)) : 200 + Math.floor(Math.random() * 3000);
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const status = MOCK_STATUSES[Math.floor(Math.random() * MOCK_STATUSES.length)]!;
  const id = `txn_dev_${Date.now()}`;

  return {
    id,
    merchant,
    category: MOCK_CATEGORIES[n % MOCK_CATEGORIES.length],
    date,
    amount,
    status,
    ...buildTransactionDetails(merchant, amount, status, date, id),
  };
}

/** Generates a large list for performance / virtualization discussions. */
export function generateLargeTransactionList(count = 1000): Transaction[] {
  const merchants = ['Stripe', 'Payroll', 'Client Payment', 'Slack', 'Figma', 'Google Workspace'];
  const categories = ['Software', 'Income', 'Payroll', 'Office', undefined];
  const statuses: TransactionStatus[] = ['posted', 'pending', 'failed'];

  return Array.from({ length: count }, (_, i) => {
    const merchant = merchants[i % merchants.length]!;
    const amount = i % 4 === 0 ? 500 + i : -(10 + (i % 200));
    const status = statuses[i % statuses.length]!;
    const date = `2026-05-${String((i % 28) + 1).padStart(2, '0')}`;
    const id = `txn_bulk_${i}`;

    return {
      id,
      merchant,
      category: categories[i % categories.length],
      date,
      amount,
      status,
      ...buildTransactionDetails(merchant, amount, status, date, id),
    };
  });
}
