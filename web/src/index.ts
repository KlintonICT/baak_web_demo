'use strict'
import { csv, DSVRowArray } from 'd3'

type Row = 'source' | 'target'

(async function() {
  const data: DSVRowArray<Row> = await csv('/data/treeList.csv')

  // console.log(data)

  const nodes = {}
  const links = []

  data.map((row) => {
    console.log(row.source)
    console.log(row.target)
  })
  // for (let i = 0; i < data.length; i++) {
  //   const row: DSVRowArray<string> = data[i]
  //   console.log(row)

  //   // const source = nodes[row]
  // }
})()