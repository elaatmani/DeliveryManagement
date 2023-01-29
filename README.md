# production

## Project setup
```
npm install
```

Sidebar and routes:
    - To define sidebar links and sublinks go to 'src/config/links.js'
      each link is defined by id, title, module, gate, hasChildren, children, icon, to.
      * id     -> An id for the link
      * title  -> The name that will be displayed in the sidebar link
      * module -> This will be used to check if the link is active. it's required when the link has children. e.g: product, sale
      * gate   -> stands for permission e.g: 'product_create', check if the user is authorized to have this link in sidebar
      * hasChildren -> does this link have sublinks or children ? when true the link works like a dropdown and not a link also when it's false it's required to add 'to' to the link with the path.
      * icon -> an object with type and value keys. there is only 2 types: icon, svg. when type is icon the value should be name of an mdi icon like 'mdi-heart'. and when it's an svg the value should be the path to that svg from public folder.
      * to  -> is the link has no children then this field is required and it takes a path

    - To define routes link go to 'src/router/routes'

    to be continue...

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
