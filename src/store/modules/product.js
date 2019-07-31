export default {
    /* 菜单添加页 */
    state: {
        product: {
            id: '',
            productModel: '',
            productNumber: 0
        },
        productDialogFormVisible: false,
        type: '添加菜单',
        isUpdate: false
        },
    mutations: {
        update_productDialogFormVisible (state, tableState) {
            state.productDialogFormVisible = tableState
        },
        // 点击添加菜单按钮时 显示添加界面
        update_dialogFormVisible (state, params) {
            state.productDialogFormVisible = params.state
            state.type = '添加产品'
            state.isUpdate = false
        },
        // 编辑框给默认值
        update_product (state, product) {
            state.product.id = product.id
            state.product.productModel = product.productModel
            state.product.productNumber = product.productNumber
            state.type = '编辑产品'
            state.isUpdate = true
        },
        /* 清空默认值 */
        empty (state) {
            state.product.id = ''
            state.product.productModel = ''
            state.product.productNumber = 0
            state.isUpdate = false
        }
    },
    actions: {
        updateProduct (context, product) {
            /* 编辑框给默认值 */
            context.commit('update_product', product)
            /* 显示弹出框 */
            context.commit('update_productDialogFormVisible', true)
        },
        product_dialogClose (context) {
            // 清空值
            context.commit('empty')
            context.commit('update_productDialogFormVisible', false)
        },
        cancel (context) {
            /* 关闭弹出框 */
            context.commit('update_productDialogFormVisible', false)
            /* 清空默认值 */
            context.commit('empty')
        },
        }
}
