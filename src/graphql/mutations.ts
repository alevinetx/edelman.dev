/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createWebMentionEvent = /* GraphQL */ `
  mutation CreateWebMentionEvent(
    $input: CreateWebMentionEventInput!
    $condition: ModelWebMentionEventConditionInput
  ) {
    createWebMentionEvent(input: $input, condition: $condition) {
      targetId
      targetSlug
      targetName
      targetType
      createdAt
      updatedAt
      type
      secret
      source
      target
      postType
      postUrl
      authorName
      authorPhoto
      authorUrl
      published
      name
    }
  }
`;
export const updateWebMentionEvent = /* GraphQL */ `
  mutation UpdateWebMentionEvent(
    $input: UpdateWebMentionEventInput!
    $condition: ModelWebMentionEventConditionInput
  ) {
    updateWebMentionEvent(input: $input, condition: $condition) {
      targetId
      targetSlug
      targetName
      targetType
      createdAt
      updatedAt
      type
      secret
      source
      target
      postType
      postUrl
      authorName
      authorPhoto
      authorUrl
      published
      name
    }
  }
`;
export const deleteWebMentionEvent = /* GraphQL */ `
  mutation DeleteWebMentionEvent(
    $input: DeleteWebMentionEventInput!
    $condition: ModelWebMentionEventConditionInput
  ) {
    deleteWebMentionEvent(input: $input, condition: $condition) {
      targetId
      targetSlug
      targetName
      targetType
      createdAt
      updatedAt
      type
      secret
      source
      target
      postType
      postUrl
      authorName
      authorPhoto
      authorUrl
      published
      name
    }
  }
`;
