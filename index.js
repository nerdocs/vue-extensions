
let hookRegistry = {}

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
            if(extension.initialize) {
                extension.initialize()
            }
            for (let hook in extension.hooks) {
                // make array
                let componentArray = Array.isArray(extension.hooks[hook]) ?
                    extension.hooks[hook]
                    : [extension.hooks[hook]]

                if (hookRegistry[hook] === undefined) {
                    hookRegistry[hook] = componentArray
                } else {
                    // if extension provides an array, merge it
                    hookRegistry[hook] = hookRegistry[hook].concat(componentArray)

                }
                // console.debug(`Registering component '${extensionName}' for hook '${hook}'`)
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
                    return hookRegistry[this.hook]
                }
            },
            template: `
            <div class="extension-container">
                <component :is="extensionComponent" v-for="extensionComponent in extensions" :key="extensionComponent.id"/>
            </div>
            `
        })
    }
}
