// Función para escribir en la terminal virtual con clase opcional
function escribirTerminal(texto, clase = '') {
  const linea = document.createElement('div');
  linea.textContent = texto;
  if (clase) linea.className = clase;
  terminal.appendChild(linea);
  terminal.scrollTop = terminal.scrollHeight;
}

// Limpiar terminal
function limpiarTerminal() {
  terminal.innerHTML = '<span class="cargando">Cargando terminal virtual...</span>';
}

// Función principal para procesar la entrada
async function procesarEntrada() {
  const secreto = input.value.trim();
  
  if (!secreto) {
    escribirTerminal('Error: Debes ingresar una palabra secreta', 'error');
    input.value = '';
    return;
  }

  escribirTerminal('Validando credenciales...', 'cargando');
  input.disabled = true;
  
  try {
    const esValido = await validarSecreto(dni, secreto);
    
    if (esValido) {
      escribirTerminal('Acceso concedido', 'exito');
      escribirTerminal('Obteniendo cotización...', 'cargando');
      await mostrarCotizacion();
    } else {
      escribirTerminal('Palabra secreta incorrecta', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    escribirTerminal('Error al conectar con el servidor de validación', 'error');
  } finally {
    input.value = '';
    input.disabled = false;
    input.focus();
  }
}

// Función para mostrar la cotización
async function mostrarCotizacion() {
  try {
    const response = await fetch('https://dolarapi.com/v1/dolares/blue');
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    
    const dolarBlue = await response.json();
    
    escribirTerminal('\n=== COTIZACIÓN DÓLAR BLUE ===', 'exito');
    escribirTerminal(`Compra: $${dolarBlue.compra}`);
    escribirTerminal(`Venta: $${dolarBlue.venta}`);
    escribirTerminal(`Promedio: $${((dolarBlue.compra + dolarBlue.venta) / 2).toFixed(2)}`);
    escribirTerminal(`Actualizado: ${new Date(dolarBlue.fechaActualizacion).toLocaleString()}`);
    escribirTerminal('\nActualiza la página (F5) para consultar nuevamente');
  } catch (error) {
    console.error('Error al obtener cotización:', error);
    escribirTerminal('Error al obtener la cotización', 'error');
    escribirTerminal('Intenta nuevamente más tarde', 'cargando');
  }
}

// Event listener para la tecla Enter
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    procesarEntrada();
  }
});

// Inicialización
setTimeout(() => {
  terminal.innerHTML = 'Bienvenido al sistema de cotización del Dólar Blue\nIngrese su palabra secreta y presione Enter:';
}, 1500); // Simula carga inicial
