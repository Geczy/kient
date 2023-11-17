// src/ws/chatroom/dto/chat-message.event.ts
var __\u03A9ChatterStatus = ["BROADCASTER", () => "broadcaster", "MODERATOR", () => "moderator", "SUBSCRIBER", () => "subscriber", "SUB_GIFTER", () => "sub_gifter", "OG", () => "og", "FOUNDER", () => "founder", `PC!>"C#>$C%>&C'>(C)>*C+>,B`];
var ChatterStatus = /* @__PURE__ */ ((ChatterStatus2) => {
  ChatterStatus2["BROADCASTER"] = "broadcaster";
  ChatterStatus2["MODERATOR"] = "moderator";
  ChatterStatus2["SUBSCRIBER"] = "subscriber";
  ChatterStatus2["SUB_GIFTER"] = "sub_gifter";
  ChatterStatus2["OG"] = "og";
  ChatterStatus2["FOUNDER"] = "founder";
  return ChatterStatus2;
})(ChatterStatus || {});
var __\u03A9ChatMessageEvent = ["id", "chatroom_id", "content", "type", "created_at", "username", "slug", "color", "text", "count", "badges", "identity", "sender", `P&4!'4"&4#&4$T4%P'4!&4&&4'P&4(P&4$&4)'4*8MF4+M4,M4-M`];

// src/utils/instance.base.ts
var BaseInstance = class {
  constructor(data, client) {
    this._client = client;
    this.data = data;
  }
};
BaseInstance.__type = ["T", () => Kient, "_client", "data", () => Kient, "client", "constructor", `b!P7"3#<e!!3$Pe"!2$P7%2&"0'5`];

// src/ws/chatroom/instance/chat-message.instance.ts
import { deserialize } from "@deepkit/type";
function __assignType(fn, args) {
  fn.__type = args;
  return fn;
}
var ChatMessageInstance = class extends BaseInstance {
  constructor(data, client) {
    super((deserialize.\u03A9 = [[() => __\u03A9ChatMessageEvent, "n!"]], deserialize(data)), client);
  }
  chatterIs(chatterStatus) {
    const badges = this.data.sender.identity.badges;
    return badges.filter(__assignType((x) => x.type === chatterStatus, ["x", "", 'P"2!"/"'])).length > 0;
  }
  async deleteMessage() {
    return this._client.api.chat.deleteMessage(this.data.chatroom_id, this.data.id);
  }
};
ChatMessageInstance.__type = [() => __\u03A9ChatMessageEvent, () => BaseInstance, "data", () => Kient, "client", "constructor", () => __\u03A9ChatterStatus, "chatterStatus", "chatterIs", "deleteMessage", () => __\u03A9ChatMessageEvent, `Pn!7"P"2#P7$2%"0&PPn'&J2("0)P"0*5n+6"`];

// src/ws/chatroom/chatroom.events.ts
var __\u03A9ChatroomEvents = [() => ChatMessageInstance, "chatMessageInstance", "onMessage", 'PPP7!I"G4#M'];

// src/ws/ws.events.ts
var __\u03A9CoreEvents = ["wsConnected", "wsDisconnected", 'PPG4!PG4"M'];
var __\u03A9KientEvents = [() => __\u03A9CoreEvents, () => __\u03A9ChatroomEvents, 'Pn!n"K'];

// src/endpoints/authentication/dto/tokens.response.ts
var __\u03A9TokensResponse = ["enabled", "nameFieldName", "unrandomizedNameFieldName", "validFromFieldName", "encryptedValidFrom", 'P)4!&4"&4#&4$&4%M'];

// src/endpoints/authentication/dto/login.response.ts
var __\u03A9LoginResponse = ["2fa_required", "otp_required", "token", 'P)4!8)4"8&4#8M'];
var __\u03A9LoginErrorResponse = ["message", "P&4!M"];

