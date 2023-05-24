export default function filteredSales({
    sales,
    search,
    confirmationFilter,
    affectationFilter,
    upsellFilter,
    deliveryFilter,
    agenteFilter,
    dateFilter
}) {

    const startDate = dateFilter[0];
    const endDate = dateFilter[1];
    
    return sales.filter(item => {
        const createdAt = new Date(item.created_at);

        // filter by confirmation
        if (confirmationFilter !== 'all' && item.confirmation !== confirmationFilter) {
            return false;
        }

        // filter by affectation
        if (affectationFilter !== 'all' && parseInt(item.affectation) !== parseInt(affectationFilter)) {
            return false;
        }

        // filter by upsell
        if (upsellFilter !== 'all' && item.upsell != upsellFilter) {
            return false;
        }

        // filter by delivery
        if (deliveryFilter !== 'all' && item.delivery != deliveryFilter) {
            return false;
        }

        // filter by agente
        if (agenteFilter !== 'all' && parseInt(item.agente_id) != parseInt(agenteFilter)) {
            return false;
        }

        if (!item.fullname.toLowerCase().includes(search.toLowerCase()) && !item.product_name.toLowerCase().includes(search.toLowerCase())) {
            return false;
        }

        /* eslint-disable */
        const createdAtDay = createdAt.getDate();
        const createdAtMonth = createdAt.getMonth();
        const createdAtYear = createdAt.getFullYear();

        if (!!startDate) { 
            const startDay = startDate.getDate();
            const startMonth = startDate.getMonth();
            const startYear = startDate.getFullYear();

            if (
                createdAtYear < startYear ||
                (createdAtYear === startYear && createdAtMonth < startMonth) ||
                (createdAtYear === startYear && createdAtMonth === startMonth && createdAtDay < startDay)
            ) {
                return false;
            }
        }


        if (!!endDate) { 
            const endDay = endDate.getDate();
            const endMonth = endDate.getMonth();
            const endYear = endDate.getFullYear();

            if (
                createdAtYear > endYear ||
                (createdAtYear === endYear && createdAtMonth > endMonth) ||
                (createdAtYear === endYear && createdAtMonth === endMonth && createdAtDay > endDay)
            ) {
                return false;
            }
        }

            // if item passes all filters, include it in the filtered data
            return true;
    });
}