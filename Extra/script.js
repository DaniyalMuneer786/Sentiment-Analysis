// document.addEventListener('DOMContentLoaded', function() {
//     // DOM Elements
//     const textInput = document.getElementById('text-input');
//     const analyzeBtn = document.getElementById('analyze-btn');
//     const resultCard = document.getElementById('result-card');
//     const sentimentBar = document.getElementById('sentiment-bar');
//     const scoreValue = document.getElementById('score-value');
//     const sentimentLabel = document.getElementById('sentiment-label');
//     const positiveList = document.getElementById('positive-list');
//     const negativeList = document.getElementById('negative-list');

//     // Positive and negative word lists for sentiment analysis
//     const positiveWords = [
//         'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'terrific',
//         'outstanding', 'superb', 'brilliant', 'awesome', 'fabulous', 'incredible',
//         'marvelous', 'perfect', 'happy', 'joy', 'love', 'like', 'beautiful', 'best',
//         'better', 'success', 'successful', 'win', 'winning', 'won', 'positive',
//         'impressive', 'pleased', 'exciting', 'excited', 'delighted', 'delight',
//         'grateful', 'thankful', 'appreciate', 'appreciated', 'glad', 'proud',
//         'impressive', 'remarkable', 'exceptional', 'extraordinary', 'spectacular'
//     ];

//     const negativeWords = [
//         'bad', 'terrible', 'horrible', 'awful', 'poor', 'disappointing', 'disappointed',
//         'worst', 'failure', 'fail', 'failed', 'failing', 'negative', 'sad', 'unhappy',
//         'hate', 'dislike', 'angry', 'upset', 'annoyed', 'annoying', 'frustrating',
//         'frustrated', 'terrible', 'horrible', 'awful', 'dreadful', 'appalling',
//         'atrocious', 'inferior', 'unsatisfactory', 'unacceptable', 'inadequate',
//         'deficient', 'defective', 'faulty', 'broken', 'useless', 'worthless',
//         'mediocre', 'substandard', 'shoddy', 'pathetic', 'pitiful', 'miserable'
//     ];

//     // Event Listeners
//     analyzeBtn.addEventListener('click', analyzeSentiment);
//     textInput.addEventListener('keydown', function(e) {
//         if (e.key === 'Enter' && e.ctrlKey) {
//             analyzeSentiment();
//         }
//     });

//     // Sentiment Analysis Function
//     function analyzeSentiment() {
//         const text = textInput.value.trim().toLowerCase();
        
//         if (text === '') {
//             showError('Please enter some text to analyze');
//             return;
//         }

//         // Tokenize the text
//         const words = text.match(/\b\w+\b/g) || [];
        
//         // Count positive and negative words
//         let positiveCount = 0;
//         let negativeCount = 0;
//         const foundPositive = [];
//         const foundNegative = [];

//         words.forEach(word => {
//             if (positiveWords.includes(word) && !foundPositive.includes(word)) {
//                 positiveCount++;
//                 foundPositive.push(word);
//             }
//             if (negativeWords.includes(word) && !foundNegative.includes(word)) {
//                 negativeCount++;
//                 foundNegative.push(word);
//             }
//         });

//         // Calculate sentiment score (-1 to 1)
//         let score = 0;
//         if (positiveCount + negativeCount > 0) {
//             score = (positiveCount - negativeCount) / (positiveCount + negativeCount);
//         }
        
//         // Normalize to 0-100 for display
//         const normalizedScore = Math.round((score + 1) * 50);
        
//         // Determine sentiment label
//         let sentiment;
//         let color;
        
//         if (score > 0.25) {
//             sentiment = 'Positive';
//             color = 'var(--positive-color)';
//         } else if (score < -0.25) {
//             sentiment = 'Negative';
//             color = 'var(--negative-color)';
//         } else {
//             sentiment = 'Neutral';
//             color = 'var(--neutral-color)';
//         }

//         // Update UI
//         resultCard.classList.remove('hidden');
//         sentimentBar.style.width = `${normalizedScore}%`;
//         scoreValue.textContent = score.toFixed(2);
//         sentimentLabel.textContent = sentiment;
//         sentimentLabel.style.color = color;

//         // Display found words
//         displayWordList(positiveList, foundPositive);
//         displayWordList(negativeList, foundNegative);

//         // Scroll to results
//         resultCard.scrollIntoView({ behavior: 'smooth' });

//         // Add animation effect
//         resultCard.style.animation = 'none';
//         setTimeout(() => {
//             resultCard.style.animation = 'fadeIn 0.8s ease-out';
//         }, 10);
//     }

//     // Helper function to display word lists
//     function displayWordList(element, words) {
//         element.innerHTML = '';
//         if (words.length === 0) {
//             const li = document.createElement('li');
//             li.textContent = 'None found';
//             element.appendChild(li);
//         } else {
//             words.forEach(word => {
//                 const li = document.createElement('li');
//                 li.textContent = word;
//                 element.appendChild(li);
//             });
//         }
//     }

//     // Error display function
//     function showError(message) {
//         alert(message);
//     }

//     // Add some initial animation
//     setTimeout(() => {
//         document.querySelector('header').style.opacity = '1';
//         document.querySelector('.input-section').style.opacity = '1';
//     }, 100);
// });



function analyzeSentiment() {
    const text = textInput.value.trim();

    if (text === '') {
        showError('Please enter some text to analyze');
        return;
    }

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showError(data.error);
        } else {
            const sentiment = data.sentiment;
            let score = 0; // Dummy score for UI

            if (sentiment === 'Positive') score = 0.6;
            else if (sentiment === 'Negative') score = -0.6;

            const normalizedScore = Math.round((score + 1) * 50);
            let color;
            if (score > 0.25) color = 'var(--positive-color)';
            else if (score < -0.25) color = 'var(--negative-color)';
            else color = 'var(--neutral-color)';

            // Update UI
            resultCard.classList.remove('hidden');
            sentimentBar.style.width = `${normalizedScore}%`;
            scoreValue.textContent = score.toFixed(2);
            sentimentLabel.textContent = sentiment;
            sentimentLabel.style.color = color;

            displayWordList(positiveList, []);
            displayWordList(negativeList, []);
            resultCard.scrollIntoView({ behavior: 'smooth' });
        }
    })
    .catch(error => {
        showError('Failed to analyze sentiment. Check backend connection.');
        console.error(error);
    });
}
