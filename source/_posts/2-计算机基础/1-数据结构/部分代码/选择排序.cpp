int i,j,min;

void swap(int a,int b);

void SelectSort(ElemType A[],int n){
    
    for(i = 0;i < n-1;++i){
        min = i;                //记录最小元素的下标
        for(j = i+1;j < n;++j)
            if(A[j] < A[min])   //更新最小元素位置
                min = j;    
        if(min != i)    
            swap(A[min],A[i]);
    }
}

void BuildMaxHeap(ElemType A[],n){
    for(i = n/2;i>1;--i)        //从i=floor(n/2)~1反复调整堆
        HeapAdjust(A,i,n);
}

void HeapAdjust(ElemType A[],int k,int n){
    A[0] = A[k];
    for(i=2*k;i<=n;i*=2){       //逐层向下调整，最值一定在左右孩子结点
        if(i<n&&A[i]<A[i+1])    //若右孩子结点比右孩子结点元素大 
            i++;                //取右孩子下标
        if(A[0]>=A[i])
            break;
        else{                   //将最大放到根
            A[k] = A[i];
            k=i;                //k为最值下标
        }
    }

    A[k] = A[0];
}

void HeapSort(ElemType A[],int n){
    BuildMaxHeap(A,n);
    for(i = n;i > 1;--i){
        Swap(A[i],A[1]);
        HeapAdjust(A,1,i-1);
    }
}