import { queryDependencies } from './query'
import { createDependencyList } from './funtions/create_dependency_list'
import { createTreeList } from './funtions/create_tree_list'

(async () => {
  const result = await queryDependencies()
  const dependencyList = createDependencyList(result)
  const treeList = createTreeList(dependencyList, result)

  console.log('- Tree list links: ', treeList.length)
})();