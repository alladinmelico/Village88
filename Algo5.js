// 1. Given an array and a value Y, count and print the number of array values greater than Y.
function greaterThanY(arr, y) {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] > y) {
			console.log(arr[i]);
			sum += arr[i];
		}
	}
	return sum;
}
console.log(greaterThanY([1, 2, 3, 4, 5, 6], 3));

// 2. Given an array, print the max, min and average values for that array.
function maxMinAvg(arr) {
	let max = arr[0];
	let min = arr[0];
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		if (max < arr[i]) {
			max = arr[i];
		}
		if (min > arr[i]) {
			min = arr[i];
		}
		sum += arr[i];
	}
	console.log('Max: ', max);
	console.log('Min: ', min);
	console.log('Average: ', sum / arr.length);
}
maxMinAvg([1, 2, 3, 4, 5, 6]);

// 3. Given an array of numbers, create a function that returns a new array where negative values were replaced with the string ‘Dojo’.
//   For example, replaceNegatives( [1,2,-3,-5,5]) should return [1,2, "Dojo", "Dojo", 5].
function replaceNegatives(arr) {
	let newArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] > 0) {
			newArr.push(arr[i]);
		} else {
			newArr.push('Dojo');
		}
	}
	return newArr;
}
console.log(replaceNegatives([1, 2, -3, -5, 5]));

// 4. Given array, and indices start and end, remove values in that index range, working in-place (hence shortening the array).
// For example, removeVals([20,30,40,50,60,70],2,4) should return [20,30,70].
function removeVals(arr, start, end) {
	arr.splice(start, end - start + 1);
	return arr;
}
console.log(removeVals([20, 30, 40, 50, 60, 70], 2, 4));
