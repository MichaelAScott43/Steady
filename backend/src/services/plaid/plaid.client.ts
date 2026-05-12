import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { env } from '../../config/env';

export const plaidClient = new PlaidApi(new Configuration({
  basePath: PlaidEnvironments[env.PLAID_ENV],
  baseOptions: { headers: { 'PLAID-CLIENT-ID': env.PLAID_CLIENT_ID, 'PLAID-SECRET': env.PLAID_SECRET } }
}));
