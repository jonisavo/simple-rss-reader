import * as rssParser from 'react-native-rss-parser';

/**
 * A class that holds all data parsed with react-native-rss-parser.
 * Also contains some useful functions.
 */
class FeedWrapper {
    /**
     * @param {rssParser.Feed} feed 
     */
    constructor(feed) {
        this.feed = feed;
        this.title = feed.title;
        this.description = feed.description;
        this.items = feed.items;
        this.sortFeedItems();
    }

    /**
     * Returns the feed item in the given index.
     * @param {number} index 
     * @returns {rssParser.FeedItem}
     */
    itemAt(index) {
        return this.feed.items[index];
    }

    /**
     * Sorts the feed items.
     */
    sortFeedItems() {
        this.feed.items.sort( (a,b) => this.getItemPriority(b) - this.getItemPriority(a))
    }

    /**
     * Returns the priority of the given feed item as a number.
     * @param {rssParser.FeedItem} item
     * @returns {number}
     */
    getItemPriority(item) {
        let parsedDate = Date.parse(item.published);
        return parsedDate == NaN ? -1 : parsedDate;
    }

    getAuthorNames() {
        return this.feed.authors.map(author => author.name).join(', ');
    }

    /**
     * @returns {number}
     */
    authorCount = () => this.feed.authors.length;

    /**
     * @returns {string}
     */
    getLastUpdatedDate() {
        return this.feed.lastUpdated;
    }
}

/**
 * Fetches an RSS feed from the given URL and returns a FeedWrapper wrapped in a Promise.
 * @param {string} url
 * @returns {Promise<FeedWrapper>} parsed feed
 */
export function getRSS(url) {
    return fetch(url)
        .then(response => response.text())
        .then(str => rssParser.parse(str))
        .then(parsedRSS => new FeedWrapper(parsedRSS))
}

/**
 * @param {FeedWrapper} feed 
 * @param {rssParser.FeedItem} item 
 */
export function getItemAuthors(feed,item) {
    if (!item.authors || item.authors.length == 0)
        return feed.getAuthorNames();
    else
        return item.authors.map(author => author.name).join(', ')
}

export function getItemDate(item) {
    return new Date(item?.published.trim()).toDateString();
}