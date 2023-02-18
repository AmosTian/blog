void Direct_InsertSort(ElemType A[],int n){
	int i,j;

	for(i = 2;i <= n;++i){
		if(A[i] < A[i-1]){	//若待插入元素A[i]< A[i-1]，从后向前比较并移动找插入位置
			A[0] = A[i];	//A为一固定序列，且数据存储已定，所以需要哨兵记录被覆盖元素
			for(j=i-1;A[0] > A[j];--j)
				A[j+1] = A[j];
			A[j+1] = A[0];	//多减1
		}
	}
}

void Binary_InsertSort(ElemType A[],int n){
	int i,j,low,high,mid;
	for(i = 2;i <= n;++i){//依次将A[2]~A[n]插入到有序子序列
		A[0] = A[i];
		low = 1;high=i-1;//
		while(low <= high){//折半查找
			mid = (low+high)/2;
			if(A[mid] > A[0])
				high = mid-1;
			else 
				low = mid+1;
		}
		//mid为插入位置
		for(j=i-1;j>=high;--j)
			A[j+1] = A[j];
		A[high+1] = A[0];	
	}
}
