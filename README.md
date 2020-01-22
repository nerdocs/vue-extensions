# vue-extensions

This library is a Vue plugin providing a custom element which acts as extension point, with a named "hook". Plugins of your application then can provide "extension" components for this extensionpoint which are automatically found and rendered replacing the extensionpoint.

This is intended wherever you need to have a "list" of different looking components at one place each provided by a plugin.

If you just need a list of the same component, just with different data, don't use `vue-extensions` just use a `v-for` directive.

## Install

The easiest way to install this library in your project is to use the corresponding Vue CLI plugin [extensions](https://github.com/nerdocs/vue-cli-plugin-extensions). It will do all magic for you:
```bash
# vue add extensions
```

This adds everything you need automatically to your project. Just make sure that `runtimeCompiler: true` is enabled in `vue.config.js` - to use template strings in Vue.

If you choose to install everything manually, see [Manual install](manuall-install.md).

## Extensions

Extensions are modules that export a default object with a `hooks` property, which is a named index pointing to Vue components. This seems complicated, but an example makes it much clearer:

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

One module can provide components for more than one hooks.

There is an `<extensionpoint>` tag in your project available now:

```html
<template>
    <h3>Extensionpoints for "my-list-element" in a list:</h3>
    <ul>
        <extensionpoint hook="my-list-element"/>
    </ul>

    <h3>Extensionpoints for "blah-another-hook"</h3>
    <extensionpoint hook="blah-another-hook"/>
</template>
```

The *vue-extensions* plugin renders the hooked elements replacing the <extensionpoint> element, one after another. It's up to you what the extensions are rendering: One extension can render a simple `<div>` element with an image, the next extension (same hook!) can render a complicated component with variables, sub-components etc. The `<extensionpoint>` renders them one after another. You only have to make sure that your components do what they promise: in the sample case above, `FooListElement` should render a \<li\> element - because it will be rendered within an \<ul\> element. But there are no constraints, you are free to choose.

## Further usage
The extensions.js file (or how you choose to name it) is intended to be created automatically by a script of your choice - If you want to see a project that uses this, see my [GDAPS][https://gdaps.readthedocs.io], which is a Django plugin system that can use Vue as frontend.

## Development

You have an idea, improvement, found a bug? Don't hesitate to contact me. PRs and bug fixes are welcome.

## License

`vue-extensions` is licensed under the [MIT](https://opensource.org/licenses/mit-license.php) license

#### Compiles and minifies library for production
```
npm run build
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
