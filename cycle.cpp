#include <vector>
#include <iostream>
using namespace std;

// dfs
bool dfs(int node, vector<vector<int>> &adj, vector<bool> &visited, vector<bool> &pathVis)
{
    visited[node] = true;
    pathVis[node] = true;

    for (int nbr : adj[node])
    {
        if (!visited[nbr] && dfs(nbr, adj, visited, pathVis))
        {
            return true;
        }
        else if (pathVis[nbr])
        {
            return true;
        }
    }

    pathVis[node] = false;
    return false;
}

bool hasCircularDependency(int n, vector<vector<int>> &edges)
{
    vector<vector<int>> adj(n);

    // create adjacency list for given edges
    for (auto &edge : edges)
    {
        adj[edge[0]].push_back(edge[1]);
    }

    vector<bool> visited(n, false);
    vector<bool> pathVis(n, false);

    for (int i = 0; i < n; i++)
    {
        if (!visited[i] && dfs(i, adj, visited, pathVis))
        {
            return true;
        }
    }

    return false;
}

int main()
{
    int n;
    // cout << "Enter number of modules(nodes) : ";
    cin >> n;
    vector<vector<int>> edges = {{0, 1}, {1, 2}, {2, 3}};

    bool ans = hasCircularDependency(n, edges);

    if (ans)
    {
        cout << "True" << endl;
    }
    else
    {
        cout << "False" << endl;
    }

    return 0;
}