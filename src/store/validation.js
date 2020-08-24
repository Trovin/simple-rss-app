import {
  LOADING,
  FEEDS_LIST
} from './state-types';

export const feedApiValidation = (context, api) => {
  if(context.state[FEEDS_LIST].includes(api)) {
    context.state[LOADING] = false;
    alert('You already subscribe to this feed');
    throw new TypeError('You already subscribe to this feed');
  }
};

export const feedDataValidation = (context, feed) => {
  if(!Object.prototype.hasOwnProperty.apply(feed, ['title', 'items'])) {
    context.state[LOADING] = false;
    alert('Feed data is invalid, check input URL');
    throw new TypeError('Feed data is invalid, check input URL');
  }
};
