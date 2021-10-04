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
 * @interface InlineObject5
 */
export interface InlineObject5 {
    /**
     *
     * @type {string}
     * @memberof InlineObject5
     */
    username: string;
    /**
     *
     * @type {string}
     * @memberof InlineObject5
     */
    password: string;
    /**
     *
     * @type {string}
     * @memberof InlineObject5
     */
    rolename: string;
    /**
     *
     * @type {number}
     * @memberof InlineObject5
     */
    phone: number;
}

export function InlineObject5FromJSON(json: any): InlineObject5 {
    return InlineObject5FromJSONTyped(json, false);
}

export function InlineObject5FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject5 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'username': json['username'],
        'password': json['password'],
        'rolename': json['rolename'],
        'phone': json['phone'],
    };
}

export function InlineObject5ToJSON(value?: InlineObject5 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'username': value.username,
        'password': value.password,
        'rolename': value.rolename,
        'phone': value.phone,
    };
}

