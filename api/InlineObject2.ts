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
 * @interface InlineObject2
 */
export interface InlineObject2 {
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    title: string;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    detail: string;
    /**
     *
     * @type {number}
     * @memberof InlineObject2
     */
    severity: number;
    /**
     *
     * @type {number}
     * @memberof InlineObject2
     */
    status?: number;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    place: string;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    classroomName?: string;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    classroomGroup?: string;
    /**
     *
     * @type {number}
     * @memberof InlineObject2
     */
    createUser: number;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    createUserName?: string;
    /**
     *
     * @type {number}
     * @memberof InlineObject2
     */
    dutyUser1: number;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    dutyUser1Name?: string;
    /**
     *
     * @type {number}
     * @memberof InlineObject2
     */
    dutyUser2: number;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    dutyUser2Name?: string;
    /**
     *
     * @type {number}
     * @memberof InlineObject2
     */
    dutyUser3: number;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    dutyUser3Name?: string;
    /**
     *
     * @type {number}
     * @memberof InlineObject2
     */
    completeUser?: number;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    completeUserName?: string;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    createTime: string;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    startTime: string;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    completeTime?: string;
    /**
     *
     * @type {string}
     * @memberof InlineObject2
     */
    completeDetail?: string;
}

export function InlineObject2FromJSON(json: any): InlineObject2 {
    return InlineObject2FromJSONTyped(json, false);
}

export function InlineObject2FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject2 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'title': json['title'],
        'detail': json['detail'],
        'severity': json['severity'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'place': json['place'],
        'classroomName': !exists(json, 'classroom_name') ? undefined : json['classroom_name'],
        'classroomGroup': !exists(json, 'classroom_group') ? undefined : json['classroom_group'],
        'createUser': json['create_user'],
        'createUserName': !exists(json, 'create_user_name') ? undefined : json['create_user_name'],
        'dutyUser1': json['duty_user_1'],
        'dutyUser1Name': !exists(json, 'duty_user_1_name') ? undefined : json['duty_user_1_name'],
        'dutyUser2': json['duty_user_2'],
        'dutyUser2Name': !exists(json, 'duty_user_2_name') ? undefined : json['duty_user_2_name'],
        'dutyUser3': json['duty_user_3'],
        'dutyUser3Name': !exists(json, 'duty_user_3_name') ? undefined : json['duty_user_3_name'],
        'completeUser': !exists(json, 'complete_user') ? undefined : json['complete_user'],
        'completeUserName': !exists(json, 'complete_user_name') ? undefined : json['complete_user_name'],
        'createTime': json['create_time'],
        'startTime': json['start_time'],
        'completeTime': !exists(json, 'complete_time') ? undefined : json['complete_time'],
        'completeDetail': !exists(json, 'complete_detail') ? undefined : json['complete_detail'],
    };
}

export function InlineObject2ToJSON(value?: InlineObject2 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'title': value.title,
        'detail': value.detail,
        'severity': value.severity,
        'status': value.status,
        'place': value.place,
        'classroom_name': value.classroomName,
        'classroom_group': value.classroomGroup,
        'create_user': value.createUser,
        'create_user_name': value.createUserName,
        'duty_user_1': value.dutyUser1,
        'duty_user_1_name': value.dutyUser1Name,
        'duty_user_2': value.dutyUser2,
        'duty_user_2_name': value.dutyUser2Name,
        'duty_user_3': value.dutyUser3,
        'duty_user_3_name': value.dutyUser3Name,
        'complete_user': value.completeUser,
        'complete_user_name': value.completeUserName,
        'create_time': value.createTime,
        'start_time': value.startTime,
        'complete_time': value.completeTime,
        'complete_detail': value.completeDetail,
    };
}


