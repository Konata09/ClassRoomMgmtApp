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
 * @interface InlineObject1
 */
export interface InlineObject1 {
    /**
     *
     * @type {number}
     * @memberof InlineObject1
     */
    id: number;
    /**
     *
     * @type {number}
     * @memberof InlineObject1
     */
    status: number;
}

export function InlineObject1FromJSON(json: any): InlineObject1 {
    return InlineObject1FromJSONTyped(json, false);
}

export function InlineObject1FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject1 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'id': json['id'],
        'status': json['status'],
    };
}

export function InlineObject1ToJSON(value?: InlineObject1 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'id': value.id,
        'status': value.status,
    };
}

