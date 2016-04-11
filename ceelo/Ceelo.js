

//create an array 1-6
var dice = new Array(1,2,3,4,5,6);

//randomly select an element from the array for 3 dice
var roll1 = dice[Math.floor(Math.random() * dice.length)];
var roll2 = dice[Math.floor(Math.random() * dice.length)];
var roll3 = dice[Math.floor(Math.random() * dice.length)];

//Create score
var score = ""+roll1+roll2+roll3;

//Calculate score
if(roll1 == roll2 && roll2 == roll3) {
	finalScore = "TRIPLE " + roll2;
//make if statement for CONTAINS 123
} else if (score.indexOf('1') >= 0) {
	if (score.indexOf('2') >=0) {
		if (score.indexOf('3') >= 0) {
			finalScore = "123 You LOSE!!!";
		};
	};
//make if statement for CONTAINS 456
} else if (score.indexOf('4') >= 0) {
	if (score.indexOf('5') >=0) {
		if (score.indexOf('6') >= 0) {
			finalScore = "456 You WIN!!!";
		};
	};
} else {
	//this if function doesn't display a number throws js error on page because finalScore is undefined
	if(roll1 == roll2) {
		finalScore = roll3;
	} else if(roll2 == roll3) {
		finalScore = roll1;
	} else if(roll1 == roll3) {
		finalScore = roll2;
	} else {
		finalScore = "Roll again!";
	};
};

//Below displays numbers in page but with no element wrapping, just floating in body
//document.write(score);
//document.write(finalScore);

//cue animations for 123 and 456