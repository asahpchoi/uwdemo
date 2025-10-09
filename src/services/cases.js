
export const fetchCases = async () => {
    const url = process.env.REACT_APP_CHECK_URL;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    const data = responseData.data || responseData;
    if (!Array.isArray(data)) {
        console.error("fetchCases expected an array, but got:", data);
        return [];
    }
    return data.map(item => ({ id: item.id, fields: item }));
};

export const findCase = async (id) => {
    const baseUrl = process.env.REACT_APP_CHECK_URL;
    const url = `${baseUrl}?recordid=${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    if (!text) {
        return { id: id, fields: {} };
    }
    const responseData = JSON.parse(text);
    const data = responseData.data || responseData;
    return { id: id, fields: data };
};
