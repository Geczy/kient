import { CycleTLSResponse, CycleTLSRequestOptions } from 'cycletls';
import { Embedded } from '@deepkit/type';
import { Emitter } from 'strict-event-emitter';
import { Channel } from 'pusher-js';

interface CallKickAPICycles {
    endpoint: string;
    method?: 'head' | 'get' | 'post' | 'put' | 'delete' | 'trace' | 'options' | 'connect' | 'patch';
    options?: CycleTLSRequestOptions;
}
declare class ApiClient {
    private readonly _client;
    private readonly _apiFetch;
    private _cycleClient;
    private readonly cookieJar;
    private bearerToken;
    constructor(client: Kient);
    private init;
    static create(client: Kient): Promise<ApiClient>;
    callKickApi(params: CallKickAPICycles): Promise<CycleTLSResponse>;
    setBearerToken(token: string): Promise<void>;
    private handleCookies;
}

declare abstract class BaseEndpoint {
    protected readonly _client: Kient;
    protected readonly _apiClient: ApiClient;
    constructor(client: Kient, apiClient: ApiClient);
}

interface TokensResponse {
    enabled: boolean;
    nameFieldName: string;
    unrandomizedNameFieldName: string;
    validFromFieldName: string;
    encryptedValidFrom: string;
}

interface UserResponse {
    id: number;
    email: string;
    username: string;
    google_id: null | unknown;
    agreed_to_terms: boolean;
    email_verified_at: null | Date;
    bio: null | string;
    country: string;
    state: string;
    city: string;
    enable_live_notifications: boolean;
    instagram: string;
    twitter: string;
    youtube: string;
    discord: string;
    tiktok: string;
    facebook: string;
    enable_onscreen_live_notifications: boolean;
    apple_id: null | unknown;
    phone: null | unknown;
    email_updated_at: null | Date;
    newsletter_subscribed: boolean;
    enable_sms_promo: boolean;
    enable_sms_security: boolean;
    profilepic: string;
    filtered_categories: unknown[];
    is_2fa_setup: boolean;
    redirect: null | unknown;
    channel_can_be_updated: boolean;
    is_live: boolean;
    intercom_hash: null | unknown;
    roles: unknown[];
    streamer_channel: {
        id: number;
        user_id: number;
        slug: string;
        is_banned: boolean;
        playback_url: string;
        name_updated_at: null | unknown;
        vod_enabled: boolean;
        subscription_enabled: boolean;
        can_host: boolean;
    };
}

interface LoginCredentials {
    email: string;
    password: string;
    otc?: number | string;
}
declare class AuthenticationEndpoint extends BaseEndpoint {
    getTokens(): Promise<TokensResponse>;
    login(credentials: LoginCredentials): Promise<void>;
    currentUser(): Promise<UserResponse>;
}

interface GifterInformation {
    user_id: number;
    username: string;
    quantity: number;
}
interface GetLeaderboardsResponse {
    gifts: Array<GifterInformation>;
    gifts_enabled: boolean;
    gifts_week: Array<GifterInformation>;
    gifts_week_enabled: boolean;
    gifts_month: Array<GifterInformation>;
    gifts_month_enabled: boolean;
}

interface GetChatroomSettingsResponse {
    id: number;
    slow_mode: {
        enabled: boolean;
        message_interval: number;
    };
    subscribers_mode: {
        enabled: boolean;
    };
    followers_mode: {
        enabled: boolean;
        min_duration: number;
    };
    emotes_mode: {
        enabled: boolean;
    };
    advanced_bot_protection: {
        enabled: boolean;
        remaining_time: number;
    };
    pinned_message: null;
}

interface GenericApiResponse<T> {
    status: {
        error: boolean;
        code: number;
        message: string;
    };
    data: Embedded<T>;
}

interface PollData {
    poll: {
        title: string;
        duration: number;
        result_display_duration: number;
        created_at: Date;
        options: Array<{
            id: number;
            label: string;
            votes: number;
        }>;
        remaining: number;
        has_voted: boolean;
    };
}
type GetPollsResponse = GenericApiResponse<null | PollData>;

declare abstract class BaseInstance<T> {
    protected _client: Kient;
    data: T;
    constructor(data: T, client: Kient);
}