// src/endpoints/authentication/dto/user.response.ts
var __\u03A9UserResponse = ["id", "email", "username", "google_id", "agreed_to_terms", "email_verified_at", "bio", "country", "state", "city", "enable_live_notifications", "instagram", "twitter", "youtube", "discord", "tiktok", "facebook", "enable_onscreen_live_notifications", "apple_id", "phone", "email_updated_at", "newsletter_subscribed", "enable_sms_promo", "enable_sms_security", "profilepic", "filtered_categories", "is_2fa_setup", "redirect", "channel_can_be_updated", "is_live", "intercom_hash", "roles", "user_id", "slug", "is_banned", "playback_url", "name_updated_at", "vod_enabled", "subscription_enabled", "can_host", "streamer_channel", `P'4!&4"&4#P,#J4$)4%P,TJ4&P,&J4'&4(&4)&4*)4+&4,&4-&4.&4/&40&41)42P,#J43P,#J44P,TJ45)46)47)48&49#F4:)4;P,#J4<)4=)4>P,#J4?#F4@P'4!'4A&4B)4C&4DP,#J4E)4F)4G)4HM4IM`];

// src/client/api.client.ts
import { ofetch } from "ofetch";
import initCycleTLS from "cycletls";
import exitHook from "exit-hook";
import toughCookie from "tough-cookie";
function __assignType2(fn, args) {
  fn.__type = args;
  return fn;
}
var __\u03A9CallKickAPICycles = ["endpoint", "head", "get", "post", "put", "delete", "trace", "options", "connect", "patch", "method", "options", `P&4!P.".#.$.%.&.'.(.).*J4+8"4,8M`];
var _ApiClient = class _ApiClient {
  constructor(client) {
    this.cookieJar = new toughCookie.CookieJar();
    this.bearerToken = "";
    this._client = client;
    this._apiFetch = ofetch.create({
      baseURL: "https://kick.com"
    });
  }
  async init() {
    this._cycleClient = await initCycleTLS();
    exitHook(() => {
      this._cycleClient.exit();
    });
  }
  static async create(client) {
    const apiClient = new _ApiClient(client);
    await apiClient.init();
    return apiClient;
  }
  async callKickApi(params) {
    const requestUrl = `https://kick.com/${params.endpoint}`;
    const defaultOptions = {
      ja3: "771,4865-4867-4866-49195-49199-52393-52392-49196-49200-49162-49161-49171-49172-51-57-47-53-10,0-23-65281-10-11-35-16-5-51-43-13-45-28-21,29-23-24-25-256-257,0",
      userAgent: "KICK/1.0.13 Dalvik/2.1.0(Linux; U; Android 13; Pixel 6 Pro Build / TQ1A.221205.011)",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cookie": await this.cookieJar.getCookieString(requestUrl),
        "Authorization": `Bearer ${this.bearerToken}`
      }
    };
    const response = await this._cycleClient(requestUrl, { ...defaultOptions, ...params.options }, params.method);
    await this.handleCookies(response, requestUrl);
    return response;
  }
  async setBearerToken(token) {
    this.bearerToken = token;
  }
  async handleCookies(response, url) {
    if (!response.headers["Set-Cookie"]) {
      return;
    }
    if (Array.isArray(response.headers["Set-Cookie"])) {
      response.headers["Set-Cookie"].map(__assignType2(async (cookieString) => await this.cookieJar.setCookie(cookieString, url), ["cookieString", "", 'P"2!"/"']));
    } else {
      await this.cookieJar.setCookie(response.headers["Set-Cookie"], url);
    }
  }
};
_ApiClient.__type = ["_client", "_apiFetch", "_cycleClient", "client", "constructor", "init", "create", () => __\u03A9CallKickAPICycles, "params", "callKickApi", "token", "setBearerToken", "response", "url", "handleCookies", `"3!9;!3"9;"3#;P"2$"0%P"0&;P"2$"0'sPn(2)"0*P&2+"0,P"2-&2."0/;5`];
var ApiClient = _ApiClient;

