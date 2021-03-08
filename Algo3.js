// Print 1 to x
function printUpTo(x) {
	if (x <= 0) {
		return false;
	}
	for (let i = 1; i <= 1000; i++) {
		console.log(i);
	}
}
printUpTo(1000); // should print all the integers from 1 to 1000
y = printUpTo(-10); // should return false
console.log(y); // should print false

// PrintSum
function printSum(x) {
	var sum = 0;
	for (let i = 0; i <= x; i++) {
		sum += i;
	}
	return sum;
}
y = printSum(255); // should print all the integers from 0 to 255 and with each integer print the sum so far.
// console.log(y); // should print 32640

// PrintSumArray
function printSumArray(x) {
	var sum = 0;
	for (var i = 0; i < x.length; i++) {
		sum += x[i];
	}
	return sum;
}
console.log(printSumArray([1, 2, 3])); // should log 6

// LargestElement
function largestElement(arr) {
	let large = 0;
	for (let i = 0; i < arr.length; i++) {
		if (large < arr[i]) {
			large = arr[i];
		}
	}
	return large;
}

console.log(largestElement([1, 30, 5, 7]));
