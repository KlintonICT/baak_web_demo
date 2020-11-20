import path from 'path'

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const dataFolder = path.resolve('data')

const writeTree = async (treeList: any[]) => {
  try {
    const csvWriter = createCsvWriter({
      path: `${path.join(dataFolder, 'treeList.csv')}`,
      header: [
        {id: 'source', title: 'source'},
        {id: 'target', title: 'target'},
        {id: 'value', title: 'value'}
      ]
    })
  
    await csvWriter.writeRecords(treeList)
      .then(() => {
        console.log('- Done -')
      })
  } catch (error) {
    console.log(error)
  }
}

export const createTreeList = (dependencyList: any[], repositories: any[]) => {
  interface Tree {
    source: string,
    target: string,
    value: number,
  }

  let treeList: Array<Tree> = []

  dependencyList.forEach((dependency) => {
    repositories.forEach(repository => {
      if (repository.deps.length > 0 && repository.name !== dependency.name) {
        if (repository.deps.some((dep: { name: any; }) => dep.name === dependency.name)) {
          treeList.push({
            source: dependency.nameAndVersion,
            target: `${repository.name}@${repository.version}`,
            value: 2
          })
        }
      }
    })
  })

  writeTree(treeList)

  return treeList
}