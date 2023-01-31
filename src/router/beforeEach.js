import store from '@/store'
export default function (to) {


    // Changing page title
    document.title = to.meta?.title
    // return true
    
    // handle if user is not logged
    if (!store.getters['user/isLoggedIn']) {
        if (to.path == '/login') {
            return true
        }

        return { name: 'login' }
    }

    // handle if user is logged and want to show login
    if (to.path == '/login') {
        return { name: '404' }
    }

    const { gate: permission } = to.meta;
    const permissions = store.getters['user/permissions'];

    if(permission === 'all') {
        return true
    }

    if (!permission && to.path !== '/404') {
        return { name: '404' }
    }

    // Check permission
    if (!permissions.includes(permission) && to.path !== '/404') {
        return { name: '404' };
    }


    return true
    /* eslint-disable*/

    // check if route doesn't have a gate (permission)
    if (!permission || to.path === '/404') {
        if (store.getters['user/isLoggedIn'] && to.path !== '/login') {
            // return fallback path
            return { name: '404' }
        }

        if (!store.getters['user/isLoggedIn'] && to.path !== '/login') {
            return { name: 'login' };
        }

        return true
    } 


    

    

    return true;
}