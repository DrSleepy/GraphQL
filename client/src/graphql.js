import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation($loginDetails: LoginInput) {
    login(loginDetails: $loginDetails) {
      ok
      errors {
        path
        message
      }
      user {
        displayName
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation($registerDetails: RegisterInput) {
    register(registerDetails: $registerDetails) {
      ok
      errors {
        path
        message
      }
      user {
        displayName
        age
        gender
      }
    }
  }
`;

export const GET_ALL_USERS_QUERY = gql`
  query {
    getAllUsers {
      _id
      displayName
      age
      email
      password
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const MY_PROFILE_QUERY = gql`
  query {
    myProfile {
      displayName
      age
      email
      gender
      preferences {
        minAge
        maxAge
        gender
      }
    }
  }
`;

export const UPDATE_PREFERENCES_MUTATION = gql`
  mutation($preferenceDetails: PreferenceInput) {
    updatePreferences(preferenceDetails: $preferenceDetails) {
      ok
      errors {
        message
        path
      }
      preferences {
        minAge
        maxAge
        gender
      }
    }
  }
`;
