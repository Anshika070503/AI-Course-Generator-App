import axios from 'axios';

const service = {
  getVideos: async (query) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: query,
          key: API_KEY,
          maxResults: 1,
          type: 'video',
        },
      });
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching videos from YouTube API:", error);
      return { items: [] };
    }
  },
};

export default service;
