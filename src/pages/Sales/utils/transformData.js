export const transformData = (dataArray = [], { text, value }) => {
    return dataArray.map(item => ({
        text: item[text],
        value: item[value],
    }));
};