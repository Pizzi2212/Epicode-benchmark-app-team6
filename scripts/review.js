document.addEventListener("DOMContentLoaded", () => {
	const stars = document.querySelectorAll(".star");
	const commentInput = document.querySelector('input[type="text"]');
	const submitButton = document.querySelector('button[type="submit"]');
	let selectedRating = 0; // Punteggio selezionato inizialmente a 0

	stars.forEach((star, index) => {
		// Gestione del clic sulla stella
		star.addEventListener("click", () => {
			selectedRating = index + 1; // Aggiorna il punteggio selezionato
			updateStars(); // Aggiorna l'aspetto delle stelle
		});

		// Gestione dell'hover per il punteggio
		star.addEventListener("mouseover", () => {
			highlightStars(index + 1); // Evidenzia le stelle al passaggio del mouse
		});

		// Rimozione dell'hover
		star.addEventListener("mouseout", () => {
			highlightStars(selectedRating); // Ripristina l'aspetto delle stelle
		});
	});

	// Funzione per aggiornare le stelle
	function updateStars() {
		stars.forEach((s, i) => {
			if (i < selectedRating) {
				s.classList.add("star--checked"); // Aggiungi classe per la stella selezionata
			} else {
				s.classList.remove("star--checked"); // Rimuovi classe per le stelle non selezionate
			}
		});

		// Gestisci lo stato del pulsante in base al punteggio
		submitButton.disabled = selectedRating === 0; // Disabilita il pulsante se non è stata fatta alcuna selezione
	}

	// Funzione per evidenziare le stelle
	function highlightStars(rating) {
		stars.forEach((s, i) => {
			if (i < rating) {
				s.classList.add("star--hover"); // Aggiungi classe per l'highlight
			} else {
				s.classList.remove("star--hover"); // Rimuovi classe per l'highlight
			}
		});
	}

	// Gestione dell'invio del modulo
	document.querySelector("form").addEventListener("submit", event => {
		event.preventDefault(); // Prevenire il comportamento di invio predefinito

		const comment = commentInput.value; // Ottieni il valore del commento

		// Condizione per visualizzare un solo alert
		if (selectedRating > 0 && comment.trim() !== "") {
			alert(
				`Thank you for your feedback!\nPunteer: ${selectedRating}\nComment: ${comment}`,
			);

			// Reset dello stato
			selectedRating = 0;
			commentInput.value = ""; // Ripristina il campo di input
			updateStars(); // Aggiorna le stelle per riflettere il reset

			// Rimuovere la classe da tutte le stelle
			stars.forEach(s => {
				s.classList.remove("star--checked"); // Rimuovi la classe per le stelle non selezionate
			});
		}
	});
});
