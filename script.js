function calculateBMI() {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;

    if (weight <= 0 || height <= 0) {
        alert("Please enter valid weight and height (positive values).");
        return;
    }

    const bmi = weight / ((height / 100) * (height / 100));
    const result = document.getElementById("result");

    let interpretation;
    if (bmi < 18.5) {
        interpretation = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        interpretation = "Normal weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
        interpretation = "Overweight";
    } else if (bmi >= 30) {
        interpretation = "Obese";
    }

    result.textContent = `Your BMI is: ${bmi.toFixed(2)} (${interpretation})`;
}



let currentSlide = 0;
let isDragging = false;
let startX;

const slider = document.querySelector('.slider');

slider.addEventListener('mousedown', startDrag);
slider.addEventListener('touchstart', startDrag);
slider.addEventListener('mouseup', stopDrag);
slider.addEventListener('touchend', stopDrag);
slider.addEventListener('mousemove', moveDrag);
slider.addEventListener('touchmove', moveDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX; /* Get starting position */
}

function stopDrag() {
    isDragging = false;
    const movedX = (startX || 0) - (e.clientX || e.touches[0].clientX); /* Calculate distance moved */

    if (movedX > 100) { // User swiped right (more than 100px)
        currentSlide--;
    } else if (movedX < -100) { // User swiped left (more than 100px)
        currentSlide++;
    }

    currentSlide = Math.max(0, Math.min(currentSlide, 1)); // Clamp currentSlide to valid range (0 or 1)
    updateSliderPosition();
}

function moveDrag(e) {
    if (!isDragging) return;
    const moveX = (startX || 0) - (e.clientX || e.touches[0].clientX); // Calculate movement

    slider.style.transform = `translateX(${moveX}px)`; // Update slider position while dragging
}

function updateSliderPosition() {
    slider.style.transform = `translateX(${currentSlide * -100}%)`; // Update slider based on currentSlide index
}

updateSliderPosition(); 