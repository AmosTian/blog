# include<stdlib.h>
# define ElemType int
int i,j,k;

ElemType *B = (ElemType *)malloc(sizeof(ElemType)*(high-low+1)); 
void Merge(ElemType A[],int low,int mid,int high){
                            //表中A[low...mid],A[mid+1,high]分别有序
    for(i = 1;i <= high;++i)//初始化辅助数组
        B[i] = A[i];
    for(i=low,j=mid+1,k=1;i<=mid&&j<=high;++k){
        if(B[i] <= B[j])
            A[k] = B[i++];
        else
            A[k] = B[j++];
    }//for
    while(i <= mid)     A[k++]=B[k++];//若第一个表未检测完,复制
    while(j <= high)    A[k++]=B[j++];//若第二个表未检测完，赋值
}

void MergeSort(ElemType A[],int low,int high){
    if(low < high){
        int mid = (low+high)/2;
        MergeSort(A,low,mid);
        MergeSort(A,mid+1,high);
        Merge(A,low,mid,high);
    }
}