// src/endpoints/endpoint.base.ts
var BaseEndpoint = class {
  constructor(client, apiClient) {
    this._client = client;
    this._apiClient = apiClient;
  }
};
BaseEndpoint.__type = [() => Kient, "_client", () => ApiClient, "_apiClient", () => Kient, "client", () => ApiClient, "apiClient", "constructor", `P7!3"9<P7#3$9<PP7%2&P7'2("0)5`];

// src/endpoints/authentication/authentication.endpoint.ts
import { deserialize as deserialize2 } from "@deepkit/type";

// src/utils/error.base.ts
var ErrorBase = class extends Error {
  constructor(error) {
    var _a;
    super();
    this.name = error.name;
    this.message = (_a = error.message) != null ? _a : "";
    this.cause = error.cause;
  }
};
ErrorBase.__type = ["T", () => Error, "name", "message", "cause", "error", "constructor", `b!P7"e!!3#&3$"3%8PPe#!4#&4$8"4%8M2&"0'5`];

// src/endpoints/authentication/authentication.error.ts
var __\u03A9ErrorName = ["2FA_REQUIRED", "INCORRECT_CREDENTIALS", "INVALID_CREDENTIALS", "INVALID_2FA_CODE", 'P.!.".#.$J'];
var KientAuthenticationError = class extends ErrorBase {
};
KientAuthenticationError.__type = [() => __\u03A9ErrorName, () => ErrorBase, () => __\u03A9ErrorName, 'Pn!7"5n#6"'];

// src/endpoints/api.error.ts
var __\u03A9ErrorName2 = ["SOMETHING_WENT_WRONG", "UNAUTHENTICATED", 'P.!."J'];
var KientApiError = class extends ErrorBase {
};
KientApiError.__type = [() => __\u03A9ErrorName2, () => ErrorBase, () => __\u03A9ErrorName2, 'Pn!7"5n#6"'];

// src/endpoints/authentication/authentication.endpoint.ts
var __\u03A9LoginCredentials = ["email", "password", "otc", `P&4!&4"P'&J4#8M`];
var AuthenticationEndpoint = class extends BaseEndpoint {
  async getTokens() {
    const response = await this._apiClient.callKickApi({ endpoint: "kick-token-provider" });
    if (response.status !== 200) {
      console.log(response.status, response.body);
      throw new KientApiError({
        name: "SOMETHING_WENT_WRONG",
        message: "Failed to retrieve pre-login tokens"
      });
    }
    return deserialize2.\u03A9 = [[() => __\u03A9TokensResponse, "n!"]], deserialize2(response.body);
  }
  async login(credentials) {
    const tokens = await this.getTokens();
    const body = {
      email: credentials.email,
      password: credentials.password,
      one_time_password: credentials.otc,
      [tokens.nameFieldName]: "",
      [tokens.validFromFieldName]: tokens.encryptedValidFrom,
      isMobileRequest: true
    };
    const response = await this._apiClient.callKickApi({
      endpoint: "mobile/login",
      method: "post",
      options: {
        body: JSON.stringify(body)
      }
    });
    if (response.status === 422) {
      const responseBody = (deserialize2.\u03A9 = [[() => __\u03A9LoginErrorResponse, "n!"]], deserialize2(response.body));
      if (responseBody.message === "Username or password is not correct") {
        throw new KientAuthenticationError({
          name: "INCORRECT_CREDENTIALS",
          message: responseBody.message
        });
      }
      if (responseBody.message === "The given data was invalid.") {
        throw new KientAuthenticationError({
          name: "INVALID_CREDENTIALS",
          message: responseBody.message
        });
      }
    }
    if (response.status === 400) {
      const responseBody = (deserialize2.\u03A9 = [[() => __\u03A9LoginErrorResponse, "n!"]], deserialize2(response.body));
      if (responseBody.message === "Invalid OTP") {
        throw new KientAuthenticationError({
          name: "INVALID_2FA_CODE",
          message: "Provided one time code is incorrect"
        });
      }
    }
    if (response.status === 200) {
      const responseBody = (deserialize2.\u03A9 = [[() => __\u03A9LoginResponse, "n!"]], deserialize2(response.body));
      if (responseBody.token) {
        this._apiClient.setBearerToken(responseBody.token);
        this._client.authenticated = true;
        return;
      }
      let errorMessage = "";
      if (responseBody.otp_required) {
        errorMessage = "Login requires one time code from email";
      }
      if (responseBody["2fa_required"]) {
        errorMessage = "Login requires authenticator app token";
      }
      throw new KientAuthenticationError({
        name: "2FA_REQUIRED",
        message: errorMessage
      });
    }
    throw new KientApiError({
      name: "SOMETHING_WENT_WRONG",
      message: "Unknown authentication error when attemping login"
    });
  }
  async currentUser() {
    if (!this._client.authenticated) {
      throw new KientApiError({ name: "UNAUTHENTICATED" });
    }
    const response = await this._apiClient.callKickApi({ endpoint: "api/v1/user" });
    const deserializedBody = (deserialize2.\u03A9 = [[() => __\u03A9UserResponse, "n!"]], deserialize2(response.body));
    if (!deserializedBody.id) {
      throw new KientApiError({ name: "UNAUTHENTICATED" });
    }
    return deserialize2.\u03A9 = [[() => __\u03A9UserResponse, "n!"]], deserialize2(response.body);
  }
};
AuthenticationEndpoint.__type = [() => BaseEndpoint, "getTokens", () => __\u03A9LoginCredentials, "credentials", "login", "currentUser", 'P7!P"0"Pn#2$"0%P"0&5'];

