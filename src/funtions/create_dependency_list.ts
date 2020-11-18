import * as fs from 'graceful-fs'
import path from 'path'

const dataFolder = path.resolve('data')

interface Dependency {
  name: string,
  version: string,
  nameAndVersion: string,
}

const writeDependencyList = (dependencyList: Dependency[]) => {
  fs.writeFileSync(path.join(`${dataFolder}/dependencyList.json`), JSON.stringify(dependencyList))
}

export const createDependencyList = (repositoriesList: any[]) => {

  let dependencyList: Array<Dependency> = []

  repositoriesList.forEach(repository => {
    if (repository.deps.length > 0) {
      repository.deps.forEach((dep: any) => {
        if (dependencyList.length > 0) {
          if (!dependencyList.some(d => d.name === dep.name)) {
            dependencyList.push({
              name: dep.name,
              version: dep.version,
              nameAndVersion: `${dep.name}@${dep.version}`
            })  
          }
        } else {
          dependencyList.push({
            name: dep.name,
            version: dep.version,
            nameAndVersion: `${dep.name}@${dep.version}`
          })
        }
      })
    }
  })

  writeDependencyList(dependencyList)

  return dependencyList
}
