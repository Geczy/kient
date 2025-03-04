import { BaseInstance } from '@/utils/instance.base'
import { GetChannelResponse } from '../dto/get-channel.response'
import { Kient } from '@/client/kient'
import { deserialize } from '@deepkit/type'

export class ChannelInstance extends BaseInstance<GetChannelResponse> {
  constructor(data: any, client: Kient) {
    super(deserialize<GetChannelResponse>(data), client)
  }

  getChatroom() {
    return this.data.chatroom
  }

  async getLivestream() {
    return this._client.api.channel.getLivestream(this.data.slug)
  }

  async getLeaderboard() {
    return this._client.api.channel.getLeaderboards(this.data.slug)
  }

  async getPoll() {
    return this._client.api.channel.getPoll(this.data.slug)
  }
}
