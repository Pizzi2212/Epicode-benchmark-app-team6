document.addEventListener("DOMContentLoaded", () => {
	const stars = document.querySelectorAll(".star");
	const commentInput = document.querySelector('input[type="text"]');
	const submitButton = document.querySelector('button[type="submit"]');
	let selectedRating = 0;

	stars.forEach((star, index) => {
		// Gestione del clic sulla stella
		star.addEventListener("click", () => {
			selectedRating = index + 1;
			updateStars();
		});

		// Gestione dell'hover per il punteggio
		star.addEventListener("mouseover", () => {
			highlightStars(index + 1);
		});

		// Rimozione dell'hover
		star.addEventListener("mouseout", () => {
			highlightStars(selectedRating);
		});
	});

	// Funzione per aggiornare le stelle
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

	// Funzione per evidenziare le stelle
	function highlightStars(rating) {
		stars.forEach((s, i) => {
			if (i < rating) {
				s.classList.add("star--hover");
			} else {
				s.classList.remove("star--hover");
			}
		});
	}

	// Gestione dell'invio del modulo
	document.querySelector("form").addEventListener("submit", event => {
		event.preventDefault();

		const comment = commentInput.value;

		// Condizione per visualizzare un solo alert
		if (selectedRating > 0 && comment.trim() !== "") {
			alert(
				`Thank you for your feedback!\nPunteer: ${selectedRating}\nComment: ${comment}`,
			);

			// Reset dello stato
			selectedRating = 0;
			commentInput.value = "";
			updateStars();

			// Rimuovere la classe da tutte le stelle
			stars.forEach(s => {
				s.classList.remove("star--checked");
			});
		}
	});
});
