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
  /** Date time */
  Date: number;
  /** Decimal */
  Decimal: number;
};

export type Bug = {
  __typename?: 'Bug';
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type BugOnGame = {
  __typename?: 'BugOnGame';
  bugId: Scalars['Int'];
  gameId: Scalars['ID'];
};

export type Game = {
  __typename?: 'Game';
  bugs?: Maybe<Array<BugOnGame>>;
  finishedAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  mission?: Maybe<Mission>;
  score?: Maybe<Scalars['Decimal']>;
  startedAt: Scalars['Date'];
};

export type Mission = {
  __typename?: 'Mission';
  bugs?: Maybe<Array<Bug>>;
  description: Scalars['String'];
  id: Scalars['Int'];
  level: Scalars['Int'];
  releaseDate?: Maybe<Scalars['Date']>;
  sourceCode?: Maybe<Array<MissionSourceCode>>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type MissionSourceCode = {
  __typename?: 'MissionSourceCode';
  id: Scalars['String'];
  src: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  finishGame: Game;
  health: Scalars['String'];
  loginWithGitHub: TokenResponse;
  selectBug: Game;
  startGame: Game;
  unselectBug: Game;
};


export type MutationFinishGameArgs = {
  id: Scalars['ID'];
};


export type MutationLoginWithGitHubArgs = {
  code: Scalars['String'];
  redirectUrl?: InputMaybe<Scalars['String']>;
};


export type MutationSelectBugArgs = {
  bugId: Scalars['Int'];
  gameId: Scalars['ID'];
};


export type MutationStartGameArgs = {
  missionId: Scalars['Int'];
};


export type MutationUnselectBugArgs = {
  bugId: Scalars['Int'];
  gameId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<Game>;
  getScoreboardPosition: Scalars['Int'];
  health: Scalars['String'];
  me: User;
  mission?: Maybe<Mission>;
  missionByTypeLevel?: Maybe<Mission>;
  missions: Array<Mission>;
  missionsByType: Array<Mission>;
  scoreboard?: Maybe<Scoreboard>;
  scoreboards: Array<Scoreboard>;
};


export type QueryGameArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryGetScoreboardPositionArgs = {
  missionId: Scalars['Int'];
};


export type QueryMissionArgs = {
  id: Scalars['Int'];
};


export type QueryMissionByTypeLevelArgs = {
  level: Scalars['Int'];
  type: Scalars['String'];
};


export type QueryMissionsByTypeArgs = {
  type: Scalars['String'];
};


export type QueryScoreboardArgs = {
  missionId: Scalars['Int'];
};


export type QueryScoreboardsArgs = {
  missionId: Scalars['Int'];
  pagination?: InputMaybe<ScoreboardPaginationInput>;
};

export type Scoreboard = {
  __typename?: 'Scoreboard';
  game?: Maybe<Game>;
  id: Scalars['ID'];
  mission?: Maybe<Mission>;
  score: Scalars['Int'];
  user?: Maybe<User>;
};

export type ScoreboardPaginationInput = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  access_token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  alias?: Maybe<Scalars['String']>;
  games?: Maybe<Array<Game>>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  scoreboards?: Maybe<Array<Scoreboard>>;
};


export type UserGamesArgs = {
  missionId?: InputMaybe<Scalars['Int']>;
};


export type UserScoreboardsArgs = {
  missionId?: InputMaybe<Scalars['Int']>;
};

export type LoginWithGitHubMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type LoginWithGitHubMutation = { __typename?: 'Mutation', loginWithGitHub: { __typename?: 'TokenResponse', access_token: string } };

export type GameQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GameQuery = { __typename?: 'Query', game?: { __typename?: 'Game', id: string, startedAt: number, mission?: { __typename?: 'Mission', id: number, title: string, type: string, level: number, description: string, sourceCode?: Array<{ __typename?: 'MissionSourceCode', src: string }> | null, bugs?: Array<{ __typename?: 'Bug', id: number, name: string, description: string }> | null } | null, bugs?: Array<{ __typename?: 'BugOnGame', bugId: number }> | null } | null };

export type SelectBugMutationVariables = Exact<{
  gameId: Scalars['ID'];
  bugId: Scalars['Int'];
}>;


export type SelectBugMutation = { __typename?: 'Mutation', selectBug: { __typename?: 'Game', id: string, bugs?: Array<{ __typename?: 'BugOnGame', bugId: number }> | null } };

export type UnselectBugMutationVariables = Exact<{
  gameId: Scalars['ID'];
  bugId: Scalars['Int'];
}>;


export type UnselectBugMutation = { __typename?: 'Mutation', unselectBug: { __typename?: 'Game', id: string, bugs?: Array<{ __typename?: 'BugOnGame', bugId: number }> | null } };

export type FinishGameMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FinishGameMutation = { __typename?: 'Mutation', finishGame: { __typename?: 'Game', id: string, finishedAt?: number | null } };

export type MissionsByTypeQueryVariables = Exact<{
  type: Scalars['String'];
}>;


export type MissionsByTypeQuery = { __typename?: 'Query', missionsByType: Array<{ __typename?: 'Mission', id: number, title: string, type: string, level: number, description: string, releaseDate?: number | null }> };

export type StartMissionMutationVariables = Exact<{
  missionId: Scalars['Int'];
}>;


export type StartMissionMutation = { __typename?: 'Mutation', startGame: { __typename?: 'Game', id: string } };

export type CurrentGameQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentGameQuery = { __typename?: 'Query', game?: { __typename?: 'Game', id: string } | null };

export type ScoreboardQueryVariables = Exact<{
  missionId: Scalars['Int'];
  gameId: Scalars['ID'];
  pagination: ScoreboardPaginationInput;
}>;


export type ScoreboardQuery = { __typename?: 'Query', getScoreboardPosition: number, scoreboards: Array<{ __typename?: 'Scoreboard', id: string, score: number, user?: { __typename?: 'User', id: string, name?: string | null, alias?: string | null, image?: string | null } | null }>, scoreboard?: { __typename?: 'Scoreboard', id: string, score: number } | null, game?: { __typename?: 'Game', id: string, score?: number | null } | null };


export const LoginWithGitHubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loginWithGitHub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithGitHub"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<LoginWithGitHubMutation, LoginWithGitHubMutationVariables>;
export const GameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"game"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"sourceCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"bugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bugId"}}]}}]}}]}}]} as unknown as DocumentNode<GameQuery, GameQueryVariables>;
export const SelectBugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"selectBug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bugId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectBug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"bugId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bugId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bugId"}}]}}]}}]}}]} as unknown as DocumentNode<SelectBugMutation, SelectBugMutationVariables>;
export const UnselectBugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unselectBug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bugId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unselectBug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"bugId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bugId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bugId"}}]}}]}}]}}]} as unknown as DocumentNode<UnselectBugMutation, UnselectBugMutationVariables>;
export const FinishGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"finishGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finishGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}}]}}]}}]} as unknown as DocumentNode<FinishGameMutation, FinishGameMutationVariables>;
export const MissionsByTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"missionsByType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionsByType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}}]}}]} as unknown as DocumentNode<MissionsByTypeQuery, MissionsByTypeQueryVariables>;
export const StartMissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startMission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<StartMissionMutation, StartMissionMutationVariables>;
export const CurrentGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"currentGame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CurrentGameQuery, CurrentGameQueryVariables>;
export const ScoreboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"scoreboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"missionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScoreboardPaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScoreboardPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionId"}}}]},{"kind":"Field","name":{"kind":"Name","value":"scoreboards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"missionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"missionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"game"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]} as unknown as DocumentNode<ScoreboardQuery, ScoreboardQueryVariables>;