// src/utils/generic-api.response.ts
import { __\u03A9Embedded } from "@deepkit/type";
var __\u03A9GenericApiResponse = ["T", "error", "code", "message", "status", () => __\u03A9Embedded, "data", `b!PP)4"'4#&4$M4%e"!o&"4'M`];

// src/endpoints/channel/dto/get-polls.response.ts
var __\u03A9PollData = ["title", "duration", "result_display_duration", "created_at", "id", "label", "votes", "options", "remaining", "has_voted", "poll", `PP&4!'4"'4#T4$P'4%&4&'4'MF4('4))4*M4+M`];
var __\u03A9GetPollsResponse = [() => __\u03A9GenericApiResponse, () => __\u03A9PollData, 'P,n"Jo!"'];

// src/endpoints/channel/channel.endpoint.ts
import { deserialize as deserialize5 } from "@deepkit/type";

// src/endpoints/channel/dto/get-channel.response.ts
var __\u03A9ChannelChatroom = ["id", "chatable_type", "channel_id", "created_at", "updated_at", "chat_mode_old", "chat_mode", "slow_mode", "chatable_id", "followers_mode", "subscribers_mode", "emotes_mode", "message_interval", "following_min_duration", `P'4!&4"&4#T4$T4%&4&&4')4('4))4*)4+)4,'4-'4.M`];
var __\u03A9GetChannelResponse = ["id", "user_id", "slug", "is_banned", "playback_url", "vod_enabled", "subscription_enabled", "followers_count", "following", "subscription", "channel_id", "months", "srcset", "src", "badge_image", "subscriber_badges", "responsive", "url", "banner_image", "category_id", "name", "tags", "description", "deleted_at", "viewers", "banner", "icon", "category", "recent_categories", "created_at", "session_title", "is_live", "risk_level_id", "start_time", "source", "twitch_channel", "duration", "language", "is_mature", "viewer_count", "thumbnail", "categories", "livestream", "role", "muted", "follower_badges", "offline_banner_image", "can_host", "username", true, "agreed_to_terms", "email_verified_at", "bio", "country", "state", "city", "instagram", "twitter", "youtube", "discord", "tiktok", "facebook", "profile_pic", "user", () => __\u03A9ChannelChatroom, "chatroom", "link", "updated_at", "order", "title", "ascending_links", "stripe_plan_id", "amount", "plan", "views", "live_stream_id", "thumb", "s3", "trading_platform_id", "uuid", "delated_at", "video", "previous_livestreams", "verified", "model_type", "model_id", "collection_name", "file_name", "mime_type", "disk", "size", "manipulations", "fullsize", "medium", "generated_conversations", "custom_properties", "responsive_images", "order_column", "conversations_disk", "media", "P'4!'4\"&4#)4$&4%8)4&)4''4()4)#4*P'4!'4+'4,P&4-&4.M4/MF40P&41&42M43P'4!'44&45&4#&F46&47#48'49P&41&42M4:P'4!&45&4#&4;M4<MF4=PP'4!&4#'4+T4>&4?)4@#4AT4B#4C#4D'4E&4F)4G'4HP&41&42M4I'49P'4!'44&45&4#&F46&47#48'49P'4!&45&4#&4;M4<MF4J#F46M,J4K#4L)4M#F4N#4O)4PP'4!&4Q.R4ST4T&4U&4V&4W&4X&4Y&4Z&4[&4\\&4]&4^&4_M4`na4bP'4!'4+&47&4cT4>T4d'4e&4fMF4gP'4!'4+&4h&4iT4>T4dM4jP'4!&4#'4+T4>&4?)4@#4AT4B#4C#4D'4E&4F)4G'4HP&41&42M4I'4kP'4!'44&45&4#&F46&47#48'49P'4!&45&4#&4;M4<MF4JP'4!'4l#4##4m#4n#4oT4>T4d&4p'4k#4qM4rMF4sPP'4!'4+T4>T4dM,J4tP'4!&4u'4v&4w&45&4x&4y&4z'4{#F4|PP)4})4~M4\x7FM4\x80#F4\x81'4\x82T4>T4d&4p&4\x83MF4\x84M"];

