document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultCard = document.getElementById('result-card');
    const sentimentLabel = document.getElementById('sentiment-label');
    const scoreValue = document.getElementById('score-value');
    const sentimentBar = document.getElementById('sentiment-bar');

    // Event Listeners
    analyzeBtn.addEventListener('click', analyzeSentiment);
    textInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            analyzeSentiment();
        }
    });

    // Function to send text to Flask backend and display result
    function analyzeSentiment() {
        const text = textInput.value.trim();

        if (text === '') {
            showError('Please enter some text to analyze.');
            return;
        }

        // fetch('/predict', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ text: text })
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok.');
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     if (data.error) {
        //         showError(data.error);
        //     } else {
        //         displaySentiment(data.sentiment);
        //     }
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     showError('Server error. Please try again later.');
        // });

        fetch('/predict', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ text })
        })
        .then(res => res.json())
        .then(data => {
            const sentiment = data.sentiment;
            const score = data.score; // Get score from Flask
        
            let color;
            if (sentiment === 'Positive') {
                color = 'var(--positive-color)';
                // console.log('Sentiment is ==> ', color);
                displaySentiment(sentiment, score);

            } else if (sentiment === 'Negative') {
                color = 'var(--negative-color)';
                // console.log('Sentiment is ==> ', color);
                displaySentiment(sentiment, score);

            } else {
                color = 'var(--neutral-color)';
                // console.log('Sentiment is ==> ', color);
                displaySentiment(sentiment, score);

            }
        
            sentimentBar.style.width = `${score * 100}%`;
            sentimentLabel.textContent = sentiment;
            sentimentLabel.style.color = color;
        });
    }

    // Display the sentiment result
    function displaySentiment(sentiment, score) {
        let color;

        switch (sentiment) {
            case 'Positive':
                color = 'var(--positive-color)';
                break;
            case 'Negative':
                color = 'var(--negative-color)';
                break;
            default:
                color = 'var(--neutral-color)';
                break;
        }

        // Normalize to 0–100 scale
        const normalizedScore = Math.round(score * 100);

        sentimentLabel.textContent = sentiment;
        sentimentLabel.style.color = color;
        sentimentBar.style.width = `${normalizedScore}%`;
        scoreValue.textContent = score.toFixed(2);

        resultCard.classList.remove('hidden');
        resultCard.style.animation = 'none';
        setTimeout(() => {
            resultCard.style.animation = 'fadeIn 0.8s ease-out';
        }, 10);
        resultCard.scrollIntoView({ behavior: 'smooth' });
    }

    // Show error
    function showError(message) {
        alert(message);
    }

    // Optional animation
    setTimeout(() => {
        document.querySelector('header').style.opacity = '1';
        document.querySelector('.input-section').style.opacity = '1';
    }, 100);
});
