export default {
    /* 库存添加页 */
    state: {
        stock: {
            operationsType: '',
            productId: '',
            operationsNumber: 0,
            factory: '',
            type: ''
        },
        stockDialogFormVisible: false,
        isUpdate: false,
        exportDialogVisible: false
    },
    mutations: {
        update_stockDialogFormVisible (state, param) {
            state.stockDialogFormVisible = param.tableState
            state.stock.type = param.typeValue === 1 ? '添加入库记录' : '添加出库记录'
            state.stock.operationsType = param.typeValue
        },
        update_exportDialogVisible (state, param) {
            state.exportDialogVisible = param
        },
        /* 清空默认值 */
        empty (state) {
            state.stock.productId = ''
            state.stock.operationsNumber = 0
            state.stock.factory = ''
            state.isUpdate = false
        }
    },
    actions: {
        updateStock (context, stock) {
            /* 编辑框给默认值 */
            context.commit('update_stock', stock)
            /* 显示弹出框 */
            context.commit('update_stockDialogFormVisible', true)
        },
        stock_dialogClose (context) {
            // 清空值
            context.commit('empty')
            context.commit('update_stockDialogFormVisible', false)
        },
        cancel (context) {
            /* 关闭弹出框 */
            context.commit('update_stockDialogFormVisible', false)
            /* 清空默认值 */
            context.commit('empty')
        },
    }
}
