import axios from 'axios';

export const getTopTraders = async () => {
  try {
    const response = await axios.get('https://api.bybit.com/v5/copy-trading/leaderboard', {
      params: { category: 'TOP_ROI', limit: 50 }
    });

    const list = response.data.result.list;
    // Filter for your 3 specific "Gold Mine" traders
    return list.filter(t => ['caleon8', 'STARCODE2', 'Rubedo Engine'].includes(t.nickname));
  } catch (error) {
    console.error("Error fetching Bybit data:", error);
    return [];
  }
};
