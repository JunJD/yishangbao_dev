module.exports = {
    plugin: {
        'postcss-viewport-units': {
          filterRule: rule => rule.nodes.findIndex(i => i.prop === "content") === -1
        }
    }
}