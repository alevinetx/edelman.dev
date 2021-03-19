/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWebMentionEvent = /* GraphQL */ `
  query GetWebMentionEvent(
    $targetId: ID!
    $type: WebMentionType!
    $createdAt: AWSDateTime!
  ) {
    getWebMentionEvent(
      targetId: $targetId
      type: $type
      createdAt: $createdAt
    ) {
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
export const listWebMentionEvents = /* GraphQL */ `
  query ListWebMentionEvents(
    $targetId: ID
    $typeCreatedAt: ModelWebMentionEventPrimaryCompositeKeyConditionInput
    $filter: ModelWebMentionEventFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listWebMentionEvents(
      targetId: $targetId
      typeCreatedAt: $typeCreatedAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const webMentionEventsByTarget = /* GraphQL */ `
  query WebMentionEventsByTarget(
    $target: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWebMentionEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    webMentionEventsByTarget(
      target: $target
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const webMentionEventsByType = /* GraphQL */ `
  query WebMentionEventsByType(
    $type: WebMentionType
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWebMentionEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    webMentionEventsByType(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const webMentionEventsBySlug = /* GraphQL */ `
  query WebMentionEventsBySlug(
    $targetSlug: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWebMentionEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    webMentionEventsBySlug(
      targetSlug: $targetSlug
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
