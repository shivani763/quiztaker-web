let questions = [];

function addQuestion() {
    const question = document.getElementById('question').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const option4 = document.getElementById('option4').value;
    const correct = document.getElementById('correct').value;

    const questionObj = {
        question,
        options: [option1, option2, option3, option4],
        correct: parseInt(correct)
    };

    questions.push(questionObj);
    displayQuestions();
    clearForm();
}

function displayQuestions() {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';

    questions.forEach((q, index) => {
        const li = document.createElement('li');
        li.textContent = `Q${index + 1}: ${q.question}`;
        questionList.appendChild(li);
    });
}

function clearForm() {
    document.getElementById('question').value = '';
    document.getElementById('option1').value = '';
    document.getElementById('option2').value = '';
    document.getElementById('option3').value = '';
    document.getElementById('option4').value = '';
    document.getElementById('correct').value = '';
}

function createQuiz() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';

    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.classList.add('quiz-question');

        const question = document.createElement('p');
        question.textContent = `Q${index + 1}: ${q.question}`;
        div.appendChild(question);

        q.options.forEach((option, i) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = i + 1;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            div.appendChild(label);
            div.appendChild(document.createElement('br'));
        });

        quizDiv.appendChild(div);
    });

    document.getElementById('submit-quiz').style.display = 'block';
}

function submitQuiz() {
    const quizDiv = document.getElementById('quiz');
    const resultDiv = document.getElementById('result');
    let score = 0;

    questions.forEach((q, index) => {
        const radios = document.getElementsByName(`question${index}`);
        let selected;
        radios.forEach(radio => {
            if (radio.checked) {
                selected = parseInt(radio.value);
            }
        });

        if (selected === q.correct) {
            score++;
        }
    });

    resultDiv.textContent = `You scored ${score} out of ${questions.length}`;
    quizDiv.innerHTML = '';
    document.getElementById('submit-quiz').style.display = 'none';
}