// src/endpoints/channel/instance/channel.instance.ts
import { deserialize as deserialize3 } from "@deepkit/type";
var ChannelInstance = class extends BaseInstance {
  constructor(data, client) {
    super((deserialize3.\u03A9 = [[() => __\u03A9GetChannelResponse, "n!"]], deserialize3(data)), client);
  }
  getChatroom() {
    return this.data.chatroom;
  }
  async getLivestream() {
    return this._client.api.channel.getLivestream(this.data.slug);
  }
  async getLeaderboard() {
    return this._client.api.channel.getLeaderboards(this.data.slug);
  }
  async getPoll() {
    return this._client.api.channel.getPoll(this.data.slug);
  }
};
ChannelInstance.__type = [() => __\u03A9GetChannelResponse, () => BaseInstance, "data", () => Kient, "client", "constructor", "getChatroom", "getLivestream", "getLeaderboard", "getPoll", () => __\u03A9GetChannelResponse, `Pn!7"P"2#P7$2%"0&P"0'P"0(P"0)P"0*5n+6"`];

// src/endpoints/channel/dto/get-livestream.response.ts
var __\u03A9GetLivestreamResponse = ["id", "slug", "session_title", "created_at", "language", "is_mature", "viewers", "name", "tags", "parent_category", "category", "playback_url", "src", "srcset", "thumbnail", `P'4!&4"&4#T4$&4%)4&'4'P'4!&4(&4"&F4)P'4!&4"M4*M4+&4,P&4-&4.M4/M`];

