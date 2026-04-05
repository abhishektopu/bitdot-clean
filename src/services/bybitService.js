import axios from 'axios';

export const getTopTraders = async () => {
  try {
    // Standard URL without proxy first (to avoid third-party delays)
    const response = await axios.get('https://api.bybit.com/v5/copy-trading/leaderboard', {
      params: { category: 'TOP_ROI', limit: 100 }
    });

    const list = response.data.result.list;
    // Map the IDs for the 3 specific traders
    const mapping = {
      "Rubedo Engine": "AbWEdoxJjic3JRWCtxUL1w%3D%3D",
      "caleon8": "zuhkoRlHodkzaCgGiSSdQw%3D%3D",
      "Liafe": "AbWEdoxJjic3JRWCtxUL1w%3D%3D"
    };

    return list.filter(t => ['caleon8', 'Rubedo Engine', 'Liafe'].includes(t.nickname))
               .map(t => ({ ...t, leaderMark: mapping[t.nickname] || "" }));
  } catch (error) {
    console.error("Bybit Fetch Error:", error);
    return [];
  }
};
