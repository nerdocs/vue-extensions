let hookRegistry = {}

export default {
    /**
     * Vue's plugin install hook.
     *
     * Collects all available extensions and maintains a list of hooks, pointing to them.
     * @param {Object} Vue The main Vue instance
     * @param {Object} options An named index of objects:
     *      "extensions": a named index of modules that export an extension:
     *              name: the name of the extensions
     *              hooks: array of objects with the following schema:
     *                  component: a Vue component implementing that hook. They will be rendered within the
     *                    <extensionpoint> tag with given hook name.
     *                  weight: the "weight" of that component. "heavier" components sink down in the
     *                    list and are rendered *after* "lighter" ones.
     *                    Default weight = 0
     */
    install: (Vue, options) => {

        for (let extensionName in options.extensions) {
            let extension = options.extensions[extensionName]
            if(extension.initialize) {
                extension.initialize()
            }
          for (let hook in extension.hooks) {
            let extensionArray = extension.hooks[hook]

              // set a default weight for all extensions if there is none set.
              for (let obj of extensionArray) {
                  if (!obj.weigth) {
                      obj.weigth = 0
                  }
              }

              // if hook is not known already, create it
              if (hookRegistry[hook] === undefined) {
                  hookRegistry[hook] = extensionArray
              } else {
                  // if hook already exists, merge new one
                  hookRegistry[hook] = hookRegistry[hook].concat(extensionArray)

              }
              // console.debug(`Registering component '${extensionName}' for hook '${hook}'`, extensionArray)
          }
        }

        Vue.component('extensionpoint', {
            name: 'extensionpoint',
            props: {
                hook: String
            },
            computed: {
                extensions ()  {
                    // console.log(`hook ${this.hook}: `, hookRegistry[this.hook])
                    return hookRegistry[this.hook].sort((obj1, obj2) => {
                      return obj1.weight - obj2.weight
                    })
                }
            },
            template: `
            <div class="extension-container">
                <component :is="extensionComponent.component" v-for="extensionComponent in extensions" :key="extensionComponent.component.id"/>
            </div>
            `
        })
    }
}
