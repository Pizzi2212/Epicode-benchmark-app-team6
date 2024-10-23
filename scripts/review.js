document.addEventListener("DOMContentLoaded", () => {
	const stars = document.querySelectorAll(".star");
	const commentInput = document.querySelector('input[type="text"]');
	const submitButton = document.querySelector('button[type="submit"]');
	let selectedRating = 0;

	stars.forEach((star, index) => {
		star.addEventListener("click", () => {
			selectedRating = index + 1;
			updateStars();
		});

		star.addEventListener("mouseover", () => {
			highlightStars(index + 1);
		});

		star.addEventListener("mouseout", () => {
			highlightStars(selectedRating);
		});
	});

	function updateStars() {
		stars.forEach((s, i) => {
			if (i < selectedRating) {
				s.classList.add("star--checked");
			} else {
				s.classList.remove("star--checked");
			}
		});

		submitButton.disabled = selectedRating === 0;
	}

	function highlightStars(rating) {
		stars.forEach((s, i) => {
			if (i < rating) {
				s.classList.add("star--hover");
			} else {
				s.classList.remove("star--hover");
			}
		});
	}

	document.querySelector("form").addEventListener("submit", event => {
		event.preventDefault();

		if (selectedRating > 0 && comment) {
			alert(
				`Grazie per il tuo feedback!\nPunteggio: ${selectedRating} \nCommento: ${comment}`,
			);

			selectedRating = 0;
			commentInput.value = "";
			updateStars();
		} else {
			alert("Per favore, seleziona una valutazione e scrivi un commento.");
		}
	});
});
