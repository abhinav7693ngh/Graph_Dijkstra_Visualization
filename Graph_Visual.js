new p5();

// ===== Stack ===== //

class StackNode {
  constructor(data) {
    this.value = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.comparatorHelperStack = null;
  }

  push(val) {
    try {
      if (val == 0 || val == false || val) {
        let newNode = new StackNode(val);
        if (this.head == null) {
          this.head = newNode;
          this.tail = newNode;
          this.size++;
          return val;
        } else if (this.head != null) {
          newNode.next = this.head;
          this.head = newNode;
          this.size++;
          return val;
        }
      } else {
        throw new Error(
          "Cannot find passed value or passed value is undefined/null"
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  pop() {
    try {
      if (this.head == null) {
        return null;
      } else {
        if (this.head == this.tail) {
          let toPop = this.head.value;
          this.head = null;
          this.tail = null;
          this.size--;
          return toPop;
        } else {
          let toPop = this.head.value;
          let newHead = this.head.next;
          this.head = newHead;
          this.size--;
          return toPop;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  top() {
    try {
      if (this.head == null) {
        return null;
      } else {
        return this.head.value;
      }
    } catch (e) {
      console.log(e);
    }
  }

  isEmpty() {
    try {
      if (this.head == null) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

// ================== //

// ===== Queue ===== //

class QueueNode {
  constructor(data) {
    this.value = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.comaparatorHelperQueue = null;
  }

  isEmpty() {
    try {
      if (this.head == null) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  enqueue(val) {
    try {
      if (val == 0 || val == false || val) {
        let newNode = new QueueNode(val);
        if (this.head == null) {
          this.head = newNode;
          this.tail = newNode;
          this.size++;
          return val;
        } else {
          this.tail.next = newNode;
          this.tail = newNode;
          this.size++;
          return val;
        }
      } else {
        throw new Error(
          "Cannot find passed value or passed value is undefined/null"
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  dequeue() {
    try {
      if (this.head == null) {
        return null;
      } else {
        if (this.head == this.tail) {
          let toDequeue = this.head.value;
          this.head = null;
          this.tail = null;
          this.size--;
          return toDequeue;
        } else {
          let toDequeue = this.head.value;
          let newHead = this.head.next;
          this.head = newHead;
          this.size--;
          return toDequeue;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  peek() {
    try {
      if (this.head == null) {
        return null;
      } else {
        return this.head.value;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

// ================= //

// ============= Graph Min Priority Queue ================ //

class PriorityQueueNode {
  constructor(data, prior) {
    this.value = data;
    this.priority = prior;
  }
}

class MinGraphPriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    try {
      if (arguments.length > 0) {
        if (val === 0 || val === false || val) {
          if (typeof priority === "number") {
            const newNode = new PriorityQueueNode(val, priority);
            this.values.push(newNode);
            let newNodeIndex = this.values.length - 1;
            let parentIndex = Math.floor((newNodeIndex - 1) / 2);
            while (
              parentIndex >= 0 &&
              this.values[parentIndex].priority >
                this.values[newNodeIndex].priority
            ) {
              let temp = this.values[parentIndex];
              this.values[parentIndex] = this.values[newNodeIndex];
              this.values[newNodeIndex] = temp;
              newNodeIndex = parentIndex;
              parentIndex = Math.floor((newNodeIndex - 1) / 2);
            }
            return val;
          } else {
            throw new Error(
              "Priority is not of type number apart from Infinity/-Infinity or not passed"
            );
          }
        } else {
          throw new Error("Passed value is undefined/null");
        }
      } else {
        throw new Error("Arguments not passed");
      }
    } catch (e) {
      console.log(e);
    }
  }

  dequeue() {
    try {
      if (this.values.length !== 0) {
        if (this.values.length === 1) {
          let myValue = this.values.pop();
          return myValue.value;
        } else if (this.values.length === 2) {
          let myValue;
          if (this.values[0].priority < this.values[1].priority) {
            myValue = this.values.shift();
          } else {
            myValue = this.values.pop();
          }
          return myValue.value;
        } else if (this.values.length === 3) {
          let myValue = this.values.shift();
          if (this.values[0].priority > this.values[1].priority) {
            let temp = this.values[0];
            this.values[0] = this.values[1];
            this.values[1] = temp;
          }
          return myValue.value;
        } else {
          let temp = this.values[0];
          this.values[0] = this.values[this.values.length - 1];
          this.values[this.values.length - 1] = temp;
          const myValue = this.values.pop();
          let index = 0;
          let left = this.values[2 * index + 1];
          let right = this.values[2 * index + 2];
          while (
            this.values[index].priority > left.priority ||
            this.values[index].priority > right.priority
          ) {
            if (right.priority > left.priority) {
              let temp2 = this.values[index];
              this.values[index] = this.values[2 * index + 1];
              this.values[2 * index + 1] = temp2;
              index = 2 * index + 1;
              if (2 * index + 1 > this.values.length - 1) {
                left = { priority: Infinity };
              } else {
                left = this.values[2 * index + 1];
              }
              if (2 * index + 2 > this.values.length - 1) {
                right = { priority: Infinity };
              } else {
                right = this.values[2 * index + 2];
              }
            } else {
              let temp2 = this.values[index];
              this.values[index] = this.values[2 * index + 2];
              this.values[2 * index + 2] = temp2;
              index = 2 * index + 2;
              if (2 * index + 1 > this.values.length - 1) {
                left = { priority: Infinity };
              } else {
                left = this.values[2 * index + 1];
              }
              if (2 * index + 2 > this.values.length - 1) {
                right = { priority: Infinity };
              } else {
                right = this.values[2 * index + 2];
              }
            }
          }
          this.values = this.values.filter((ele) => ele.value !== undefined);
          return myValue.value;
        }
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  }

  size() {
    try {
      return this.values.length;
    } catch (e) {
      console.log(e);
    }
  }
}

// ======================================================= //

// ===== Weighted Undirected Graph ===== //

function WeightedGraphBFSHelper(myans, myqueue, visited) {
  while (myqueue.size > 0) {
    let myvertex = myqueue.dequeue();
    if (!visited[myvertex]) {
      myans.push({ id: this.allVertex[myvertex].id });
      visited[myvertex] = true;
      for (let i of this.adjacencyList[myvertex]) {
        myqueue.enqueue(i.node.id);
      }
    }
  }
}

function WeightedGraphDFSHelper(myans, mystack, visited) {
  while (mystack.size > 0) {
    let myvertex = mystack.pop();
    if (!visited[myvertex]) {
      myans.push({ id: this.allVertex[myvertex].id });
      visited[myvertex] = true;
      for (let i of this.adjacencyList[myvertex]) {
        mystack.push(i.node.id);
      }
    }
  }
}

const nodeType = {
  1: 0.02,
  2: 0.025,
  3: 0.03,
  4: 0.55,
};

class GraphNode {
  constructor(id, type, x, y) {
    (this.id = id), (this.x = x), (this.y = y), (this.nodeType = type);
  }
}

class Graph {
  constructor() {
    (this.adjacencyList = {}), (this.allVertex = {});
  }

  addVertex(ID, type, x, y) {
    if (this.allVertex.hasOwnProperty(ID)) {
      return false;
    } else {
      let newNode = new GraphNode(ID, type, x, y);
      showVertex(newNode.x, newNode.y, ID);
      this.allVertex[ID] = newNode;
      this.adjacencyList[ID] = [];
      return true;
    }
  }

  addEdge(ID1, type1, x1, y1, ID2, type2, x2, y2, weight) {
    if (weight >= 0) {
      if (this.adjacencyList.hasOwnProperty(ID1)) {
        let found = this.adjacencyList[ID1].find((ele) => ele.node.id === ID2);
        if (found) {
          return true;
        }
      }
      if (
        this.adjacencyList.hasOwnProperty(ID1) &&
        !this.adjacencyList.hasOwnProperty(ID2)
      ) {
        this.addVertex(ID2, type2, x2, y2);
        this.adjacencyList[ID1].push({
          weight: weight,
          node: this.allVertex[ID2],
        });
        this.adjacencyList[ID2].push({
          weight: weight,
          node: this.allVertex[ID1],
        });
        //showEdge(this.allVertex[ID1].x, this.allVertex[ID1].y, this.allVertex[ID2].x, this.allVertex[ID2].y);
        return true;
      } else if (
        this.adjacencyList.hasOwnProperty(ID2) &&
        !this.adjacencyList.hasOwnProperty(ID1)
      ) {
        this.addVertex(ID1, type1, x1, y1);
        this.adjacencyList[ID1].push({
          weight: weight,
          node: this.allVertex[ID2],
        });
        this.adjacencyList[ID2].push({
          weight: weight,
          node: this.allVertex[ID1],
        });
        //showEdge(this.allVertex[ID1].x, this.allVertex[ID1].y, this.allVertex[ID2].x, this.allVertex[ID2].y);
        return true;
      } else if (
        !this.adjacencyList.hasOwnProperty(ID1) &&
        !this.adjacencyList.hasOwnProperty(ID2)
      ) {
        this.addVertex(ID1, type1, x1, y1);
        this.addVertex(ID2, type2, x2, y2);
        this.adjacencyList[ID1].push({
          weight: weight,
          node: this.allVertex[ID2],
        });
        this.adjacencyList[ID2].push({
          weight: weight,
          node: this.allVertex[ID1],
        });
        //showEdge(this.allVertex[ID1].x, this.allVertex[ID1].y, this.allVertex[ID2].x, this.allVertex[ID2].y);
        return true;
      } else if (
        this.adjacencyList.hasOwnProperty(ID1) &&
        this.adjacencyList.hasOwnProperty(ID2)
      ) {
        this.adjacencyList[ID1].push({
          weight: weight,
          node: this.allVertex[ID2],
        });
        this.adjacencyList[ID2].push({
          weight: weight,
          node: this.allVertex[ID1],
        });
        //showEdge(this.allVertex[ID1].x, this.allVertex[ID1].y, this.allVertex[ID2].x, this.allVertex[ID2].y);
        return true;
      }
    } else {
      return false;
    }
  }

  removeEdge(ID1, ID2) {
    if (this.adjacencyList.hasOwnProperty(ID1)) {
      let found = this.adjacencyList[ID1].findIndex(
        (ele) => ele.node.id === ID2
      );
      if (found === -1) {
        return false;
      }
    }
    if (
      this.adjacencyList.hasOwnProperty(ID1) &&
      this.adjacencyList.hasOwnProperty(ID2)
    ) {
      this.adjacencyList[ID1] = this.adjacencyList[ID1].filter(
        (ele) => ele.node.id !== ID2
      );
      this.adjacencyList[ID2] = this.adjacencyList[ID2].filter(
        (ele) => ele.node.id !== ID1
      );
      return true;
    } else {
      return false;
    }
  }

  removeVertex(ID) {
    if (this.adjacencyList.hasOwnProperty(ID)) {
      delete this.allVertex[ID];
      delete this.adjacencyList[ID];
      for (let i in this.adjacencyList) {
        this.adjacencyList[i] = this.adjacencyList[i].filter(
          (ele) => ele.node.id !== ID
        );
      }
      return true;
    } else {
      return false;
    }
  }

  BFS(ID) {
    let myans = [];
    if (this.allVertex.hasOwnProperty(ID)) {
      let myqueue = new Queue();
      let visited = {};
      myqueue.enqueue(ID);
      WeightedGraphBFSHelper.call(this, myans, myqueue, visited);
      return myans;
    } else {
      return myans;
    }
  }

  DFS(ID) {
    let myans = [];
    if (this.allVertex.hasOwnProperty(ID)) {
      let visited = {};
      let mystack = new Stack();
      mystack.push(ID);
      WeightedGraphDFSHelper.call(this, myans, mystack, visited);
      return myans;
    } else {
      return myans;
    }
  }

  neighbours(ID) {
    let myans = [];
    if (this.allVertex.hasOwnProperty(ID)) {
      for (let i of this.adjacencyList[ID]) {
        myans.push({ id: i.node.id, weight: i.weight });
      }
      return myans;
    } else {
      return myans;
    }
  }

  hasEdge(ID1, ID2) {
    if (this.adjacencyList.hasOwnProperty(ID1)) {
      let found = this.adjacencyList[ID1].findIndex(
        (ele) => ele.node.id === ID2
      );
      if (found === -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  shortestPath(ID1, ID2) {
    let path = {
      distance: 0,
      nodes: [],
    };
    if (
      this.allVertex.hasOwnProperty(ID1) &&
      this.allVertex.hasOwnProperty(ID2)
    ) {
      let optimumDistance = 0;
      let visited = {};
      let previous = {};
      let myDistanceQueue = new MinGraphPriorityQueue();
      for (let i in this.adjacencyList) {
        if (i == ID1) {
          myDistanceQueue.enqueue(i, 0);
        } else {
          myDistanceQueue.enqueue(i, Infinity);
        }
      }
      for (let i in this.adjacencyList) {
        previous[i] = null;
      }
      let visiting = myDistanceQueue.values[0];
      while (myDistanceQueue.size() > 0) {
        for (let j of this.adjacencyList[visiting.value]) {
          if (!visited[j.node.id]) {
            let updatedDistance = visiting.priority + j.weight;
            let myDistanceNode = myDistanceQueue.values.find(
              (ele) => parseInt(ele.value) === parseInt(j.node.id)
            );
            if (updatedDistance < myDistanceNode.priority) {
              myDistanceNode.priority = updatedDistance;
              previous[j.node.id] = visiting.value;
            }
          }
        }
        visited[visiting.value] = true;
        myDistanceQueue.dequeue();
        visiting = myDistanceQueue.values[0];
      }
      path.nodes.push(ID2);
      while (previous[ID2]) {
        path.nodes.push(parseInt(previous[ID2]));
        ID2 = previous[ID2];
      }
      path.nodes = path.nodes.reverse();
      for (let i in path.nodes) {
        if (parseInt(i) + 1 === path.nodes.length) {
          break;
        }
        let myWeight = this.adjacencyList[path.nodes[i]].find(
          (ele) => ele.node.id === path.nodes[parseInt(i) + 1]
        );
        optimumDistance = optimumDistance + myWeight.weight;
      }
      path.distance = optimumDistance;
      moveOnPath(path);
    } else {
      moveOnPath(path);
    }
  }
}

let my,
  move = false,
  wantToMove = true,
  ellcolor,
  myellip;

let r,
  theta,
  myLine,
  rUse = 0,
  myX,
  myY,
  i = 0;
let start, end;
let mytheta;

function moveSetup(path) {
  if (path.nodes.length <= i) {
    wantToMove = true;
    move = true;
    rUse = 0;
    i = 0;
    start = null;
    end = null;
    return false;
  }
  if (start && end) {
    if (rUse > r) {
      rUse = 0;
      start = my.allVertex[path.nodes[i]];
      end = my.allVertex[path.nodes[i + 1]];
      console.log("Start", start);
      console.log("end", end);
      myLine = createVector(start.x, start.y, end.x, end.y);
      if (end.y - start.y < 0 && end.x - start.x < 0) {
        theta = degrees(PI) + atan((end.y - start.y) / (end.x - start.x));
      } else if (end.y - start.y > 0 && end.x - start.x < 0) {
        theta = degrees(PI) + atan((end.y - start.y) / (end.x - start.x));
      } else {
        theta = atan((end.y - start.y) / (end.x - start.x));
      }
      console.log(theta);
      r = dist(start.x, start.y, end.x, end.y);
      myX = myLine.x;
      myY = myLine.y;
      i++;
      return true;
    } else {
      return true;
    }
  }
  start = my.allVertex[path.nodes[i]];
  end = my.allVertex[path.nodes[i + 1]];
  console.log("Start", start);
  console.log("end", end);
  myLine = createVector(start.x, start.y, end.x, end.y);
  if (end.y - start.y < 0 && end.x - start.x < 0) {
    theta = degrees(PI) + atan((end.y - start.y) / (end.x - start.x));
  } else if (end.y - start.y > 0 && end.x - start.x < 0) {
    theta = degrees(PI) + atan((end.y - start.y) / (end.x - start.x));
  } else {
    theta = atan((end.y - start.y) / (end.x - start.x));
  }
  r = dist(start.x, start.y, end.x, end.y);
  myX = myLine.x;
  myY = myLine.y;
  i++;
  return true;
}

function moveOnPath(path) {
  move = path;
}

function showVertex(x, y, id) {
  fill(255);
  circle(x, y, 35);
  fill(0);
  text(id, x, y);
}

function setup() {
  createCanvas(1900, 900);
  textSize(25);
  background(255);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  ellcolor = color(0);
  ellcolor.setAlpha(1);
  my = new Graph();
}

function draw() {
  my.addEdge(1, 1, 100, 150, 2, 1, 150, 550, 10);
  my.addEdge(2, "", "", "", 4, 2, 300, 220, 20);
  my.addEdge(4, "", "", "", 3, 1, 350, 450, 5);
  my.addEdge(3, "", "", "", 2, "", "", "", 10);
  my.addEdge(5, 1, 800, 130, 6, 1, 860, 450, 20);
  my.addEdge(1, "", "", "", 7, 2, 675, 700, 30);
  my.addEdge(4, "", "", "", 6, "", "", "", 40);
  if (wantToMove) {
    my.shortestPath(1, 6);
    if (moveSetup(move)) {
      if (rUse > r) {
      } else {
        myX = myLine.x + rUse * cos(theta);
        myY = myLine.y + rUse * sin(theta);
        rUse += 10;
        myellip = ellipse(myX, myY, 3);
        myellip.fill(ellcolor);
      }
    }
  }
}
