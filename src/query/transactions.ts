import { gql } from '@apollo/client';

const GET_TRANSACTIONS = gql`
  query AdminGetTransaction {
    adminGetTransactions {
      amount
      status
      coin
      rate
      type
      wallet
      date
      network
      id
      date
    }
  }
`;

export { GET_TRANSACTIONS };
