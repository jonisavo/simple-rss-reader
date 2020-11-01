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
        this.sortItems();
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
    sortItems() {
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

    /**
     * @returns {string}
     */
    getAuthorNames() {
        return this.feed.authors.map(author => author.name).join(', ');
    }

    /**
     * @returns {number}
     */
    authorCount = () => this.feed.authors ? this.feed.authors.length : 0;

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
export async function getRSS(url) {
    return await fetch(url)
        .then(response => response.text())
        .then(str => rssParser.parse(str))
        .then(parsedRSS => new FeedWrapper(parsedRSS))
        .catch(error => console.log(`Error while processing url ${url}: ${error}`))
}

/**
 * Fetches an RSS feed and returns whether it is valid.
 * @param {string} url
 * @returns {Promise<boolean>}
 */
export async function validateRSS(url) {    
    return await getRSS(url).then(feed => {
        return feed ? !!feed.title : false
    }).catch(error => false)
}

/**
 * @param {FeedWrapper} feed 
 * @param {rssParser.FeedItem} item
 * @returns {string}
 */
export function getItemAuthors(feed,item) {
    if (!item.authors || item.authors.length == 0) {
        return feed.getAuthorNames();
    } else {
        return item.authors.map(author => author.name).join(', ')
    }
}

/**
 * @param {rssParser.FeedItem} item
 * @returns {string | null}
 */
export function getItemDate(item) {
    if (typeof item.published != "string") { return null }
    return new Date(item?.published.trim()).toDateString();
}