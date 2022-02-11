// 分类列表创建树状结构
function handleTree(list) {
    let cloneData = JSON.parse(JSON.stringify(list))
    return cloneData.filter(father => {
        let branchArr = cloneData.filter(child => {
            return father.id === child.parent_id
        });
        if (branchArr.length > 0) {
            father.children = branchArr;
        }
        return father.parent_id === 0
    })
}

module.exports = {
    handleTree
}