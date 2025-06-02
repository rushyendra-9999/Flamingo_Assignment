#include <iostream>
#include <vector>
#include <string>
using namespace std;

bool isSafe(int row, int col, vector<string> &board, int n)
{
    int dr = row;
    int dc = col;

    // check upper diagonal on left side
    while (row >= 0 && col >= 0)
    {
        if (board[row][col] == 'Q')
            return false;
        row--;
        col--;
    }

    row = dr;
    col = dc;

    // check row
    while (col >= 0)
    {
        if (board[row][col] == 'Q')
        {
            return false;
        }
        col--;
    }

    row = dr;
    col = dc;

    // check lower diagonal on left side
    while (row < n && col >= 0)
    {
        if (board[row][col] == 'Q')
        {
            return false;
        }
        col--;
        row++;
    }

    return true;
}

void solve(int col, vector<string> &board, vector<vector<string>> &ans, int n)
{
    if (col == n)
    {
        ans.push_back(board);
        return;
    }

    for (int row = 0; row < n; row++)
    {
        if (isSafe(row, col, board, n))
        {
            board[row][col] = 'Q';
            solve(col + 1, board, ans, n); // Try to place queen column wise
            board[row][col] = '.';         // backtracking
        }
    }
}

vector<vector<string>> solveNQueens(int n)
{
    vector<vector<string>> ans;
    vector<string> board(n);
    string s(n, '.');
    for (int i = 0; i < n; i++)
    {
        board[i] = s;
    }

    solve(0, board, ans, n);

    return ans;
}

int main()
{
    // input - specify size of chess board
    int n;
    // cout << "Enter the size of chessboard : ";
    cin >> n;

    vector<vector<string>> solutions = solveNQueens(n);

    // printing all possible solutions
    cout << "[";
    for (int i = 0; i < solutions.size(); i++)
    {
        cout << "[";
        for (int j = 0; j < solutions[i].size(); j++)
        {
            cout << "\"" << solutions[i][j] << "\"";
            if (j != solutions[i].size() - 1)
                cout << ",";
        }
        cout << "]";
        if (i != solutions.size() - 1)
            cout << ",";
    }
    cout << "]" << endl;

    return 0;
}
