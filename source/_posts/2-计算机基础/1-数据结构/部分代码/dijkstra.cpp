# include<iostream>
# include<stack>

using namespace std;

# define MAXVEX 9
# define INFINITY 65535

typedef int Patharc[MAXVEX];
typedef int ShortPathTable[MAXVEX];//记录距离 

typedef struct{
	int vex[MAXVEX];//顶点集 
	int arc[MAXVEX][MAXVEX];//边集 
	int numVertice;//顶点个数 
}MGraph;

void CreateMGraph(MGraph &G);
void Dijkstra(MGraph G,int v0,Patharc P,ShortPathTable D){
	int flag[MAXVEX];//访问标记数组 0-未访问 1-已访问 
	//初始化 
	for(int i = 0;i < G.numVertice;++i){
		flag[i] = 0;
		D[i] = G.arc[v0][i];//D[]为距离数组 
		P[i] = 0;//P[i]为到达vi的路径长度 
	} 
	D[v0] = 0;
	flag[v0] = 1;
	P[0] = 0;
	
	for(int i = 0;i < G.numVertice;++i){
		int min = INFINITY;//记录当前距离最小值 
		int idx;//记录距离最小值下标 
		for(int j = 0;j < G.numVertice;++j){//查找距离v0最近的点 
			if(!flag[j] && D[j] < min){//vj未被访问且距离最小 
				idx = j;
				min = D[j];
			}
		}
		
		flag[idx] = 1;
		for(int w = 0;w < G.numVertice;++w){//更新各个顶点最小距离 
			if(!flag[w] && (min + G.arc[idx][w] < D[w])){
				D[w] = min + G.arc[idx][w]; 
			}
		} 
		P[i+1] = idx;
	} 
}

int main(){
	int v0 = 0; // 源点
	MGraph G;
	Patharc P;
	ShortPathTable D;
	CreateMGraph(G);
	Dijkstra(G,v0,P,D);
	for(int i = 0;i < G.numVertice;++i)
		cout << P[i] << endl; 
	
	return 0;
} 

void CreateMGraph(MGraph &G){
	//初始化图 
	G.numVertice = 9; 
	for(int i = 0;i < G.numVertice;++i)
		G.vex[i] = i;
	
	for(int i = 0;i < G.numVertice;++i){
		for(int j = 0;j < G.numVertice;++j)
			if(i == j)
				G.arc[i][j] = 0;
			else
				G.arc[i][j] = G.arc[j][i] = INFINITY;
	}
	
	G.arc[0][1] = 1;
    G.arc[0][2] = 5;

    G.arc[1][2] = 3;
    G.arc[1][3] = 7;
    G.arc[1][4] = 5;

    G.arc[2][4] = 1;
    G.arc[2][5] = 7;

    G.arc[3][4] = 2;
    G.arc[3][6] = 3;

    G.arc[4][5] = 3;
    G.arc[4][6] = 6;
    G.arc[4][7] = 9;

    G.arc[5][7] = 5;

    G.arc[6][7] = 2;
    G.arc[6][8] = 7;

    G.arc[7][8] = 4;

    // 设置对称位置元素值
    for(int i = 0; i < G.numVertice; ++i){
        for(int j = i; j < G.numVertice; ++j){
            G.arc[j][i] = G.arc[i][j];
        }
    }
}

