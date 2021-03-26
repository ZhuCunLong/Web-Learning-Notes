export function BubbleSort(arr, callback): void {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    // 如果一轮比较中没有需要交换的数据，则说明数组已经有序
    let flag = true
    for (let j = 0; j < len - i - 1; j++) {
      if (callback(arr[j], arr[j + 1])) {
        // 顺序交换
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        flag = false
      }
    }
    if (flag) {
      return
    }
  }
}
