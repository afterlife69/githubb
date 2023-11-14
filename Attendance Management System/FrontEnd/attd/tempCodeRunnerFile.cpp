#include<bits/stdc++.h>
using namespace std;
int lastStoneWeight(vector<int>& stones){
        priority_queue<int>pq;
        for(auto it:stones)pq.push(it);
        while(pq.size() >1){
            int f = pq.top();
            pq.pop();
            int s=0;
            if(!pq.empty())s = pq.top();
            pq.pop();
            if(f!=s && s!=0){
                pq.push(f-s);
            }
        }
        return pq.empty()?0:pq.top();
}
int main(){
    int n;
    cin>>n;
    vector<int>st;
    for(int i=0;i<n;i++)cin>>st[i];
    cout<<lastStoneWeight(st)<<endl;
}