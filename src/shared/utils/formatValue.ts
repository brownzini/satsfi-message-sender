const defaultAmounts = {
    "normal": "1000",
    "surveyDonation": "50",
    "backgroundDonation": "7000",
    "createCall": "14000",
    "createSurvey": "7000",
}

const validateMinimumValue = (value:string, type:string) =>
     (Number(value) < Number(defaultAmounts[type])) ? null : value;

export default function formatedPrice(value:string, type:string) {
    const isNan = Number.isNaN(parseInt(value));
    const recievePrice = (isNan) ? '0' : parseInt(value.replace(/[,.]/g, "")).toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/^\$?\s?/g, '');
    const basePrice = recievePrice.slice(0, -3).replace(/[,]/g, "");
    
    const response = validateMinimumValue(basePrice, type);

    if(!response) {
        throw new Error();
    }
    
    const result = basePrice.replace(/[,.]/g, "");
    return result;
}