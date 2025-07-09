const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.getAttribute('data-key');

    if (key === '=') {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = 'Error';
      }
    } else if (button.id === 'clear') {
      display.value = '';
    } else {
      display.value += key;
    }
  });
});

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (/[0-9+\-*/.]/.test(key)) {
    display.value += key;
  } else if (key === 'Enter') {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = 'Error';
    }
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key === 'Escape') {
    display.value = '';
  }
});
