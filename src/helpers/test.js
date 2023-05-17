export const path = 'api/orders/add'
export const method = 'get'

export default {
   
      "fullname": "John Doe",
      "phone": "123456789",
      "city": "New York",
      "adresse": "123 Main St",
      "price": 50,
      "orderItems": [
        {
          "product_id": 1,
          "product_ref": "P001",
          "product_variation_id": 1,
          "quantity": 10
        },
        {
          "product_id": 2,
          "product_ref": "P002",
          "product_variation_id": 2,
          "quantity": 100
        }
      ]
    
}