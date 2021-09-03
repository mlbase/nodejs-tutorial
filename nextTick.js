function func(callback) {
	// nextTick을 사용하여 인자 값으로 전달된 callback 함수를 호출
	process.nextTick(callback, "callback");

}

try {
	func((param) => {
		a.a = 0; //예외처리
	});
} catch (e) {
	console.log("exception !!");
}
