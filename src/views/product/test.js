
// import dataTableFilters from "@/config/dataTableFilters"

export default  {
    "collection": {
        "status": {
            "type": "pending",
            "value": ""
        },
        // "category": {
        //     "type": "nameContains",
        //     "value": ""
        // },
        // "name": {
        //     "type": "nameContains",
        //     "value": ""
        // }
    },
    "itemsToFilter": {
        "0": true,
        "1": true,
        "2": true,
        "4": true,
        "5": true,
        "6": true
    },
    "source": [
        {
            "id": 1,
            "name": "Product name 1",
            "price": 12,
            "qty": 100,
            "sku": "P-121",
            "category": "computer",
            "status": "inShop"
        },
        {
            "id": 2,
            "name": "Product name 2",
            "price": 22,
            "qty": 130,
            "sku": "P-122",
            "category": "computer",
            "status": "outOfStock"
        },
        {
            "id": 3,
            "name": "Product name 3",
            "price": 32,
            "qty": 500,
            "sku": "P-123",
            "category": "computer",
            "status": "inShop"
        },
        {
            "id": 4,
            "name": "Product name 4",
            "price": 42,
            "qty": 230,
            "sku": "P-124",
            "category": "computer",
            "status": "pending"
        },
        {
            "id": 5,
            "name": "Product name 5",
            "price": 12,
            "qty": 100,
            "sku": "P-125",
            "category": "computer",
            "status": "inShop"
        },
        {
            "id": 6,
            "name": "Product name 6",
            "price": 22,
            "qty": 130,
            "sku": "P-122",
            "category": "computer",
            "status": "outOfStock"
        },
        {
            "id": 7,
            "name": "Product name 7",
            "price": 32,
            "qty": 500,
            "sku": "P-123",
            "category": "computer",
            "status": "inShop"
        }
    ],
    "filterItems": {
        "status": [
            {
                "id": 1,
                "type": "pending",
                "value": "",
                "relation": "and"
            }
        ],
        // "category": [
        //     {
        //         "id": 2,
        //         "type": "nameContains",
        //         "value": "",
        //         "relation": "and"
        //     }
        // ],
        // "name": [
        //     {
        //         "id": 3,
        //         "type": "nameContains",
        //         "value": "",
        //         "relation": "and"
        //     }
        // ]
    }
}

// let filtredItems = [];
// const filtredBy = Object.keys(obj.collection);



