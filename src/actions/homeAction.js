// import config
import axios from '../config/axios'

export const getMarketTrend = async (dispatch) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/getMarketTrend`,
        });
        return {
            status: 'success',
            loading: false,
            result: respData.data.result,
        }
    }
    catch (err) {
        return {
            status: 'failed',
            loading: false,
        }
    }
}