// src/endpoints/channel/instance/livestream.instance.ts
import { deserialize as deserialize4 } from "@deepkit/type";
function __assignType3(fn, args) {
  fn.__type = args;
  return fn;
}
var __\u03A9LivestreamThumbnails = [1080, 720, 480, 360, 160, 'P&4!&4"&4#&4$&4%M'];
var LivestreamInstance = class extends BaseInstance {
  constructor(data, client) {
    super((deserialize4.\u03A9 = [[() => __\u03A9GetLivestreamResponse, "n!"]], deserialize4(data)), client);
  }
  getThumbnails() {
    const pairs = this.data.thumbnail.srcset.split(", ");
    const result = {};
    pairs.forEach(__assignType3((pair) => {
      const url = pair.split(" ")[0];
      const filename = url.match(/([\w\d_-]*)\.?[^\\\/]*$/i);
      if (filename && filename[1]) {
        result[filename[1]] = url;
      }
    }, ["pair", "", 'P"2!"/"']));
    return deserialize4.\u03A9 = [[() => __\u03A9LivestreamThumbnails, "n!"]], deserialize4(result);
  }
};
LivestreamInstance.__type = [() => __\u03A9GetLivestreamResponse, () => BaseInstance, "data", () => Kient, "client", "constructor", "getThumbnails", () => __\u03A9GetLivestreamResponse, `Pn!7"P"2#P7$2%"0&P"0'5n(6"`];

// src/endpoints/channel/channel.endpoint.ts
var ChannelEndpoint = class extends BaseEndpoint {
  async getChannel(channel) {
    const response = await this._apiClient.callKickApi({ endpoint: `api/v2/channels/${channel}` });
    const channelInstance = new ChannelInstance(response.body, this._client);
    return channelInstance;
  }
  async getLivestream(channel) {
    const response = await this._apiClient.callKickApi({ endpoint: `api/v2/channels/${channel}/livestream` });
    const livestreamInstance = new LivestreamInstance(response.body.data, this._client);
    return livestreamInstance;
  }
  async getLeaderboards(channel) {
    const response = await this._apiClient.callKickApi({ endpoint: `api/v2/channels/${channel}/leaderboards` });
    return deserialize5.\u03A9 = [['"']], deserialize5(response.body);
  }
  async getChatroomSettings(channel) {
    const response = await this._apiClient.callKickApi({ endpoint: `api/v2/channels/${channel}/chatroom` });
    return deserialize5.\u03A9 = [['"']], deserialize5(response.body);
  }
  async getPoll(channel) {
    const response = await this._apiClient.callKickApi({ endpoint: `api/v2/channels/${channel}/polls` });
    return deserialize5.\u03A9 = [[() => __\u03A9GetPollsResponse, "n!"]], deserialize5(response.body);
  }
};
ChannelEndpoint.__type = [() => BaseEndpoint, "channel", "getChannel", "getLivestream", "getLeaderboards", "getChatroomSettings", "getPoll", `P7!P&2""0#P&2""0$P&2""0%P&2""0&P&2""0'5`];

// src/client/kient.ts
import { Emitter } from "strict-event-emitter";

// src/client/ws.client.ts
import Pusher from "pusher-js";

// src/ws/ws.error.ts
var __\u03A9ErrorName3 = ["SUBSCRIPTION_FAILED", ".!"];
var KientWsError = class extends ErrorBase {
};
KientWsError.__type = [() => __\u03A9ErrorName3, () => ErrorBase, () => __\u03A9ErrorName3, 'Pn!7"5n#6"'];

