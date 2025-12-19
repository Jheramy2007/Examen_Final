// Elementos del DOM
const btnLogin = document.getElementById('btnLogin');
const userInput = document.getElementById('user');
const passInput = document.getElementById('pass');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');

// Credenciales válidas
const VALID_USER = 'admin';
const VALID_PASS = 'admin';

/**
 * Muestra un mensaje de error
 * @param {string} message - Mensaje a mostrar
 */
function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    successMsg.style.display = 'none';
    
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 3000);
}

/**
 * Muestra un mensaje de éxito
 * @param {string} message - Mensaje a mostrar
 */
function showSuccess(message) {
    successMsg.textContent = message;
    successMsg.style.display = 'block';
    errorMsg.style.display = 'none';
}

/**
 * Maneja el proceso de login
 */
function handleLogin() {
    const username = userInput.value.trim();
    const password = passInput.value;

    // Validar campos vacíos
    if (!username || !password) {
        showError('Por favor, completa todos los campos');
        return;
    }

    // Validar credenciales
    if (username === VALID_USER && password === VALID_PASS) {
        showSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
        
        // Redirigir a inicio.html después de 1.5 segundos
        setTimeout(() => {
            window.location.href = 'inicio.html';
        }, 1500);
    } else {
        showError('Usuario o contraseña incorrectos');
        passInput.value = '';
    }
}

// Event listener para el botón
btnLogin.addEventListener('click', handleLogin);

// Event listener para Enter en los inputs
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
});

passInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
});