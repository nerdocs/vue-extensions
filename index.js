
let hook_registry = {}

export default {
    /**
     * Vue's plugin install hook.
     *
     * Collects all available plugins and maintains a list of hooks, pointing to them.
     * @param {Object} Vue The main Vue instance
     * @param {Object} options An named index of objects:
     *      "plugins": a named index of modules that export a plugin:
     *              name: the name of the plugin
     *              hooks: named index of hooks, each pointing to a list of Vue components
     *                  implementing that hook. They will be rendered at each extensionpoint
     *                  that has the same hook name.
     */
    install: (Vue, options) => {

        for (let pluginName in options.plugins) {
            let plugin = options.plugins[pluginName]
            if(plugin.initialize){
                plugin.initialize()
            }
            for (let hook in plugin.hooks) {
                if (hook_registry[hook] === undefined) {
                    hook_registry[hook] = Array.isArray(plugin.hooks[hook])?
                      plugin.hooks[hook] : [plugin.hooks[hook]]
                }
                // console.debug(plugin.name + ": registering a component for hook '" + hook + "'")

                // add plugin's component(s) to registry
                if (Array.isArray(plugin.hooks[hook])) {
                    hook_registry[hook].concat(plugin.hooks[hook])
                } else {
                    hook_registry[hook].push(plugin.hooks[hook])
                }

            }
        }

        Vue.component("extensionpoint", {
            name: "extensionpoint",
            props: {
                hook: String
            },
            computed: {
                plugins ()  {
                    return hook_registry[this.hook]
                }
            },
            template: `
            <div class="extensionpoint-container">
                <component :is="plugin_component" v-for="plugin_component in plugins" :key="plugin_component.id"/>
            </div>
            `
        })
    }
}
