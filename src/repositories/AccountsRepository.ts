import type Accounts from '../models/Accounts';

export interface AccountsRepository {
  getOne(): Promise<Accounts | null>;
  create(): Promise<void>;
}
