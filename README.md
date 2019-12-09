# vue-extensions

This library is a Vue.js plugin providing you with an element which acts as extension point. This extension has a named "hook". Plugins then can provide components for this extension point which are automatically found and rendered replacing the extension.

It's written in ES6. It's my first Js/Vue software, so:

1. Be patient - don't expect proffesional code.
2. Be helpful - hints and PRs for improvements welcome.

## Usage
```javascript
// main.js
import Extensions from 'vue-extensions'
import foo from './plugins/foo'

Vue.use(Extensions, {plugins: {foo}})

new Vue({
    // ...
})
```

This is all you need for having now an `<extension>` tag available anywhere:

```html
<template>
    <ul>
        <extension hook="my-list-element">
    </ul>
</template>
```

Now, in plugins/foo.js:

```
import FooListElement from './components/list_element'

export default {
    hooks: {
        "my-list-element": FooListElement
        "blah-another-hook": [FooElement, BazElement]
    }
}
```

vue-extensions finds this file and renders the two elements instead of the <extension> element. You have to make sure that your components do what they promise: in this case, FooListElement should render a <li> element containing some things.

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies library for production
```
npm run build-lib
```

#### Run your tests
```
npm run test
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
