# include<stdio.h>

void BubbleSort(int arr[], int n) {
    for (int i = 0; i < n; ++i) {
        bool flag = false;//标记是否发生交换
        for (int j = 0; j < n-i-1; ++j) {//一趟冒泡，最大值放在最后
            if (arr[j] > arr[j+1]) {
                swap(arr[j],arr[j+1]);
                flag = true;
            }
        }

        if(flag = false)
            return;                     //某一趟没有发生交换，说明已经有序
    }
}

int Partition(ElemType A[],int low,int high){
    ElemType pivot = A[low];
    while(low < high){
        while(low < high && A[high] >= pivot) --high;   //找第一个比枢轴小的元素位置 high
        A[low] = A[high];                               //将比枢轴小的元素移到左端
        while(low < high && A[low] <= pivot) ++low;     //找第一个比枢轴大的元素位置
        A[low] = A[high];                               //将比枢轴大的元素移到右端
    }
    A[low] = pivot;

    return low;                                         //返回存放枢轴的最终位置
}

void QuickSort(ElemType A[],int low,int high){
    if(low < high){
        int pivotpos = Partition(A,low,high);           //划分子表
        QuickSort(A,low,pivotpos-1);
        QuickSort(A,pivotpos+1,high);
    }
}