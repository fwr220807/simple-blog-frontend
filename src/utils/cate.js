// 将扁平的标题数组加工成树形层级结构，必须要有 level 属性代表标题，如 level : 1，代表 h1
export const toTree = function (flatArr) {
	const resultArr = [] // 结果集数组
	const stack = [] // 栈数组
	flatArr.forEach((levelItem, index) => {
		levelItem.children = []
		if (resultArr.length == 0) {
			// 第一次循环时没有任何内容，则默认将第一个元素入栈
			levelItem.parentCollector = resultArr // 存储父级

			stack.push(levelItem)
			resultArr.push(levelItem)
		} else {
			let lastestLeveInStack = stack[stack.length - 1] // 获取栈顶的元素，即最近如入栈的元素

			if (lastestLeveInStack.level < levelItem.level) {
				// 遇到子级节点
				levelItem.parentCollector = lastestLeveInStack.children

				stack.push(levelItem)
				lastestLeveInStack.children.push(levelItem)
			} else if (lastestLeveInStack.level == levelItem.level) {
				// 遇到同级节点
				levelItem.parentCollector = lastestLeveInStack.parentCollector

				stack.push(levelItem) // 将当前元素入栈
				lastestLeveInStack.parentCollector.push(levelItem)
			} else {
				let lastestLeveParentCollector = lastestLeveInStack.parentCollector
				let lastestLeveParentIndex = stack.findIndex(function (leveItem) {
					return leveItem.children === lastestLeveParentCollector
				})

				if (lastestLeveParentIndex > -1) {
					// 栈顶节点的父级节点
					let lastestLeveParent = stack[lastestLeveParentIndex]

					if (lastestLeveParent.level < levelItem.level) {
						// 当前节点为栈顶节点父节点的子级
						levelItem.parentCollector = lastestLeveParent.children

						lastestLeveParent.children.push(levelItem)
						stack.push(levelItem)
						return
					}

					// 移除栈顶节点父级节点及其以后的所有节点
					stack.splice(lastestLeveParentIndex)

					if (stack.length == 0) {
						// 如果栈空了则该节点为顶层节点
						levelItem.parentCollector = resultArr

						stack.push(levelItem)
						resultArr.push(levelItem)
						return
					}

					lastestLeveInStack = stack[stack.length - 1]
					lastestLeveParent = lastestLeveInStack.parentCollector

					if (lastestLeveInStack.level < levelItem.level) {
						// 当前节点为栈顶节点的子节点
						levelItem.parentCollector = lastestLeveInStack.children
						stack.push(levelItem)
						lastestLeveInStack.children.push(levelItem)
					} else {
						// 当前节点为栈顶节点的兄弟节点
						let lastestLeveParentCollector = lastestLeveInStack.parentCollector
						let collector = stack.find(function (leveItem) {
							return leveItem.children === lastestLeveParentCollector
						})
						// 如果栈顶节点的父级节点的级别比当前节点级别大，则继续往上查找
						while (collector && collector.level >= levelItem.level) {
							lastestLeveParentCollector = collector.parentCollector
							collector = stack.find(function (leveItem) {
								return leveItem.children === lastestLeveParentCollector
							})
						}
						if (!collector) {
							levelItem.parentCollector = resultArr
							stack.push(levelItem)
							resultArr.push(levelItem)
						} else {
							levelItem.parentCollector = collector.children
							collector.children.push(levelItem)

							stack.push(levelItem)
						}
					}
				} else {
					console.log('kkkkkkkkkkkkkkk')
				}
			}
		}
	})
	// 移除元素的parentCollector属性
	flatArr.forEach((levelItem) => {
		if (levelItem.parentCollector) {
			delete levelItem.parentCollector
		}
		if (levelItem.children.length == 0) {
			delete levelItem.children
		}
	})
	return resultArr
}
