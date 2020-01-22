# vue-extensions

This library is a Vue plugin providing a custom element which acts as extension point, with a named "hook". Plugins of your application then can provide "extension" components for this extensionpoint which are automatically found and rendered replacing the extensionpoint.

This is intended wherever you need to have a "list" of different looking components at one place each provided by a plugin.

If you just need a list of the same component, just with different data, don't use `vue-extensions` just use a `v-for` directive.

## Install

The easiest way to install this library in your project is to use the corresponding Vue CLI plugin [extensions](https://github.com/nerdocs/vue-cli-plugin-extensions). It will do all magic for you:
```bash
# vue add extensions
```

#### Manual install

You can do everything manually too, if you want:
```bash
npm install vue-extensions
```
and add the following code:

Create a file, e.g. named `extensions.js`, which exports all of your extensions as default (you can e.g. automate the creation of this file in a script):
```javascript
import FooPlugin from '@/extensions/fooplugin'
import BarPlugin from 'my/path/to/some/extensions/barextension.js'

export default {
    FooExtension,
    BarExtension
}
```

Now import that file into `main.js` and pass it as "extensions" option to `vue-extensions`:

```javascript

import Extensionpoints from 'vue-extensions'
import AppExtensions from '@/extensions'  // you can freely rename that

Vue.add(Extensionpoints, {extensions: AppExtensions})

new Vue({
    //...
})
```

Note that you have to enable Vue's runtime compiler if you want to render single file template components as extensions!

```Javascript
// vue.config.js
module.exports = {
  runtimeCompiler: true
}
```

## Extensions

Easily said: Extensions are Javascript modules that export a `hooks` object, which is a named index pointing to Vue components:

```javascript
// extensions/FooExtension/index.js
import AComponent from './components/acomponent.vue'
import {FooElement, BazElement} from './components/othercomponents.vue'

export default {
    hooks: {
        "my-list-element": [AComponent],
        "blah-another-hook": [FooElement, BazElement]
    }   
}
```

You have an `<extensionpoint>` tag in your project available now:

```html
<template>
    <ul>
        <extensionpoint hook="my-list-element">
    </ul>
</template>
```

The *vue-extensions* plugin renders the hooked elements replacing the <extensionpoint> element, one after another. It's up to you what the extensions are rendering: One extension can render a simple `<div>` element with an image, the next extension (same hook!) can render a complicated component with variables, sub-components etc. The `<extensionpoint>` renders them one after another. You only have to make sure that your components do what they promise: in the sample case above, `FooListElement` should render a \<li\> element - because it will be rendered within an \<ul\> element. But there are no constraints, you are free to choose.


## Development

You have an idea, improvement, found a bug? Don't hesitate to contact me. PRs and bug fixes are welcome.

## License

`vue-extensions` is licensed under the [MIT](https://opensource.org/licenses/mit-license.php) license

#### Compiles and minifies library for production
```
npm run build-lib
```

#### Runs your tests
Currently there are no tests (yet), because of three important causes:

* I'm lazy
* tests are not necessary here
* I'm lazy - did I say that already?

```
npm run test
```

#### Lints and fixes files
```
npm run lint
```
