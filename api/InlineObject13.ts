/* tslint:disable */
/* eslint-disable */
/**
 * ClassroomMgmtSys
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {exists, mapValues} from './runtime';

/**
 *
 * @export
 * @interface InlineObject
 */
export interface InlineObject13 {
  uid: number;
  day: string;
}

export function InlineObject13FromJSON(json: any): InlineObject13 {
  return InlineObject13FromJSONTyped(json, false);
}

export function InlineObject13FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject13 {
  if ((json === undefined) || (json === null)) {
    return json;
  }
  return {
    'uid': json['uid'],
    'day': json['day'],
  };
}

export function InlineObject13ToJSON(value?: InlineObject13 | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    'uid': value.uid,
    'day': value.day,
  };
}


