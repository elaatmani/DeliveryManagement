import { defineAbility } from '@casl/ability'

export const abilities = [ 
    'dashboard_access',
    'product_create', 
    'product_show',
    'product_delete',
    'product_update',
    'category_show',
    'category_update',
    'category_create',
    'product_access',
    'sale_management',
    'sale_create'
]


const ability = defineAbility((can) => {
    can(abilities)
});

export default ability
