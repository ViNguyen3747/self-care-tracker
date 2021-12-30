import { gql } from "@apollo/client";
export const SIGN_UP = gql`
  mutation signup($newUser: signupInput!) {
    signup(newUser: $newUser) {
      message
    }
  }
`;

export const SIGN_IN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const ACTIVATE_USER = gql`
  mutation activateEmail($token: String!) {
    activateEmail(token: $token) {
      message
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword) {
      message
    }
  }
`;
export const ADD_TASK = gql`
  mutation AddTask($input: addTaskInput!) {
    addTask(input: $input) {
      id
      name
      category
      prioritylevel
      start
      finish
      duration
      date
      owner
      createdAt
    }
  }
`;
export const UPDATE_TASK = gql`
  mutation UpdateTask($updateTaskId: ID!, $input: updateTaskInput) {
    updateTask(id: $updateTaskId, input: $input) {
      id
      name
      category
      prioritylevel
      duration
      start
      finish
      date
      owner
      createdAt
      updatedAt
    }
  }
`;
export const DELETE_TASK = gql`
  mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId) {
      message
      success
    }
  }
`;
