
export default {
    MyConfirm: function(message) {
        this.$confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        })
    }
}