// src/client/ws.client.ts
function __assignType4(fn, args) {
  fn.__type = args;
  return fn;
}
var WsClient = class {
  constructor(client) {
    this.PUSHER_APP_KEY = "eb1d5f283081a78b932c";
    this._client = client;
    const pusherOptions = {
      cluster: "us2"
    };
    this.pusher = new Pusher(this.PUSHER_APP_KEY, pusherOptions);
    this.pusher.connection.bind("connected", () => this._client.emit("wsConnected"));
    this.pusher.connection.bind("disconnected", () => this._client.emit("wsDisconnected"));
  }
  async subscribe(channel) {
    return Promise.\u03A9 = [["!"]], new Promise(__assignType4((resolve, reject) => {
      const subscribedChannel = this.pusher.subscribe(channel);
      subscribedChannel.bind("pusher:subscription_error", __assignType4((error) => {
        throw new KientWsError({
          name: "SUBSCRIPTION_FAILED",
          message: error
        });
      }, ["error", "", 'P"2!"/"']));
      subscribedChannel.bind("pusher:subscription_succeeded", () => {
        resolve(subscribedChannel);
      });
    }, ["resolve", "reject", "", 'P"2!"2""/#']));
  }
  async unsubscribe(channel) {
    await this.pusher.unsubscribe(channel);
  }
};
WsClient.__type = ["_client", "pusher", "client", "constructor", "channel", "subscribe", "unsubscribe", `"3!9;!3"9;P"2#"0$P&2%"0&P&2%"0'5`];

// src/ws/socket.base.ts
var BaseSocket = class {
  constructor(client, wsClient) {
    this._client = client;
    this._wsClient = wsClient;
  }
};
BaseSocket.__type = [() => Kient, "_client", () => WsClient, "_wsClient", () => Kient, "client", () => WsClient, "wsClient", "constructor", `P7!3"9<P7#3$9<PP7%2&P7'2("0)5`];

// src/ws/chatroom/chatroom.socket.ts
var __\u03A9Record = ["K", "T", `l'e#"Rb!b"Pde"!N#!`];
function __assignType5(fn, args) {
  fn.__type = args;
  return fn;
}
var ChatroomSocket = class extends BaseSocket {
  async listen(chatroomId) {
    const channel = await this._wsClient.subscribe(`chatrooms.${chatroomId}.v2`);
    channel.bind("App\\Events\\ChatMessageEvent", __assignType5((data) => {
      const chatMessageInstance = new ChatMessageInstance(data, this._client);
      this._client.emit("onMessage", chatMessageInstance);
    }, [() => __\u03A9Record, "data", "", 'P&"o!#2""/#']));
  }
  async disconnect(chatroomId) {
    await this._wsClient.unsubscribe(`chatrooms.${chatroomId}.v2`);
  }
};
ChatroomSocket.__type = [() => BaseSocket, "chatroomId", "listen", "disconnect", `P7!PP&'J2""0#PP&'J2""0$5`];

// src/endpoints/chat/dto/send-message.response.ts
var __\u03A9MessageData = ["id", "chatroom_id", "content", "type", "created_at", "username", "slug", "color", "text", "count", "badges", "identity", "sender", `P&4!'4"&4#&4$T4%P'4!&4&&4'P&4(P&4$&4)'4*8MF4+M4,M4-M`];
var __\u03A9SendMessageResponse = [() => __\u03A9GenericApiResponse, () => __\u03A9MessageData, 'P,n"Jo!"'];

