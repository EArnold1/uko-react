import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      token
    }
  }
`;

export { LOGIN };
