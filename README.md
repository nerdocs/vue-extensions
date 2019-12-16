# vue-extensionpoints

This library is a [Vue.js](https://vuejs.org) plugin providing a custom element which acts as extension point, with a named "hook". Plugins of your application then can provide components for this extension point which are automatically found and rendered replacing the extension.

This is intended wherever you need to have a "list" of different looking components at one place each provided by a plugin.

If you just need a list of the same component, just with different data, don't use `vue-extensionpoints` just use a `v-for` directive.

## Install

The easiest way to install this library in your project is to use the corresponding Vue CLI plugin [extensionpoints](https://github.com/nerdocs/vue-cli-plugin-extensionpoints). It will do all magic for you: 
```bash
# vue add extensionpoints
```

#### Manual install

You can do everything manually too, if you want:
```bash
npm install vue-extensionpoints
```
and add the following code:

Create a file, e.g. named `plugins.js` (or `plugins/index.js`) which exports all of your plugins (you can e.g. automate the creation of this file in a script):
```javascript
import FooPlugin from '@/plugins/fooplugin'
import BarPlugin from 'my/path/to/some/plugins/barplugin.js'

export default {
    FooPlugin, BarPlugin
}
```

Now import that file in `main.js` and pass it to `vue-extensionpoints`:

```javascript

import Extensionpoints from 'vue-extensionpoints'
import plugins from '@/plugins'

Vue.add(Extensionpoints, plugins)

new Vue({
    //...
})
```

## Plugins

Easily said: Plugins are Javascript modules that export a `hooks` object, which is a named index to Vue components:

```javascript
// plugins/FooPlugin/index.js
import AComponent from './components/acomponent.vue'
import {FooElement, BazElement} from './components/othercomponents.vue'

export default {
    hooks: {
        "my-list-element": [AComponent],
        "blah-another-hook": [FooElement, BazElement]
    }   
}
```

You have an `<extension>` tag in your project available now:

```html
<template>
    <ul>
        <extensionpoint hook="my-list-element">
    </ul>
</template>
```

The *vue-extensionpoints* plugin renders the hooked elements replacing the <extension> element, one after another. It's up to you what the plugin is rendering: One plugin can render a simple `<div>` element with an image, the next plugin (same hook!) can render a complicated component with variables, sub-components etc. The `extensionpoint` renders them one after another. You only have to make sure that your components do what they promise: in the sample case above, `FooListElement` should render a <li> element - because it will be rendered within an <ul> element. But thee are no constraints, you are free to choose.
 

## Development

You have an idea, improvement, found a bug? Don't hesitate to contact me. PRs and bug fixes are welcome.

## License

vue-extensionpoints is licensed under the [MIT](https://opensource.org/licenses/mit-license.php) license

#### Compile and minifiy library for production
```
npm run build-lib
```

#### Run your tests
Currently there are no tests, because of three important causes:

a) I'm lazy
b) tests are not necessary here
c) I'm lazy - did I say that already?

```
npm run test
```

#### Lints and fixes files
```
npm run lint
```
