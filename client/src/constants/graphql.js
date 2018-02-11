import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation LoginQuery($loginDetails: LoginInput) {
    login(loginDetails: $loginDetails) {
      ok
      errors {
        path
        message
      }
      user {
        displayName
        age
      }
    }
  }
`;

export const PLACEHOLDER = gql`
  mutation LoginQuery($loginDetails: LoginInput) {
    login(loginDetails: $loginDetails) {
      ok
      errors {
        path
        message
      }
      user {
        displayName
        age
      }
    }
  }
`;