// src/endpoints/chat/chat.endpoint.ts
import { deserialize as deserialize6 } from "@deepkit/type";
var ChatEndpoint = class extends BaseEndpoint {
  async sendMessage(chatroomId, message) {
    if (!this._client.authenticated) {
      throw new KientApiError({ name: "UNAUTHENTICATED" });
    }
    const body = {
      content: message,
      type: "message"
    };
    const response = await this._apiClient.callKickApi({
      endpoint: `api/v2/messages/send/${chatroomId}`,
      method: "post",
      options: {
        body: JSON.stringify(body)
      }
    });
    if (response.status !== 200) {
      throw new KientApiError({ name: "SOMETHING_WENT_WRONG", cause: response });
    }
    const deserializedResponse = (deserialize6.\u03A9 = [[() => __\u03A9SendMessageResponse, "n!"]], deserialize6(response.body));
    if (deserializedResponse.status.code === 401) {
      throw new KientApiError({ name: "UNAUTHENTICATED" });
    }
    if (deserializedResponse.status.code !== 200) {
      throw new KientApiError({
        name: "SOMETHING_WENT_WRONG",
        message: deserializedResponse.status.message,
        cause: response
      });
    }
    return deserializedResponse;
  }
  async deleteMessage(chatroomId, messageId) {
    if (!this._client.authenticated) {
      throw new KientApiError({ name: "UNAUTHENTICATED" });
    }
    const response = await this._apiClient.callKickApi({
      endpoint: `api/v2/chatrooms/${chatroomId}/messages/${messageId}`,
      method: "delete"
    });
    if (response.status !== 200) {
      throw new KientApiError({ name: "SOMETHING_WENT_WRONG", cause: response });
    }
    const deserializedResponse = (deserialize6.\u03A9 = [[() => __\u03A9GenericApiResponse, ',o!"']], deserialize6(response.body));
    if (deserializedResponse.status.code === 401) {
      throw new KientApiError({ name: "UNAUTHENTICATED" });
    }
    if (deserializedResponse.status.code !== 200) {
      throw new KientApiError({
        name: "SOMETHING_WENT_WRONG",
        message: deserializedResponse.status.message,
        cause: response
      });
    }
    return deserializedResponse;
  }
  async pinMessage(channel, messageId) {
    const response = await this._apiClient.callKickApi({
      endpoint: `api/v2/channels/${channel}/pinned-message`,
      method: "post"
    });
    if (response.status !== 200) {
      throw new KientApiError({ name: "SOMETHING_WENT_WRONG", cause: response });
    }
    const deserializedResponse = (deserialize6.\u03A9 = [[() => __\u03A9GenericApiResponse, ',o!"']], deserialize6(response.body));
    if (deserializedResponse.status.code === 401) {
      throw new KientApiError({ name: "UNAUTHENTICATED" });
    }
    if (deserializedResponse.status.code !== 200) {
      throw new KientApiError({
        name: "SOMETHING_WENT_WRONG",
        message: deserializedResponse.status.message,
        cause: response
      });
    }
    return deserializedResponse;
  }
};
ChatEndpoint.__type = [() => BaseEndpoint, "chatroomId", "message", "sendMessage", "messageId", "deleteMessage", "channel", "pinMessage", `P7!PP&'J2"&2#"0$PP&'J2"&2%"0&P&2'&2%"0(5`];

// src/client/kient.ts
var __\u03A9Endpoints = [() => AuthenticationEndpoint, "authentication", () => ChannelEndpoint, "channel", () => ChatEndpoint, "chat", 'PP7!4"P7#4$P7%4&M'];
var _Kient = class _Kient extends Emitter {
  constructor() {
    super(...arguments);
    this.authenticated = false;
  }
  async init() {
    this._apiClient = await ApiClient.create(this);
    this._endpoints = {
      authentication: new AuthenticationEndpoint(this, this._apiClient),
      channel: new ChannelEndpoint(this, this._apiClient),
      chat: new ChatEndpoint(this, this._apiClient)
    };
    this._wsClient = new WsClient(this);
    this._wsHandlers = {
      chatroom: new ChatroomSocket(this, this._wsClient)
    };
  }
  static async create() {
    const kient = new _Kient();
    await kient.init();
    return kient;
  }
  get api() {
    return this._endpoints;
  }
  get ws() {
    return this._wsHandlers;
  }
};
_Kient.__type = [() => __\u03A9KientEvents, () => Emitter, () => ApiClient, "_apiClient", () => __\u03A9Endpoints, "_endpoints", () => WsClient, "_wsClient", () => ChatroomSocket, "chatroom", "_wsHandlers", "init", "create", () => __\u03A9KientEvents, `Pn!7"P7#3$;n%3&;P7'3(;PP7)4*M3+;P"0,;P"0-s!!5n.6"`];
var Kient = _Kient;
export {
  ChatterStatus,
  Kient
};
