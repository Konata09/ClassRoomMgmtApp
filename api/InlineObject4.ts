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
 * @interface InlineObject4
 */
export interface InlineObject4 {
    /**
     *
     * @type {number}
     * @memberof InlineObject4
     */
    id: number;
    /**
     *
     * @type {number}
     * @memberof InlineObject4
     */
    dutyUser1: number;
    /**
     *
     * @type {number}
     * @memberof InlineObject4
     */
    dutyUser2?: number;
    /**
     *
     * @type {number}
     * @memberof InlineObject4
     */
    dutyUser3?: number;
}

export function InlineObject4FromJSON(json: any): InlineObject4 {
    return InlineObject4FromJSONTyped(json, false);
}

export function InlineObject4FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject4 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'id': json['id'],
        'dutyUser1': json['duty_user_1'],
        'dutyUser2': !exists(json, 'duty_user_2') ? undefined : json['duty_user_2'],
        'dutyUser3': !exists(json, 'duty_user_3') ? undefined : json['duty_user_3'],
    };
}

export function InlineObject4ToJSON(value?: InlineObject4 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'id': value.id,
        'duty_user_1': value.dutyUser1,
        'duty_user_2': value.dutyUser2,
        'duty_user_3': value.dutyUser3,
    };
}