interface GetLivestreamResponse {
    id: number;
    slug: string;
    session_title: string;
    created_at: Date;
    language: string;
    is_mature: boolean;
    viewers: number;
    category: {
        id: number;
        name: string;
        slug: string;
        tags: string[];
        parent_category: {
            id: number;
            slug: string;
        };
    };
    playback_url: string;
    thumbnail: {
        src: string;
        srcset: string;
    };
}

interface LivestreamThumbnails {
    1080: string;
    720: string;
    480: string;
    360: string;
    160: string;
}
declare class LivestreamInstance extends BaseInstance<GetLivestreamResponse> {
    constructor(data: any, client: Kient);
    getThumbnails(): LivestreamThumbnails;
}

interface ChannelChatroom {
    id: number;
    chatable_type: string;
    channel_id: string;
    created_at: Date;
    updated_at: Date;
    chat_mode_old: string;
    chat_mode: string;
    slow_mode: boolean;
    chatable_id: number;
    followers_mode: boolean;
    subscribers_mode: boolean;
    emotes_mode: boolean;
    message_interval: number;
    following_min_duration: number;
}
interface GetChannelResponse {
    id: number;
    user_id: number;
    slug: string;
    is_banned: boolean;
    playback_url?: string;
    vod_enabled: boolean;
    subscription_enabled: boolean;
    followers_count: number;
    following: boolean;
    subscription: unknown;
    subscriber_badges: Array<{
        id: number;
        channel_id: number;
        months: number;
        badge_image: {
            srcset: string;
            src: string;
        };
    }>;
    banner_image: {
        responsive: string;
        url: string;
    };
    recent_categories: Array<{
        id: number;
        category_id: number;
        name: string;
        slug: string;
        tags: string[];
        description: string;
        deleted_at: unknown;
        viewers: number;
        banner: {
            responsive: string;
            url: string;
        };
        category: {
            id: number;
            name: string;
            slug: string;
            icon: string;
        };
    }>;
    livestream: {
        id: number;
        slug: string;
        channel_id: number;
        created_at: Date;
        session_title: string;
        is_live: boolean;
        risk_level_id: unknown;
        start_time: Date;
        source: unknown;
        twitch_channel: unknown;
        duration: number;
        language: string;
        is_mature: boolean;
        viewer_count: number;
        thumbnail: {
            responsive: string;
            url: string;
        };
        viewers: number;
        categories: Array<{
            id: number;
            category_id: number;
            name: string;
            slug: string;
            tags: string[];
            description: string;
            deleted_at: unknown;
            viewers: number;
            category: {
                id: number;
                name: string;
                slug: string;
                icon: string;
            };
        }>;
        tags: unknown[];
    } | null;
    role: unknown;
    muted: boolean;
    follower_badges: unknown[];
    offline_banner_image: unknown;
    can_host: boolean;
    user: {
        id: number;
        username: string;
        agreed_to_terms: true;
        email_verified_at: Date;
        bio: string;
        country: string;
        state: string;
        city: string;
        instagram: string;
        twitter: string;
        youtube: string;
        discord: string;
        tiktok: string;
        facebook: string;
        profile_pic: string;
    };
    chatroom: ChannelChatroom;
    ascending_links: Array<{
        id: number;
        channel_id: number;
        description: string;
        link: string;
        created_at: Date;
        updated_at: Date;
        order: number;
        title: string;
    }>;
    plan: {
        id: number;
        channel_id: number;
        stripe_plan_id: string;
        amount: string;
        created_at: Date;
        updated_at: Date;
    };
    previous_livestreams: Array<{
        id: number;
        slug: string;
        channel_id: number;
        created_at: Date;
        session_title: string;
        is_live: boolean;
        risk_level_id: unknown;
        start_time: Date;
        source: unknown;
        twitch_channel: unknown;
        duration: number;
        language: string;
        is_mature: boolean;
        viewer_count: number;
        thumbnail: {
            responsive: string;
            url: string;
        };
        views: number;
        categories: Array<{
            id: number;
            category_id: number;
            name: string;
            slug: string;
            tags: string[];
            description: string;
            deleted_at: unknown;
            viewers: number;
            category: {
                id: number;
                name: string;
                slug: string;
                icon: string;
            };
        }>;
        video: {
            id: number;
            live_stream_id: number;
            slug: unknown;
            thumb: unknown;
            s3: unknown;
            trading_platform_id: unknown;
            created_at: Date;
            updated_at: Date;
            uuid: string;
            views: number;
            delated_at: unknown;
        };
    }>;
    verified: {
        id: number;
        channel_id: number;
        created_at: Date;
        updated_at: Date;
    } | null;
    media: Array<{
        id: number;
        model_type: string;
        model_id: number;
        collection_name: string;
        name: string;
        file_name: string;
        mime_type: string;
        disk: string;
        size: number;
        manipulations: unknown[];
        custom_properties: {
            generated_conversations: {
                fullsize: boolean;
                medium: boolean;
            };
        };
        responsive_images: unknown[];
        order_column: number;
        created_at: Date;
        updated_at: Date;
        uuid: string;
        conversations_disk: string;
    }>;
}

