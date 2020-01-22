# Manual install

You can install vue-extensions manually too, if you want (instead of invoking `vue add extensions`):

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

```javascript
// vue.config.js
module.exports = {
  runtimeCompiler: true
}
```
