const statusFilter = (cellValue, filter) => {
    if (!cellValue) {
        return false;
    }
    if (typeof cellValue !== 'string') {
      cellValue = JSON.stringify(cellValue);
    }
    return cellValue === filter;
};

const activeFilter = (cellValue, value) => {
    if (!cellValue) {
        return false;
    }

    return cellValue === value;
};

const byNameEqualsTo = (cellValue, extraValue) => {
    if (!cellValue) {
        return false;
    }
    if (typeof cellValue !== 'string') {
      cellValue = JSON.stringify(cellValue);
    }
    return cellValue.toLocaleLowerCase() === extraValue.toLocaleLowerCase();
}
byNameEqualsTo.extra = 'input';

const byNameContains = (cellValue, extraValue) => {
    if (!cellValue) {
        return false;
    }
    if (typeof cellValue !== 'string') {
      cellValue = JSON.stringify(cellValue);
    }
    return cellValue.toLocaleLowerCase().indexOf(extraValue.toLocaleLowerCase()) !== -1;
}
byNameContains.extra = 'input';

const byNameStartsWith = (cellValue, extraValue) => {
    if (!cellValue) {
        return false;
    }
    if (typeof cellValue !== 'string') {
      cellValue = JSON.stringify(cellValue);
    }
    return cellValue.toLocaleLowerCase().startsWith(extraValue.toLocaleLowerCase());
}
byNameStartsWith.extra = 'input';


const byNumberEqualsTo = (cellValue, extraValue) => {
    if (!cellValue) {
        return false;
    }
    if (typeof cellValue !== 'number') {
      cellValue = parseInt(cellValue);
    }

    return cellValue === parseInt(extraValue);
}
byNumberEqualsTo.extra = 'input'

const byNumberGreaterThan = (cellValue, extraValue) => {
    if (!cellValue) {
        return false;
    }
    if (typeof cellValue !== 'number') {
      cellValue = parseInt(cellValue);
    }

    return cellValue > parseInt(extraValue);
}
byNumberGreaterThan.extra = 'input'

const byNumberLessThan = (cellValue, extraValue) => {
    if (!cellValue) {
        return false;
    }
    if (typeof cellValue !== 'number') {
      cellValue = parseInt(cellValue);
    }

    return cellValue < parseInt(extraValue);
}
byNumberLessThan.extra = 'input'

export default  {
  include: [
    'pending', 
    'outOfStock', 
    'inShop', 
    'admin',
    'agente',
    'delivery',
    'active',
    'notActive',
    'nameEqualsTo',
    'nameContains',
    'nameStartsWith',
    'numberEqualTo', 
    'numberGreaterThan',
    'numberLessThan'
],
  customFilters: {

    // Status filter
    'pending': {
        columnFilterType: 'status', // column filter type id
        name: 'Pending',
        func: (cellValue) => statusFilter(cellValue, 'pending')
    },
    'outOfStock': {
        columnFilterType: 'status', // column filter type id
        name: 'Out Of Stock',
        func: (cellValue) => statusFilter(cellValue, 'outOfStock')
    },
    'inShop': {
        columnFilterType: 'status', // column filter type id
        name: 'In Shop',
        func: (cellValue) => statusFilter(cellValue, 'inShop')
    },

    // User Status
    'active': {
        columnFilterType: 'user_status', // column filter type id
        name: 'Active',
        func: (cellValue) => {
            console.log(cellValue);
            return activeFilter(cellValue, 1)}
    },
    'notActive': {
        columnFilterType: 'user_status', // column filter type id
        name: 'Not Active',
        func: (cellValue) => {
            console.log(cellValue == 0);
            return cellValue == 0}
    },

    // Roles filter
    'admin': {
        columnFilterType: 'role', // column filter type id
        name: 'Admin',
        func: (cellValue) => statusFilter(cellValue, 'admin')
    },
    'agente': {
        columnFilterType: 'role', // column filter type id
        name: 'Agente',
        func: (cellValue) => statusFilter(cellValue, 'agente')
    },
    'delivery': {
        columnFilterType: 'role', // column filter type id
        name: 'Delivery',
        func: (cellValue) => statusFilter(cellValue, 'delivery')
    },

    // Name filter
    'nameEqualsTo': {
        columnFilterType: 'name', // column filter type id
        name: 'Equals to',
        func: byNameEqualsTo
    },
    'nameContains': {
        columnFilterType: 'name', // column filter type id
        name: 'Contains'   ,
        func: byNameContains
    },
    'nameStartsWith': {
        columnFilterType: 'name', // column filter type id
        name: 'Starts With'   ,
        func: byNameStartsWith
    },

    'numberEqualTo': {
        columnFilterType: 'number',
        name: 'Equals to',
        func: byNumberEqualsTo
    },
    'numberGreaterThan': {
        columnFilterType: 'number',
        name: 'Greater Than',
        func: byNumberGreaterThan
    },
    'numberLessThan': {
        columnFilterType: 'number',
        name: 'Less Than',
        func: byNumberLessThan
    }
  }
};