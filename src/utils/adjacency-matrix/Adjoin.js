export default class Adjoin {
  constructor(vertex) {
    this.vertex = vertex;
    this.quantity = vertex.length;
    this.init();
  }

  init() {
    this.adjoinArray = Array.from({ length: this.quantity * this.quantity });
  }

  getVertexRow(id) {
    const index = this.vertex.indexOf(id);
    const col = [];
    this.vertex.forEach((item, pIndex) => {
      col.push(this.adjoinArray[index + this.quantity * pIndex]);
    });
    return col;
  }

  getAdjoinVertexs(id) {
    return this.getVertexRow(id)
      .map((item, index) => (item ? this.vertex[index] : ''))
      .filter(Boolean);
  }

  setAdjoinVertexs(id, sides) {
    const pIndex = this.vertex.indexOf(id);
    sides.forEach((item) => {
      const index = this.vertex.indexOf(item);
      this.adjoinArray[pIndex * this.quantity + index] = 1;
    });
  }

  getRowTotal = (params) => {
    params = params.map((id) => this.getVertexRow(id));
    const adjoinNames = [];
    this.vertex.forEach((item, index) => {
      const rowtotal = params
        .map((value) => value[index])
        .reduce((total, current) => {
          total += current || 0;
          return total;
        }, 0);
      adjoinNames.push(rowtotal);
    });
    return adjoinNames;
  };

  // 交集
  getUnions(params) {
    const row = this.getRowTotal(params);
    return row.map((item, index) => item >= params.length && this.vertex[index]).filter(Boolean);
  }

  // 并集
  getCollection(params) {
    params = this.getRowTotal(params);
    return params.map((item, index) => item && this.vertex[index]).filter(Boolean);
  }

  // 迪科斯彻最短路径
  dijkstra(startId, endID) {
    const stack = this.getVertexRow(startId)
      .map((item, index) => [item, this.vertex[index], startId])
      .sort((a, b) => b[0] - a[0]);
    const nodes = [];

    while (stack.length) {
      // 删除最后节点
      const node = stack.pop();
      const [weights, side] = node;

      nodes.push(node);
      if (side === endID) break;

      if (weights) {
        const children = this.getVertexRow(side).map((item, index) => [item, this.vertex[index]]);

        children.forEach((item) => {
          let single = [];
          stack.some((value) => {
            if (value[1] === item[1]) {
              single = value;
              return true;
            }
            return false;
          });

          const [nodeWeights, id] = single;
          if (id && weights + item[0] < nodeWeights) {
            single[0] = weights + item[0];
            single[2] = side;
          }
        });
      }
      stack.sort((a, b) => b[0] - a[0]);
    }

    return nodes;
  }

  // 广度优先遍历
  bfs(startId, endID) {
    const nodes = [];
    if (startId != null) {
      const stack = [];
      stack.unshift([startId]);
      while (stack.length !== 0) {
        const sides = stack.shift();
        const side = sides[0];

        if (nodes.every((item) => item[0] !== side)) {
          nodes.push(sides);
          // 结束点退出
          if (side === endID) break;
          const children = this.getAdjoinVertexs(side);
          children.forEach((item) => {
            stack.push([item, side]);
          });
        }
      }
    }
    return nodes;
  }

  dfs(startId, endID) {
    const nodes = [];

    if (startId != null) {
      const stack = [];
      stack.push([startId]);
      while (stack.length !== 0) {
        const sides = stack.pop();
        const side = sides[0];

        if (nodes.every((item) => item[0] !== side)) {
          // 注册节点
          nodes.push(sides);
          // 结束点退出
          if (side === endID) break;
          const children = this.getAdjoinVertexs(side);
          children
            .slice()
            .reverse()
            .forEach((item) => {
              stack.push([item, side]);
            });
        }
      }
    }
    return nodes;
  }
}
