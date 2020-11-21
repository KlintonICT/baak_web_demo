import * as fs from "graceful-fs";
import path from "path";

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const dataFolder = path.resolve("data");

const writeTree = async (treeList: any[]) => {
  try {
    const csvWriter = createCsvWriter({
      path: `${path.join(dataFolder, "treeListNew_1500.csv")}`,
      header: [
        { id: "source", title: "source" },
        { id: "target", title: "target" },
        { id: "value", title: "value" },
      ],
    });

    await csvWriter.writeRecords(treeList).then(() => {
      console.log("- Done -");
    });
  } catch (error) {
    console.log(error);
  }
};

export const createTreeListNew = (
  dependencyList: any[],
  repositories: any[]
) => {
  interface Tree {
    source: string;
    target: string;
    value: number;
  }

  let treeList: Array<Tree> = [];

  dependencyList.forEach((dependency) => {
    repositories.forEach((repository) => {
      if (repository.deps) {
        if (repository.deps.length >= 0 && repository.name !== dependency.name) {
          if (
            repository.deps.some(
              (dep: { name: any }) => dep.name === dependency.name
            )
          ) {
            treeList.push({
              source: `${repository.name}@${repository.version}`,
              target: dependency.nameAndVersion,
              value: 1,
            });
          }
        }
      }
    });
  });

  writeTree(treeList);

  return treeList;
};
