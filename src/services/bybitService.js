import axios from 'axios';

export const getTopTraders = async () => {
  try {
    // We add a public CORS proxy before the Bybit URL
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const target = 'https://api.bybit.com/v5/copy-trading/leaderboard';

    const response = await axios.get(proxy + target, {
      params: { 
        category: 'TOP_ROI', 
        limit: 100 // Increased limit to ensure we find your 3 traders
      }
    });

    // Check if the structure exists before filtering
    if (response.data && response.data.result && response.data.result.list) {
      const list = response.data.result.list;
      
      // Filter for your specific "Gold Mine" traders
      const filtered = list.filter(t => 
        ['caleon8', 'STARCODE2', 'Rubedo Engine'].includes(t.nickname)
      );

      console.log("Success! Found Traders:", filtered);
      return filtered;
    }
    
    return [];
  } catch (error) {
    console.error("Bybit Connection Blocked by CORS. Try a different proxy.", error);
    return [];
  }
};
