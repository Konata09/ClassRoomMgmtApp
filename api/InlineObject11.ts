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

import { exists, mapValues } from './runtime';
/**
 *
 * @export
 * @interface InlineObject11
 */
export interface InlineObject11 {
    /**
     *
     * @type {string}
     * @memberof InlineObject11
     */
    username: string;
    /**
     *
     * @type {number}
     * @memberof InlineObject11
     */
    uid: number;
}

export function InlineObject11FromJSON(json: any): InlineObject11 {
    return InlineObject11FromJSONTyped(json, false);
}

export function InlineObject11FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject11 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'username': json['username'],
        'uid': json['uid'],
    };
}

export function InlineObject11ToJSON(value?: InlineObject11 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'username': value.username,
        'uid': value.uid,
    };
}


