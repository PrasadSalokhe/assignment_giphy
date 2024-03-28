const giphyKey = 'JbGynAN6catMre07BHf6DjIxNXJUD6ph';

export default {
  getTrendingApi: `https://api.giphy.com/v1/gifs/trending?api_key=${giphyKey}&limit=25&offset={offset}&rating=g&bundle=messaging_non_clips`,
  getSearchedGif: `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q={query}&limit=25&offset={offset}&rating=g&lang=en&bundle=messaging_non_clips`,
};
