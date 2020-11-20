import { queryDependencies } from './query'
import { createDependencyList } from './funtions/create_dependency_list'
// import { createTreeList } from './funtions/create_tree_list'
import { createTreeListNew } from './funtions/create_tree_list_new'

(async () => {
  const result = await queryDependencies()
  const dependencyList = createDependencyList(result)
  // const treeList = createTreeList(dependencyList, result)
  const treeList = createTreeListNew(dependencyList, result)

  console.log('- Tree list links: ', treeList.length)
})();