
(() => {
    //identify the nodes of interest in the DOM
	const puzzleSelectors = document.querySelectorAll("#buttonHolder img"),
				dropContainer = document.querySelector(".puzzle-board"),
				dragImages = document.querySelectorAll(".puzzle-image"),
				dropZones = document.querySelectorAll(".drop-zone"),
				dragContainer = document.querySelector(".puzzle-pieces"),

				//adding the pieces data for each puezzle backGround
				pieceData = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

		// functions go in the middle
		function swapImages() {
			//1. get the image reference with an attribute "imageref" from the clicked element
			let currentIndex = this.dataset.imageref;

			// swap out the draggable thumbnail images
			//update the pieces images with each data
			dragImages.forEach((image, index) => {
				image.src = `images/dd/${pieceData [index] + currentIndex}.jpg`;
			});

			//2. set the image selected in the dropContainer background
			dropContainer.style.backgroundImage = `url(images/dd/backGround${this.dataset.imageref}.jpg)`;

			// if the images is change then reset the puzzle in its original (add the resetPuzzle function)
			resetPuzzle();
		}

		//new function to reset the pieces in its original place
		function resetPuzzle(){
			dropZones.forEach(zone => {
				if (zone.children.length > 0) {
					dragContainer.appendChild(zone.firstElementChild);
				}
			})
		}


		function startDrag(event) {
			console.log('dragging ' + this.id);
			// save a reference to the element the user is dragging
			// so that we can retrive the element and put it in a drop zone
			event.dataTransfer.setData("dragTarget", this.id);
			// debugger;
		}

		function draggedOver(event) {
			event.preventDefault();
			console.log('dragging over drop zone elements');
		}

		function dropped(event) {
			//allow a drop to happen
			event.preventDefault();

			//if we have already dropped and appended into a dropzone, then it shoud not happen again
			//the return Statement is a code-killer - nothing will excute past this line statement
				if (this.children.length > 0) { return; }

			//get the reference to the dragged image
			let targetImage = document.querySelector(`#${event.dataTransfer.getData("dragTarget")}`)

				//with this if the targetImage should match to then appendChild works
				//if it doesnt match it returns, with this in HTML the zones should have the same
				//name in the piece id and the data-dropped

				// this if makes the condition if it don´t match it must return
				if (targetImage.id !== this.dataset.drop) { return; }

			//add it to the zone we dropped the image on
			this.appendChild(targetImage);
			targetImage.style.width = "100%";
			targetImage.style.height = "100%";
			targetImage.style.padding = "0%";
			targetImage.style.margin = "0 auto";

		}

//		function matchBox(){
//			//check and match the piece with id dragImages to the correct dropZones
//			console.log("drop" + this.id);

//			if (this.id === targetImage) {
//				this.appendChild(targetImage);
//			} else {return; }
//		}


		// event handling at the bottom
	dragImages.forEach(piece => {
		piece.addEventListener('dragstart', startDrag, false);
	});


	dropZones.forEach(zone => {
		zone.addEventListener('drop',dropped, false);
		zone.addEventListener('dragover',draggedOver, false);
	});


	puzzleSelectors.forEach(button => button.addEventListener("click", swapImages));
})();
