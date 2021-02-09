import { Feed, FeedItem, parse } from 'react-native-rss-parser';

/**
 * A class that holds all data parsed with react-native-rss-parser.
 * Also contains some useful functions.
 */
class FeedWrapper {
  feed: Feed;

  title: string;

  description: string;

  items: Array<FeedItem>;

  /**
   * @param {Feed} feed
   */
  constructor(feed: Feed) {
    this.feed = feed;
    this.title = feed.title;
    this.description = feed.description;
    this.items = feed.items;
    this.sortItems();
  }

  /**
   * Returns the feed item in the given index.
   * @param {number} index
   * @returns {FeedItem}
   */
  itemAt(index: number): FeedItem {
    return this.feed.items[index];
  }

  /**
   * Sorts the feed items.
   */
  sortItems(): void {
    const itemPriority = (item: FeedItem): number => {
      const parsedDate: number = Date.parse(item.published);
      return Number.isNaN(parsedDate) ? -1 : parsedDate;
    };

    this.feed.items.sort((a, b) => itemPriority(b) - itemPriority(a));
  }

  /**
   * Returns the names of the feed's authors joined into a single string.
   * @returns {string}
   */
  getAuthorNames(): string {
    return this.feed.authors.map(author => author.name).join(', ');
  }

  /**
   * Returns the number of authors of the feed.
   * @returns {number}
   */
  authorCount(): number {
    return this.feed.authors ? this.feed.authors.length : 0;
  }

  /**
   * Returns the feed's last updated date as a string.
   * @returns {number}
   */
  getLastUpdatedDate(): string {
    return this.feed.lastUpdated;
  }
}

export type { FeedWrapper };

/**
 * Fetches an RSS feed from the given URL and returns a FeedWrapper wrapped in a Promise.
 * @param {string} url
 * @returns {Promise<FeedWrapper>} parsed feed
 */
export async function getRSS(url: string): Promise<FeedWrapper> {
  return fetch(url)
    .then(response => response.text())
    .then(str => parse(str))
    .then(parsedRSS => new FeedWrapper(parsedRSS));
}

/**
 * Fetches an RSS feed and returns whether it is valid.
 * @param {string} url
 * @returns {Promise<boolean>}
 */
export async function validateRSS(url: string): Promise<boolean> {
  return getRSS(url)
    .then(feed => {
      return feed ? !!feed.title : false;
    })
    .catch(() => false);
}

/**
 * @param {FeedWrapper} feed
 * @param {FeedItem} item
 * @returns {string}
 */
export function getItemAuthors(feed: FeedWrapper, item: FeedItem): string {
  if (!item.authors || item.authors.length === 0) {
    return feed.getAuthorNames();
  }
  return item.authors.map(author => author.name).join(', ');
}

/**
 * @param {FeedItem} item
 * @returns {string | null}
 */
export function getItemDate(item: FeedItem): string | null {
  if (typeof item.published !== 'string') {
    return null;
  }
  return new Date(item?.published.trim()).toDateString();
}
