function printUpTo(x) {
	if (x <= 0) {
		return false;
	}
	for (let i = 1; i <= 1000; i++) {
		console.log(i);
	}
}
// printUpTo(1000); // should print all the integers from 1 to 1000
y = printUpTo(-10); // should return false
console.log(y); // should print false

function printSum(x) {
	var sum = 0;
	for (let i = 0; i <= x; i++) {
		sum += i;
	}
	return sum;
}
y = printSum(255); // should print all the integers from 0 to 255 and with each integer print the sum so far.
console.log(y); // should print 32640
