// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    const quizForm = document.getElementById('quiz-form');
    const scoreDisplay = document.getElementById('score-display');
    const questionBlocks = document.querySelectorAll('.question-block');
    
    // Get the buttons
    const submitButton = quizForm.querySelector('.submit-button');
    const restartButton = document.getElementById('restart-button');

    // --- SUBMIT LOGIC ---
    quizForm.addEventListener('submit', (event) => {
        // Stop the form from submitting the traditional way
        event.preventDefault();

        let score = 0;
        const totalQuestions = questionBlocks.length;

        // Loop through each question block
        questionBlocks.forEach(block => {
            const correctAnswer = block.dataset.correctAnswer;
            const selectedInput = block.querySelector('input[type="radio"]:checked');

            // Clear previous results (in case of restart)
            block.querySelectorAll('.options-group label').forEach(label => {
                label.classList.remove('correct', 'incorrect');
            });

            if (selectedInput) {
                const selectedValue = selectedInput.value;
                // **FIXED** Find label using 'for' attribute
                const selectedLabel = block.querySelector(`label[for="${selectedInput.id}"]`);

                if (selectedValue === correctAnswer) {
                    score++;
                    selectedLabel.classList.add('correct');
                } else {
                    selectedLabel.classList.add('incorrect');
                    // Also show the correct answer
                    // **FIXED** Find correct label using 'for' attribute
                    const correctInput = block.querySelector(`input[value="${correctAnswer}"]`);
                    const correctLabel = block.querySelector(`label[for="${correctInput.id}"]`);
                    correctLabel.classList.add('correct');
                }
            } else {
                // No answer selected, just show the correct answer
                // **FIXED** Find correct label using 'for' attribute
                const correctInput = block.querySelector(`input[value="${correctAnswer}"]`);
                const correctLabel = block.querySelector(`label[for="${correctInput.id}"]`);
                correctLabel.classList.add('correct');
            }
        });

        // Calculate and display the final score
        const scorePercent = Math.round((score / totalQuestions) * 100);
        scoreDisplay.innerHTML = `&gt; SYSTEM_MSG: QUIZ COMPLETE. YOUR SCORE: ${score} / ${totalQuestions} (${scorePercent}%) &lt;`;
        scoreDisplay.style.display = 'block';

        // Toggle buttons
        submitButton.style.display = 'none';
        restartButton.style.display = 'block';

        // Scroll to the top to show the score
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- RESTART LOGIC ---
    restartButton.addEventListener('click', () => {
        // 1. Reset the form (unchecks all radio buttons)
        quizForm.reset();

        // 2. Remove all feedback classes from labels
        document.querySelectorAll('.options-group label').forEach(label => {
            label.classList.remove('correct', 'incorrect');
        });

        // 3. Hide the score and restart button
        scoreDisplay.style.display = 'none';
        restartButton.style.display = 'none';

        // 4. Show the submit button again
        submitButton.style.display = 'block';

        // 5. Scroll back to the top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});