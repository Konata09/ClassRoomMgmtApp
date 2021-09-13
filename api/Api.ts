import * as runtime from './runtime';
import {InlineObject10, InlineObject10ToJSON} from "./InlineObject10";
import {InlineObject3, InlineObject3ToJSON} from "./InlineObject3";
import {InlineObject5, InlineObject5ToJSON} from "./InlineObject5";
import {InlineObject7, InlineObject7ToJSON} from "./InlineObject7";
import {InlineObject6, InlineObject6ToJSON} from "./InlineObject6";
import {InlineObject4, InlineObject4ToJSON} from "./InlineObject4";
import {InlineObject2, InlineObject2ToJSON} from "./InlineObject2";
import {InlineObject1, InlineObject1ToJSON} from "./InlineObject1";
import {InlineObject9, InlineObject9ToJSON} from "./InlineObject9";
import {InlineObject11, InlineObject11ToJSON} from "./InlineObject11";
import {InlineObject12, InlineObject12ToJSON} from "./InlineObject12";
import {InlineObject, InlineObjectToJSON} from "./InlineObject";
import {InlineObject8, InlineObject8ToJSON} from "./InlineObject8";

export interface AddTicketPostRequest {
  inlineObject2?: InlineObject2;
}

export interface AdminChangePasswordPostRequest {
  inlineObject7?: InlineObject7;
}

export interface AdminSetDevicePostRequest {
  inlineObject12?: InlineObject12;
}

export interface AdminSetRoomPostRequest {
  inlineObject10?: InlineObject10;
}

export interface AdminSetTicketDutyUserPostRequest {
  inlineObject4?: InlineObject4;
}

export interface AdminSetUserDeleteRequest {
}

export interface AdminSetUserGetRequest {
}

export interface AdminSetUserPutRequest {
  inlineObject5?: InlineObject5;
}

export interface GetDutyCalendarGetRequest {
}

export interface GetMyTicketGetRequest {
  userid: string;
}

export interface GetRoomDetailGetRequest {
  classid: string;
}

export interface GetRoomStatusGetRequest {
  classid: string;
}

export interface GetRoomsGetRequest {
  ping?: string;
}

export interface GetTicketDetailGetRequest {
  id: string;
}

export interface DelTicketPostRequest {
  id: string;
}

export interface GetTicketsGetRequest {
  count?: string;
}

export interface LoginPostRequest {
  inlineObject3?: InlineObject3;
}

export interface LogoutGetRequest {
}

export interface RefreshPostRequest {
  inlineObject11?: InlineObject11;
}

export interface SendCmdPostRequest {
  inlineObject9?: InlineObject9;
}

export interface SetDutyPostRequest {
  inlineObject?: InlineObject;
}

export interface SetTicketStatusPostRequest {
  inlineObject1?: InlineObject1;
}

export interface UserChangePasswordPostRequest {
  inlineObject8?: InlineObject8;
}

export interface UserChangePhonePostRequest {
  inlineObject6?: InlineObject6;
}

/**
 * no description
 */
export class Api extends runtime.BaseAPI {

