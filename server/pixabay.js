import axios from "axios";
let pixabayApi = "https://pixabay.com/api/";

const pixabay = axios.create({
  baseURL: pixabayApi,
  header: {
    "X-RateLimit-Limit": 500,
  },
});

const resultFromApi = async (result) => {
  let resultsFromUnsplash = [];
  let resultsFromPixabay = [];

  try {
    const getImgPixabay = await pixabay.get(`https://pixabay.com/api/`, {
      params: {
        key: "18049379-13927042d3999d4d59dea6f1d",
        q: result,
        per_page: 10,
      },
    });

    const dataFromPixabay = getImgPixabay.data.hits.map((img) => {
      return {
        urls: img.webformatURL,
        downloads: img.downloads,
        likes: img.likes,
        tags: img.tags,
        user: img.user,
        views: img.views,
      };
    });

    resultsFromPixabay = [...resultsFromPixabay, ...dataFromPixabay];
  } catch (err) {
    console.log(err.message);
  }

  return [...resultsFromPixabay, ...resultsFromUnsplash];
};

const getNewPins = async () => {
  let pinDataFromPixabay = [];
  let pinData;
  let sampleInput = ["husky funny", "cat funny"];
  try {
    for (let term of sampleInput) {
      const getImgPixabay = await pixabay.get(`https://pixabay.com/api`, {
        params: {
          key: "18049379-13927042d3999d4d59dea6f1d",
          q: term,
          per_page: 50,
        },
      });

      const dataFromPixabay = getImgPixabay.data.hits.map((img) => {
        return {
          id: img.id,
          urls: img.webformatURL,
          likes: img.likes,
          user: img.user,
          views: img.views,
          imageHeight: img.imageHeight,
          imageWidth: img.imageWidth,
          userImageURL: img.userImageURL
        };
      });
      pinDataFromPixabay = [...pinDataFromPixabay, ...dataFromPixabay];
    }
  } catch (err) {
    console.log(err.message);
  }
  pinData = [...pinDataFromPixabay];

  return pinData;
};

export { getNewPins };