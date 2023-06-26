export const getPrice = (order) => {
    if(!order) return 0;
    const total = order.items.reduce((s, i) => s += (!i.price ? 0 : i.price), 0);
    console.log(total);
    return parseFloat(!order.price ? 0 : order.price) + parseFloat(total);
}