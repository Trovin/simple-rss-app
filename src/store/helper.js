import Parser from 'rss-parser';

const PARSER = new Parser();

import {
  LOADING,
  ITEMS_LIST,
} from './state-types';

export const getData = async (context, api) => {
  let result;

  try {
    result = await PARSER.parseURL(api);
  } catch (error) {
    context.state[LOADING] = false;
    alert('Something went wrong, check input URL');
    throw new URIError('Something went wrong, check input URL');
  }

  return result;
};

export const setItems = (state, props) => {
  props.items.map(item => item.category = props.category);
  state[ITEMS_LIST] = [...state[ITEMS_LIST], ...props.items];
};
