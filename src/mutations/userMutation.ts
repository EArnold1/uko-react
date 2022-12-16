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
    $sellRate: Int
    $buyRate: Int
    $acctName: String
    $acctNumber: String
    $bankName: String
    $id: String!
  ) {
    updateAdmin(
      id: $id
      sellRate: $sellRate
      buyRate: $buyRate
      acctName: $acctName
      acctNumber: $acctNumber
      bankName: $bankName
    ) {
      sellRate
      buyRate
      acctNumber
    }
  }
`;

const ADD_COIN = gql`
  mutation AddCoinAmin(
    $id: String!
    $image: String
    $crypto: String!
    $wallet: String!
  ) {
    addCoinAdmin(id: $id, image: $image, crypto: $crypto, wallet: $wallet) {
      crypto
      id
      image
      wallet
    }
  }
`;

const DELETE_COIN = gql`
  mutation DeleteCoinAdmin($id: String!, $coinId: String!) {
    deleteCoinAdmin(id: $id, coinId: $coinId) {
      crypto
      id
      image
    }
  }
`;

export { UPDATE_USER, UPDATE_ADMIN, ADD_COIN, DELETE_COIN };