declare class ChannelInstance extends BaseInstance<GetChannelResponse> {
    constructor(data: any, client: Kient);
    getChatroom(): ChannelChatroom;
    getLivestream(): Promise<LivestreamInstance>;
    getLeaderboard(): Promise<GetLeaderboardsResponse>;
    getPoll(): Promise<GetPollsResponse>;
}

declare class ChannelEndpoint extends BaseEndpoint {
    getChannel(channel: string): Promise<ChannelInstance>;
    getLivestream(channel: string): Promise<LivestreamInstance>;
    getLeaderboards(channel: string): Promise<GetLeaderboardsResponse>;
    getChatroomSettings(channel: string): Promise<GetChatroomSettingsResponse>;
    getPoll(channel: string): Promise<GetPollsResponse>;
}

declare enum ChatterStatus {
    BROADCASTER = "broadcaster",
    MODERATOR = "moderator",
    SUBSCRIBER = "subscriber",
    SUB_GIFTER = "sub_gifter",
    OG = "og",
    FOUNDER = "founder"
}
interface ChatMessageEvent {
    id: string;
    chatroom_id: number;
    content: string;
    type: string;
    created_at: Date;
    sender: {
        id: number;
        username: string;
        slug: string;
        identity: {
            color: string;
            badges: Array<{
                type: string;
                text: string;
                count?: number;
            }>;
        };
    };
}

declare class ChatMessageInstance extends BaseInstance<ChatMessageEvent> {
    constructor(data: any, client: Kient);
    chatterIs(chatterStatus: ChatterStatus | string): boolean;
    deleteMessage(): Promise<GenericApiResponse<null>>;
}

type ChatroomEvents = {
    onMessage: [chatMessageInstance: ChatMessageInstance];
};

type CoreEvents = {
    wsConnected: [];
    wsDisconnected: [];
};
type KientEvents = CoreEvents & ChatroomEvents;

declare class WsClient {
    private readonly _client;
    private readonly PUSHER_APP_KEY;
    private readonly pusher;
    constructor(client: Kient);
    subscribe(channel: string): Promise<Channel>;
    unsubscribe(channel: string): Promise<void>;
}

declare abstract class BaseSocket {
    protected readonly _client: Kient;
    protected readonly _wsClient: WsClient;
    constructor(client: Kient, wsClient: WsClient);
}

declare class ChatroomSocket extends BaseSocket {
    listen(chatroomId: string | number): Promise<void>;
    disconnect(chatroomId: string | number): Promise<void>;
}

interface MessageData {
    id: string;
    chatroom_id: number;
    content: string;
    type: string;
    created_at: Date;
    sender: {
        id: number;
        username: string;
        slug: string;
        identity: {
            color: string;
            badges: Array<{
                type: string;
                text: string;
                count?: number;
            }>;
        };
    };
}
type SendMessageResponse = GenericApiResponse<null | MessageData>;

declare class ChatEndpoint extends BaseEndpoint {
    sendMessage(chatroomId: string | number, message: string): Promise<SendMessageResponse>;
    deleteMessage(chatroomId: string | number, messageId: string): Promise<GenericApiResponse<null>>;
    pinMessage(channel: string, messageId: string): Promise<GenericApiResponse<null>>;
}

interface Endpoints {
    authentication: AuthenticationEndpoint;
    channel: ChannelEndpoint;
    chat: ChatEndpoint;
}
declare class Kient extends Emitter<KientEvents> {
    private _apiClient;
    private _endpoints;
    private _wsClient;
    private _wsHandlers;
    authenticated: boolean;
    private init;
    static create(): Promise<Kient>;
    get api(): Endpoints;
    get ws(): {
        chatroom: ChatroomSocket;
    };
}

export { ChatterStatus, Kient };