  /**
   * add ticket
   */
  async addTicketPostRaw(requestParameters: AddTicketPostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/addTicket`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObject2ToJSON(requestParameters.inlineObject2),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * del ticket
   */
  async delTicketPostRaw(requestParameters: DelTicketPostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/admin/deleteTicket`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: {'id': requestParameters.id},
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * add ticket
   */
  async addTicketPost(requestParameters: AddTicketPostRequest): Promise<object> {
    const response = await this.addTicketPostRaw(requestParameters);
    return await response.value();
  }

  async deleteTicket(requestParameters: DelTicketPostRequest): Promise<object> {
    const response = await this.delTicketPostRaw(requestParameters);
    return await response.value();
  }

  /**
   * admin changePassword
   */
  async adminChangePasswordPostRaw(requestParameters: AdminChangePasswordPostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/admin/changePassword`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObject7ToJSON(requestParameters.inlineObject7),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * admin changePassword
   */
  async adminChangePasswordPost(requestParameters: AdminChangePasswordPostRequest): Promise<object> {
    const response = await this.adminChangePasswordPostRaw(requestParameters);
    return await response.value();
  }

  /**
   * setDevice
   */
  async adminSetDevicePostRaw(requestParameters: AdminSetDevicePostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/admin/setDevice`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObject12ToJSON(requestParameters.inlineObject12),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * setDevice
   */
  async adminSetDevicePost(requestParameters: AdminSetDevicePostRequest): Promise<object> {
    const response = await this.adminSetDevicePostRaw(requestParameters);
    return await response.value();
  }

  /**
   * set room
   */
  async adminSetRoomPostRaw(requestParameters: AdminSetRoomPostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/admin/setRoom`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObject10ToJSON(requestParameters.inlineObject10),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * set room
   */
  async adminSetRoomPost(requestParameters: AdminSetRoomPostRequest): Promise<object> {
    const response = await this.adminSetRoomPostRaw(requestParameters);
    return await response.value();
  }

  /**
   * setTicketDutyUser
   */
  async adminSetTicketDutyUserPostRaw(requestParameters: AdminSetTicketDutyUserPostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/admin/setTicketDutyUser`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObject4ToJSON(requestParameters.inlineObject4),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * setTicketDutyUser
   */
  async adminSetTicketDutyUserPost(requestParameters: AdminSetTicketDutyUserPostRequest): Promise<object> {
    const response = await this.adminSetTicketDutyUserPostRaw(requestParameters);
    return await response.value();
  }

  /**
   * del user
   */
  async adminSetUserDeleteRaw(requestParameters: AdminSetUserDeleteRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const response = await this.request({
      path: `/admin/setUser`,
      method: 'DELETE',
      headers: {},
      query: queryParameters,
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * del user
   */
  async adminSetUserDelete(requestParameters: AdminSetUserDeleteRequest): Promise<object> {
    const response = await this.adminSetUserDeleteRaw(requestParameters);
    return await response.value();
  }

  /**
   * get user
   */
  async adminSetUserGetRaw(requestParameters: AdminSetUserGetRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const response = await this.request({
      path: `/admin/setUser`,
      method: 'GET',
      headers: {},
      query: queryParameters,
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * get user
   */
  async adminSetUserGet(requestParameters: AdminSetUserGetRequest): Promise<object> {
    const response = await this.adminSetUserGetRaw(requestParameters);
    return await response.value();
  }

  /**
   * put user
   */
  async adminSetUserPutRaw(requestParameters: AdminSetUserPutRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/admin/setUser`,
      method: 'PUT',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObject5ToJSON(requestParameters.inlineObject5),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * put user
   */
  async adminSetUserPut(requestParameters: AdminSetUserPutRequest): Promise<object> {
    const response = await this.adminSetUserPutRaw(requestParameters);
    return await response.value();
  }

  /**
   * getDutyCalendar
   */
  async getDutyCalendarGetRaw(requestParameters: GetDutyCalendarGetRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const response = await this.request({
      path: `/getDutyCalendar`,
      method: 'GET',
      headers: {},
      query: queryParameters,
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * getDutyCalendar
   */
  async getDutyCalendarGet(requestParameters: GetDutyCalendarGetRequest): Promise<object> {
    const response = await this.getDutyCalendarGetRaw(requestParameters);
    return await response.value();
  }

  /**
   * getMyTicket
   */
  async getMyTicketGetRaw(requestParameters: GetMyTicketGetRequest): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.userid === null || requestParameters.userid === undefined) {
      throw new runtime.RequiredError('userid', 'Required parameter requestParameters.userid was null or undefined when calling getMyTicketGet.');
    }
    const queryParameters: runtime.HTTPQuery = {};
    queryParameters['userid'] = requestParameters.userid;
    const response = await this.request({
      path: `/getMyTicket`,
      method: 'GET',
      headers: {},
      query: queryParameters,
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * getMyTicket
   */
  async getMyTicketGet(requestParameters: GetMyTicketGetRequest): Promise<object> {
    const response = await this.getMyTicketGetRaw(requestParameters);
    return await response.value();
  }

  /**
   * getRoomDetail
   */
  async getRoomDetailGetRaw(requestParameters: GetRoomDetailGetRequest): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.classid === null || requestParameters.classid === undefined) {
      throw new runtime.RequiredError('classid', 'Required parameter requestParameters.classid was null or undefined when calling getRoomDetailGet.');
    }
    const queryParameters: runtime.HTTPQuery = {};
    queryParameters['classid'] = requestParameters.classid;
    const response = await this.request({
      path: `/getRoomDetail`,
      method: 'GET',
      headers: {},
      query: queryParameters,
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * getRoomDetail
   */
  async getRoomDetailGet(requestParameters: GetRoomDetailGetRequest): Promise<object> {
    const response = await this.getRoomDetailGetRaw(requestParameters);
    return await response.value();
  }

  /**
   * getRoomStatus
   */
  async getRoomStatusGetRaw(requestParameters: GetRoomStatusGetRequest): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.classid === null || requestParameters.classid === undefined) {
      throw new runtime.RequiredError('classid', 'Required parameter requestParameters.classid was null or undefined when calling getRoomStatusGet.');
    }
    const queryParameters: runtime.HTTPQuery = {};
    queryParameters['classid'] = requestParameters.classid;
    const response = await this.request({
      path: `/getRoomStatus`,
      method: 'GET',
      headers: {},
      query: queryParameters,
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * getRoomStatus
   */
  async getRoomStatusGet(requestParameters: GetRoomStatusGetRequest): Promise<object> {
    const response = await this.getRoomStatusGetRaw(requestParameters);
    return await response.value();
  }

  /**
   * get rooms
   */
  async getRoomsGetRaw(requestParameters: GetRoomsGetRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    if (requestParameters.ping !== undefined) {
      queryParameters['ping'] = requestParameters.ping;
    }
    const response = await this.request({
      path: `/getRooms`,
      method: 'GET',
      headers: {},
      query: queryParameters,
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * get rooms
   */
  async getRoomsGet(requestParameters: GetRoomsGetRequest): Promise<object> {
    const response = await this.getRoomsGetRaw(requestParameters);
    return await response.value();
  }

  /**
   * getTicketDetail
   */
  async getTicketDetailGetRaw(requestParameters: GetTicketDetailGetRequest): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError('id', 'Required parameter requestParameters.id was null or undefined when calling getTicketDetailGet.');
    }
    const queryParameters: runtime.HTTPQuery = {};
    queryParameters['id'] = requestParameters.id;
    const response = await this.request({
      path: `/getTicketDetail`,
      method: 'GET',
      headers: {},
      query: queryParameters,
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * getTicketDetail
   */
  async getTicketDetailGet(requestParameters: GetTicketDetailGetRequest): Promise<object> {
    const response = await this.getTicketDetailGetRaw(requestParameters);
    return await response.value();
  }

  /**
   * getTickets
   */
  async getTicketsGetRaw(requestParameters: GetTicketsGetRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    if (requestParameters.count !== undefined) {
      queryParameters['count'] = requestParameters.count;
    }
    const response = await this.request({
      path: `/getTickets`,
      method: 'GET',
      headers: {},
      query: queryParameters,
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * getTickets
   */
  async getTicketsGet(requestParameters: GetTicketsGetRequest): Promise<object> {
    const response = await this.getTicketsGetRaw(requestParameters);
    return await response.value();
  }

  /**
   * screen
   */
  async loginPostRaw(requestParameters: LoginPostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/login`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObject3ToJSON(requestParameters.inlineObject3),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * screen
   */
  async loginPost(requestParameters: LoginPostRequest): Promise<object> {
    const response = await this.loginPostRaw(requestParameters);
    return await response.value();
  }

  /**
   * logout
   */
  async logoutGetRaw(requestParameters: LogoutGetRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const response = await this.request({
      path: `/logout`,
      method: 'GET',
      headers: {},
      query: queryParameters,
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * logout
   */
  async logoutGet(requestParameters: LogoutGetRequest): Promise<object> {
    const response = await this.logoutGetRaw(requestParameters);
    return await response.value();
  }

  /**
   * refresh
   */
  async refreshPostRaw(requestParameters: RefreshPostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/refresh`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObject11ToJSON(requestParameters.inlineObject11),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * refresh
   */
  async refreshPost(requestParameters: RefreshPostRequest): Promise<object> {
    const response = await this.refreshPostRaw(requestParameters);
    return await response.value();
  }

  /**
   * send cmd
   */
  async sendCmdPostRaw(requestParameters: SendCmdPostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/sendCmd`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObject9ToJSON(requestParameters.inlineObject9),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * send cmd
   */
  async sendCmdPost(requestParameters: SendCmdPostRequest): Promise<object> {
    const response = await this.sendCmdPostRaw(requestParameters);
    return await response.value();
  }

  /**
   * uid 为 0 表示无人
   * SetDutyCalenderUser
   */
  async setDutyPostRaw(requestParameters: SetDutyPostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/setDuty`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObjectToJSON(requestParameters.inlineObject),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * uid 为 0 表示无人
   * SetDutyCalenderUser
   */
  async setDutyPost(requestParameters: SetDutyPostRequest): Promise<object> {
    const response = await this.setDutyPostRaw(requestParameters);
    return await response.value();
  }

  /**
   * setTicketStatus
   */
  async setTicketStatusPostRaw(requestParameters: SetTicketStatusPostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/setTicketStatus`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObject1ToJSON(requestParameters.inlineObject1),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * setTicketStatus
   */
  async setTicketStatusPost(requestParameters: SetTicketStatusPostRequest): Promise<object> {
    const response = await this.setTicketStatusPostRaw(requestParameters);
    return await response.value();
  }

  /**
   * user changePassword
   */
  async userChangePasswordPostRaw(requestParameters: UserChangePasswordPostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/user/changePassword`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObject8ToJSON(requestParameters.inlineObject8),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * user changePassword
   */
  async userChangePasswordPost(requestParameters: UserChangePasswordPostRequest): Promise<object> {
    const response = await this.userChangePasswordPostRaw(requestParameters);
    return await response.value();
  }

  /**
   * change phone
   */
  async userChangePhonePostRaw(requestParameters: UserChangePhonePostRequest): Promise<runtime.ApiResponse<object>> {
    const queryParameters: runtime.HTTPQuery = {};
    const headerParameters: runtime.HTTPHeaders = {};
    headerParameters['Content-Type'] = 'application/json';
    const response = await this.request({
      path: `/user/changePhone`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: InlineObject6ToJSON(requestParameters.inlineObject6),
    });
    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * change phone
   */
  async userChangePhonePost(requestParameters: UserChangePhonePostRequest): Promise<object> {
    const response = await this.userChangePhonePostRaw(requestParameters);
    return await response.value();
  }

}
