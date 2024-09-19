import axios from "axios";


const environment = "https://any_link"
const CALLBACK_API_V1 = "callback/api/v1/"

export const postFeedback = async (payload) => {
    try {
        const { data } = await axios.post(`${environment}${CALLBACK_API_V1}send`, payload);
        return data;  
    } catch (error) {
        console.error('Error posting feedback:', error);
        throw error; 
    }
}


export const getPercent = async () => {
    try {
        const { data } = await axios(`${environment}${CALLBACK_API_V1}percent`)
        return data
    } catch (error) {
        console.error('Error geting percent', error)
        throw error
    }
}

export const getStartPaymentPercent = async () => {
    try {
        const { data } = await axios(`${environment}${CALLBACK_API_V1}percent/start-payment`)
        // const { data } = await axios(`https://fakestoreapi.com/products/1`)
        return data
    } catch (error) {
        console.error('Error geting percent', error)
        throw error
    }
}

export const postAutoFinance = async (payload) => {
    payload.details = String(JSON.stringify(payload.details))
    const boundaryVal = new Date().getUTCMilliseconds() ** 5
    
    try {
        const { res } = await axios.post(`${environment}${CALLBACK_API_V1}send/auto`, payload, {
            headers: {
              'Content-Type': `multipart/form-data; boundary=---------${boundaryVal}`,
            },
          });
        return res;  
    } catch (error) {
        console.error('Error posting autofinanse:', error);
        throw error; 
    }
}