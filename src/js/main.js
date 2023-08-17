let floorVal, liftVal;

let validate = (f, l) => {
	// floorVal = document.getElementsByClassName('floorInput')[0].value;
	// liftVal = document.getElementsByClassName('liftInput')[0].value;
	//
	// if (floorVal < 3 || liftVal < 3 || floorVal > 10 || liftVal > 10) {
	// 	alert('Floor and Lifts should be in the range (3, 10)');
	// 	return false;
	// } else if (liftVal > floorVal) alert('Lifts should be less than Floors');
	// else 
		buildLayout(f, l);
	
};

let buildLayout = (floor, lift) => {
	document.getElementsByClassName('title')[0].style.display = 'none';
	document.getElementsByClassName('form')[0].style.display = 'none';
	document.getElementsByClassName('simulation')[0].style.display = 'block';

	// creating floors
	let floorContainer = document.getElementsByClassName('floor-container')[0];
	let liftContainer = document.getElementsByClassName('lift-container')[0];

	for (let i = 1; i <= floor; i++) {
		const floorElement = document.createElement('div');
		floorElement.classList.add('floor');
		floorElement.setAttribute('id', `floor`);

		let upBtn = document.createElement('btn');
		upBtn.innerText = 'U';
		upBtn.setAttribute('id', `btn`)
		upBtn.setAttribute('floorNo', `${floor - i + 1}`)
		upBtn.addEventListener('click', (e) => {
			taskQ.push(e.target.getAttribute('floorNo'))
		})

		let downBtn = document.createElement('btn');
		downBtn.innerText = 'D';
		downBtn.setAttribute('id', `btn`)
		downBtn.setAttribute('floorNo', `${floor - i + 1}`)
		downBtn.addEventListener('click', (e) => {
			taskQ.push(e.target.getAttribute('floorNo'));
		})
		let btnDiv = document.createElement('div');
		btnDiv.classList.add('btnDiv')

		if(i != 1) btnDiv.append(upBtn);
        if(i != floor) btnDiv.append(downBtn);

		floorElement.appendChild(btnDiv);
		floorContainer.appendChild(floorElement);

		// creating Lifts
		let liftContainer = document.createElement('div');
		liftContainer.classList.add('lifts');

		for(let i=1; i<= lifts; i++){
			let lift = document.createElement('div');
			lift.classList.add('lift');
			lift.setAttribute('liftNo', `${i}`);
		}
	}
};
