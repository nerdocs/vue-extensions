
let hook_registry = {}

export default {
    /**
     * Vue's plugin install hook.
     *
     * Collects all available plugins and maintains a list of hooks.
     * @param {Object} Vue The main Vue instance
     * @param {Object} options An object of available options:
     *      "plugins": a Vue component (or list of components) that fits this
     *                 extension.
     */
    install: (Vue, options) => {

        for (var pluginName in options.plugins) {
            let plugin = options.plugins[pluginName]
            if(plugin.initialize){
                plugin.initialize()
            }
            for (let hook in plugin.hooks) {
                if (hook_registry[hook] === undefined) {
                    hook_registry[hook] = plugin.hooks[hook]
                }
                // console.debug(plugin.name + ": registering a component for hook '" + hook + "'")

                // add plugin's component(s) to registry
                if (Array.isArray(hook_registry[hook])) {
                    hook_registry[hook].concat(plugin.hooks[hook])
                } else {
                    hook_registry[hook].push(plugin.hooks[hook])
                }

            }
        }

        Vue.component("extension", {
            name: "extension",
            props: {
                hook: String
            },
            computed: {
                plugins ()  {
                    return hook_registry[this.hook]
                }
            },
            template: `
            <div class="extension-container">
                <component :is="plugin_component" v-for="plugin_component in plugins">
                </component>
            </div>
            `
        })
    }
}
