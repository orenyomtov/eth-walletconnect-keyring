export interface Data {
  address: string;
  brandName: string;
  chainId?: number;
  silent?: boolean;
  status?: number;
  sessionStatus?: string;
  networkDelay?: number;
  namespace?: string;
}

export class Cached {
  topics: Map<string, Data> = new Map();

  constructor() {
    const topics = localStorage.getItem('wc_topics');
    if (topics) {
      this.topics = new Map(JSON.parse(topics));
    }
  }

  getTopic(topic: string) {
    return this.topics.get(topic);
  }

  setTopic(topic: string, data: Data) {
    this.topics.set(topic, data);
    localStorage.setItem('wc_topics', JSON.stringify(Array.from(this.topics)));
  }

  deleteTopic(topic: string) {
    this.topics.delete(topic);
    localStorage.setItem('wc_topics', JSON.stringify(Array.from(this.topics)));
  }

  updateTopic(topic: string, data: Partial<Data>) {
    if (this.topics.has(topic)) {
      this.setTopic(topic, {
        ...this.getTopic(topic),
        ...data
      } as Data);
    }
  }

  findTopic(data: Data): string | undefined {
    const { address, brandName, chainId } = data;

    const keys = this.topics.keys();
    for (const key of keys) {
      const value = this.getTopic(key);
      if (
        value?.address.toLowerCase() === address?.toLowerCase() &&
        value?.brandName.toLowerCase() === brandName?.toLowerCase()
      ) {
        return key;
      }
    }
  }
}
