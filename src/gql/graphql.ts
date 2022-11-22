/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mission = {
  __typename?: 'Mission';
  description: Scalars['String'];
  id: Scalars['Int'];
  level: Scalars['Int'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  health: Scalars['String'];
  loginWithGitHub: TokenResponse;
};


export type MutationLoginWithGitHubArgs = {
  code: Scalars['String'];
  redirectUrl?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  health: Scalars['String'];
  mission?: Maybe<Mission>;
  missionByTypeLevel?: Maybe<Mission>;
  missions: Array<Mission>;
};


export type QueryMissionArgs = {
  id: Scalars['Int'];
};


export type QueryMissionByTypeLevelArgs = {
  level: Scalars['Int'];
  type: Scalars['String'];
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  access_token: Scalars['String'];
};

export type LoginWithGitHubMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type LoginWithGitHubMutation = { __typename?: 'Mutation', loginWithGitHub: { __typename?: 'TokenResponse', access_token: string } };

export type MissionByTypeLevelQueryVariables = Exact<{
  type: Scalars['String'];
  level: Scalars['Int'];
}>;


export type MissionByTypeLevelQuery = { __typename?: 'Query', missionByTypeLevel?: { __typename?: 'Mission', id: number, title: string, type: string, level: number, description: string } | null };

export type MissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type MissionsQuery = { __typename?: 'Query', missions: Array<{ __typename?: 'Mission', id: number, title: string, type: string, level: number, description: string }> };


export const LoginWithGitHubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loginWithGitHub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithGitHub"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<LoginWithGitHubMutation, LoginWithGitHubMutationVariables>;
export const MissionByTypeLevelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"missionByTypeLevel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"level"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionByTypeLevel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"level"},"value":{"kind":"Variable","name":{"kind":"Name","value":"level"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<MissionByTypeLevelQuery, MissionByTypeLevelQueryVariables>;
export const MissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<MissionsQuery, MissionsQueryVariables>;