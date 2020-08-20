import Parser from 'rss-parser';

const PARSER = new Parser();

export const validation = (context, feed) => {
  if(
    !Object.prototype.hasOwnProperty.call(feed, 'title') ||
    !Object.prototype.hasOwnProperty.call(feed, 'items')
  ) {
    context.state.isLoading = false;
    alert('Feed data is invalid, check input URL');
    throw new TypeError('Feed data is invalid, check input URL');
  }
};

export const getData = async (context, api) => {
  let result;

  try {
    result = await PARSER.parseURL(api);
  } catch (error) {
    context.state.isLoading = false;
    alert('Something went wrong, check input URL');
    throw new URIError('Something went wrong, check input URL');
  }

  return result;
};

export const setItems = (state, props) => {
  props.items.forEach(item => item.category = props.category);
  state.itemsList = [...state.itemsList, ...props.items];
};
