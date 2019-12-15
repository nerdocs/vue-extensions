# vue-extensionpoints

This library is a Vue.js plugin providing you with an element which acts as extension point. This extension has a named "hook". Plugins then can provide components for this extension point which are automatically found and rendered replacing the extension.

## Install

```bash
# npm install vue-extensionpoints
```

## Usage
```javascript
// main.js
import Extensions from 'vue-extensionpoints'
import foo from '@/plugins/foo'

Vue.use(Extensions, {plugins: {foo}})

new Vue({
    // ...
})
```

You can import the `options` object from a file that can be created automatially, depending on how you have structured your plugin structures.

You have an `<extension>` tag available now:

```html
<template>
    <ul>
        <extension hook="my-list-element">
    </ul>
</template>
```

Now, in plugins/foo.js:

```javascript
import FooListElement from './components/list_element'
import { FooElement, BazElement } from './components/elements'

export default {
    hooks: {
        "my-list-element": FooListElement
        "blah-another-hook": [FooElement, BazElement]
    }
}
```

vue-extensionpoints finds this file and renders the hooked elements replacing the <extension> element, one after another. You have to make sure that your components do what they promise: in this case, FooListElement should render a <li> element - because it will be rendered within an <ul> element. But thee are no constraints, you are free to choose whatever you want here.


#### Compile and minifies library for production
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
