import { gql } from '@apollo/client';

const UPDATE_USER = gql`
  mutation AdminEditUser(
    $email: String
    $name: String
    $password: String
    $phoneNumber: String
    $id: String!
  ) {
    adminEditUser(
      id: $id
      name: $name
      password: $password
      phoneNumber: $phoneNumber
      email: $email
    ) {
      name
      email
      phoneNumber
    }
  }
`;

const UPDATE_ADMIN = gql`
  mutation UpdateAdmin(
    $wallet: String
    $rate: Int
    $acctName: String
    $acctNumber: String
    $bankName: String
    $id: String!
  ) {
    updateAdmin(
      id: $id
      rate: $rate
      acctName: $acctName
      acctNumber: $acctNumber
      bankName: $bankName
      wallet: $wallet
    ) {
      rate
      wallet
      acctNumber
    }
  }
`;

export { UPDATE_USER, UPDATE_ADMIN };
