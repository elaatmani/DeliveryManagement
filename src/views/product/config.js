const statusFilter = (cellValue, filter) => {
    if (!cellValue) {
        return false;
    }
    if (typeof cellValue !== 'string') {
      cellValue = JSON.stringify(cellValue);
    }
    return cellValue === filter;
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
    if (typeof cellValue !== 'string') {
      cellValue = parseInt(cellValue);
    }

    return cellValue === parseInt(extraValue);
}
byNumberEqualsTo.extra = 'input'

const byNumberGreaterThan = (cellValue, extraValue) => {
    if (!cellValue) {
        return false;
    }
    if (typeof cellValue !== 'string') {
      cellValue = parseInt(cellValue);
    }

    return cellValue > parseInt(extraValue);
}
byNumberGreaterThan.extra = 'input'

const byNumberLessThan = (cellValue, extraValue) => {
    if (!cellValue) {
        return false;
    }
    if (typeof cellValue !== 'string') {
      cellValue = parseInt(cellValue);
    }

    return cellValue < parseInt(extraValue);
}
byNumberLessThan.extra = 'input'

export const filterConfig = {
  include: [
    'pending', 
    'outOfStock', 
    'inShop', 
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

export const rows = 
[
    {
        id: 1,
        name: "Product name 1",
        price: 12.00,
        qty: 100,
        sku: 'P-121',
        category: 'computer',
        status: 'inShop'
    },
    {
        id: 2,
        name: "Product name 2",
        price: 22.00,
        qty: 130,
        sku: 'P-122',
        category: 'computer',
        status: 'outOfStock'
    },
    {
        id: 3,
        name: "Product name 3",
        price: 32.00,
        qty: 500,
        sku: 'P-123',
        category: 'computer',
        status: 'inShop'
    },
    {
        id: 4,
        name: "Product name 4",
        price: 42.00,
        qty: 230,
        sku: 'P-124',
        category: 'computer',
        status: 'pending'
    },
    {
        id: 5,
        name: "Product name 5",
        price: 12.00,
        qty: 100,
        sku: 'P-125',
        category: 'computer',
        status: 'inShop'
    },
    {
        id: 6,
        name: "Product name 6",
        price: 22.00,
        qty: 130,
        sku: 'P-122',
        category: 'computer',
        status: 'outOfStock'
    },
    {
        id: 7,
        name: "Product name 7",
        price: 32.00,
        qty: 500,
        sku: 'P-123',
        category: 'computer',
        status: 'inShop'
    },
    {
        id: 8,
        name: "Product name 8",
        price: 42.00,
        qty: 230,
        sku: 'P-124',
        category: 'computer',
        status: 'pending'
    }
  ]