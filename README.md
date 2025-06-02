### Q1 N Queens problem:

- `isSafe(int row, int col, vector<string> &board, int n)`  
  Checks if it is safe to place a queen at the given position by validating the row and both diagonals on the left side.

- `solve(int col, vector<string> &board, vector<vector<string>> &ans, int n)`  
  Recursively attempts to place queens column by column using backtracking.

- `solveNQueens(int n)`  
  Initializes the board and starts the recursive `solve` function. Returns all valid board configurations.

### Compilation (How to run in bash):
  g++ -o nqueens nqueens.cpp
  ./nqueens

  After running the code , enter the size of board(n), then output will be printed


## Q2 - Cycle Detection in Graph - Algorithm Used

- **Depth-First Search (DFS)** is used to traverse the graph.
- Two helper vectors:
  - `visited[]`: tracks all nodes that have been visited at least once.
  - `pathVis[]`: tracks nodes currently in the recursive call stack (i.e., the current DFS path).
- If during DFS we reach a node that is already in the current path (`pathVis[node] == true`), a cycle is detected.

### Compilation (How to run in bash):
  g++ -o detect_cycle cycle.cpp
  ./detect_cycle

  Enter the number of nodes(modules) = n in the graph. Then True or false will be printed according to whether cycle is present or not respectively


  


