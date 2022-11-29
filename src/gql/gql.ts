/* eslint-disable */
import * as types from './graphql.js';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation loginWithGitHub($code: String!) {\n    loginWithGitHub(code: $code) {\n      access_token\n    }\n  }\n": types.LoginWithGitHubDocument,
    "\n  query missionByTypeLevel($type: String!, $level: Int!) {\n    missionByTypeLevel(type: $type, level: $level) {\n      id\n      title\n      type\n      level\n      description\n    }\n  }\n": types.MissionByTypeLevelDocument,
    "\n  query missions {\n    missions {\n      id\n      title\n      type\n      level\n      description\n    }\n  }\n": types.MissionsDocument,
};

export function gql(source: "\n  mutation loginWithGitHub($code: String!) {\n    loginWithGitHub(code: $code) {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation loginWithGitHub($code: String!) {\n    loginWithGitHub(code: $code) {\n      access_token\n    }\n  }\n"];
export function gql(source: "\n  query missionByTypeLevel($type: String!, $level: Int!) {\n    missionByTypeLevel(type: $type, level: $level) {\n      id\n      title\n      type\n      level\n      description\n    }\n  }\n"): (typeof documents)["\n  query missionByTypeLevel($type: String!, $level: Int!) {\n    missionByTypeLevel(type: $type, level: $level) {\n      id\n      title\n      type\n      level\n      description\n    }\n  }\n"];
export function gql(source: "\n  query missions {\n    missions {\n      id\n      title\n      type\n      level\n      description\n    }\n  }\n"): (typeof documents)["\n  query missions {\n    missions {\n      id\n      title\n      type\n      level\n      description\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;