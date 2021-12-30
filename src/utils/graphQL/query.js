import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query Tasks($category: Category) {
    tasks(category: $category) {
      id
      name
      category
      prioritylevel
      date
      owner
      duration
      createdAt
    }
  }
`;

export const GET_TASK = gql`
  query Task($taskId: ID!) {
    task(id: $taskId) {
      name
      id
      start
      finish
      category
      prioritylevel
      duration
      date
      owner
      date
      createdAt
    }
  }
`;

export const Auth_User = gql`
  query authUser {
    authUser {
      username
      email
    }
  }
`;
