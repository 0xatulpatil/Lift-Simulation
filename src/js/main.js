let taskQ = [];

let validate = (f, l) => {
	let floorVal = document.getElementsByClassName('floorInput')[0].value;
	let liftVal = document.getElementsByClassName('liftInput')[0].value;

	if (floorVal < 3 || liftVal < 3 || floorVal > 10 || liftVal > 10) {
		alert('Floor and Lifts should be in the range (3, 10)');
		return false;
	} else if (liftVal > floorVal) alert('Lifts should be less than Floors');
	else
	buildLayout(floorVal, liftVal);
};

let reset = () =>{
	document.getElementsByClassName('title')[0].style.display = 'block';
	document.getElementsByClassName('form')[0].style.display = 'block';
	document.getElementsByClassName('simulation')[0].style.display = 'none';
	document.getElementsByClassName('backBtn')[0].style.display = 'none';

	let input1 = document.getElementsByClassName('floorInput')[0];
	let input2 = document.getElementsByClassName('liftInput')[0];
	input1.value = '';
	input2.value = ''; 
	
	document.getElementsByClassName('floor-container')[0].innerHTML = "";
	document.getElementsByClassName('lift-container')[0].innerHTML = "";
}

let buildLayout = (floor, lift) => {
	document.getElementsByClassName('title')[0].style.display = 'none';
	document.getElementsByClassName('form')[0].style.display = 'none';
	document.getElementsByClassName('simulation')[0].style.display = 'block';
	document.getElementsByClassName('backBtn')[0].style.display = 'block';

	// creating floors
	let floorContainer = document.getElementsByClassName('floor-container')[0];
	let liftContainer = document.getElementsByClassName('lift-container')[0];

	for (let i = 1; i <= floor; i++) {
		const floorElement = document.createElement('div');
		floorElement.classList.add('floor');
		floorElement.setAttribute('id', `floor`);
		floorElement.setAttribute('floorNo', `${i}`);

		let upBtn = document.createElement('btn');
		upBtn.innerText = 'U';
		upBtn.setAttribute('id', `btn`);
		upBtn.setAttribute('floorNo', `${floor - i + 1}`);
		upBtn.addEventListener('click', (e) => {
			taskQ.push(e.target.getAttribute('floorNo'));
			console.log(`${e.target.getAttribute('floorNo')} pushed into stack`);
		});

		let downBtn = document.createElement('btn');
		downBtn.innerText = 'D';
		downBtn.setAttribute('id', `btn`);
		downBtn.setAttribute('floorNo', `${floor - i + 1}`);
		downBtn.addEventListener('click', (e) => {
			taskQ.push(e.target.getAttribute('floorNo'));
		});
		let btnDiv = document.createElement('div');
		btnDiv.classList.add('btnDiv');

		if (i != 1) btnDiv.append(upBtn);
		if (i != floor) btnDiv.append(downBtn);

		floorElement.appendChild(btnDiv);
		floorContainer.appendChild(floorElement);
	}
	// creating Lifts
	let liftCont = document.createElement('div');
	liftCont.classList.add('lifts');

	for (let i = 1; i <= lift; i++) {
		let lift = document.createElement('div');
		let liftDoor = document.createElement('div');

		lift.classList.add('lift');
		liftDoor.classList.add('liftDoor');
		lift.setAttribute('liftNo', `${i}`);
		lift.setAttribute('status', 'free');
		lift.setAttribute('currFloor', `${1}`);
		lift.appendChild(liftDoor);

		liftCont.append(lift);
	}
	liftContainer.append(liftCont);
};

let findClosestLift = (floorToServe, liftArray) => {
	let closestLift = 999;
	let closestLiftNo;

	for (let i = 0; i < liftArray.length; i++) {
		let status = liftArray[i].getAttribute('status');
		if (status == 'free') {
			// console.log(liftArray[i].getAttribute('currFloor'))
			let liftPosn = liftArray[i].getAttribute('currfloor');
			let floorDiff = Math.abs(liftPosn - floorToServe);
			if (floorDiff < closestLift) {
				closestLift = floorDiff;
				closestLiftNo = liftArray[i].getAttribute('liftNo');
			}
		}
	}
	return closestLiftNo;
};

const openDoor = (liftToMove) => {
	const door = liftToMove.children[0];
	door.style.transform = `translateX(60px)`;
	door.style.transition = `transform 2.5s ease-in-out`;
};

const closeDoor = (liftToMove) => {
	const door = liftToMove.children[0];
	door.style.transform = `translateX(0px)`;
	door.style.transition = `transform 2.5s ease-in-out`;
};

let moveLift = (closestLift, floorToServe, liftArray) => {
	let liftToMove;
	for (let i = 0; i < liftArray.length; i++) {
		if (liftArray[i].getAttribute('liftNo') == closestLift)
			liftToMove = liftArray[i];
	}
	// console.log(`Lift To Move: ${liftToMove}`)
	let currFloor = liftToMove.getAttribute('currFloor');
	let dist = floorToServe - currFloor;

	let deltaPosn = (currFloor - 1) * -100 + dist * -100;

	console.log(deltaPosn, currFloor);

	setTimeout(() => {
		liftToMove.setAttribute('status', `busy`);
		liftToMove.style.transition = `transform ${Math.abs(dist) * 2}s ease-in-out`;
		liftToMove.style.transform = `translateY(${deltaPosn}px)`;
		liftToMove.setAttribute('currFloor', `${floorToServe}`);
	}, 0);

	setTimeout(() => {
		openDoor(liftToMove);
	}, Math.abs(dist) * 2000);

	setTimeout(
		() => {
			closeDoor(liftToMove);
		},
		Math.abs(dist) * 2000 + 2500,
	);

	setTimeout(
		() => {
			liftToMove.setAttribute('status', 'free');
		},
		(Math.abs(dist) * 2000) + 5000,
	);

	console.log('lift moved');
};
setInterval(() => {
	if (taskQ.length != 0) {
		let floorToServe = taskQ[0];
		let liftArray = document.querySelectorAll('.lift');

		let closestLiftNo = findClosestLift(floorToServe, liftArray);
		moveLift(closestLiftNo, floorToServe, liftArray);
		taskQ.shift();
	}
}, 100);
