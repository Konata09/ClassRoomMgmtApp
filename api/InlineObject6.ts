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
 * @interface InlineObject6
 */
export interface InlineObject6 {
    /**
     *
     * @type {number}
     * @memberof InlineObject6
     */
    uid: number;
    /**
     *
     * @type {number}
     * @memberof InlineObject6
     */
    phone: number;
}

export function InlineObject6FromJSON(json: any): InlineObject6 {
    return InlineObject6FromJSONTyped(json, false);
}

export function InlineObject6FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject6 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'uid': json['uid'],
        'phone': json['phone'],
    };
}

export function InlineObject6ToJSON(value?: InlineObject6 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'uid': value.uid,
        'phone': value.phone,
    };
}


