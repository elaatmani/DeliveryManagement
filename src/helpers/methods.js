export const getPrice = (order) => {
    if(!order) return 0;
    const total = order.items.reduce((s, i) => s += (!i.price ? 0 : i.price), 0);
    return (parseFloat(!order.price ? 0 : order.price) + parseFloat(total)).toFixed(2);
}

export const getPath = (url) => {
    return !url ? null : url.split('api/')[1]
}