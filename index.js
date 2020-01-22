
let hook_registry = {}

export default {
    /**
     * Vue's plugin install hook.
     *
     * Collects all available extensions and maintains a list of hooks, pointing to them.
     * @param {Object} Vue The main Vue instance
     * @param {Object} options An named index of objects:
     *      "extensions": a named index of modules that export a extension:
     *              name: the name of the extensions
     *              hooks: named index, each one pointing to a list of Vue
     *                  components implementing that hook. They will be
     *                  rendered at each extensionpoint that has the same hook
     *                  name.
     */
    install: (Vue, options) => {

        for (let extensionName in options.extensions) {
            let extension = options.extensions[extensionName]
            if(extension.initialize){
                extension.initialize()
            }
            for (let hook in extension.hooks) {
                if (hook_registry[hook] === undefined) {
                    hook_registry[hook] = Array.isArray(extension.hooks[hook])?
                      extension.hooks[hook] : [extension.hooks[hook]]
                }
                // console.debug(extension.name + ": registering a component for hook '" + hook + "'")

                // add extension's component(s) to registry
                if (Array.isArray(extension.hooks[hook])) {
                    hook_registry[hook].concat(extension.hooks[hook])
                } else {
                    hook_registry[hook].push(extension.hooks[hook])
                }

            }
        }

        Vue.component("extensionpoint", {
            name: "extensionpoint",
            props: {
                hook: String
            },
            computed: {
                extensions ()  {
                    return hook_registry[this.hook]
                }
            },
            template: `
            <div class="extension-container">
                <component :is="extension_component" v-for="extension_component in extensions" :key="extension_component.id"/>
            </div>
            `
        })
    }
}
