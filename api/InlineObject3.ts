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
 * @interface InlineObject3
 */
export interface InlineObject3 {
    /**
     *
     * @type {string}
     * @memberof InlineObject3
     */
    username: string;
    /**
     *
     * @type {string}
     * @memberof InlineObject3
     */
    password: string;
    /**
     *
     * @type {string}
     * @memberof InlineObject3
     */
    title: string;
}

export function InlineObject3FromJSON(json: any): InlineObject3 {
    return InlineObject3FromJSONTyped(json, false);
}

export function InlineObject3FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject3 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'username': json['username'],
        'password': json['password'],
        'title': json['title'],
    };
}

export function InlineObject3ToJSON(value?: InlineObject3 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'username': value.username,
        'password': value.password,
        'title': value.title,
    };
}


