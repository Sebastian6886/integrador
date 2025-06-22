// Importación del módulo de validación
import { validarSecreto } from 'https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js';

// Configuración inicial
const dni = '34877662'; // Tu DNI
const terminal = document.getElementById('terminal');
const input = document.getElementById('input');

// Función para escribir en la terminal virtual
function escribirTerminal(texto) {
  terminal.innerHTML += '\n' + texto;
  terminal.scrollTop = terminal.scrollHeight;
}

// Función principal para procesar la entrada
async function procesarEntrada() {
  const secreto = input.value.trim();
  
  if (!secreto) {
    escribirTerminal('Error: Debes ingresar una palabra secreta');
    input.value = '';
    return;
  }

  escribirTerminal('Validando...');
  input.disabled = true;
  
  try {
    const esValido = await validarSecreto(dni, secreto);
    
    if (esValido) {
      escribirTerminal('Acceso concedido. Obteniendo cotización...');
      await mostrarCotizacion();
    } else {
      escribirTerminal('Palabra secreta incorrecta');
    }
  } catch (error) {
    console.error('Error:', error);
    escribirTerminal('Error al conectar con el servidor de validación');
  } finally {
    input.value = '';
    input.disabled = false;
    input.focus();
  }
}

// Función para mostrar la cotización del dólar blue
async function mostrarCotizacion() {
  try {
    const response = await fetch('https://dolarapi.com/v1/dolares/blue');
    const dolarBlue = await response.json();
    
    escribirTerminal(`\n=== COTIZACIÓN DÓLAR BLUE ===`);
    escribirTerminal(`Compra: $${dolarBlue.compra}`);
    escribirTerminal(`Venta: $${dolarBlue.venta}`);
    escribirTerminal(`Promedio: $${((dolarBlue.compra + dolarBlue.venta) / 2).toFixed(2)}`);
    escribirTerminal(`Actualizado: ${new Date(dolarBlue.fechaActualizacion).toLocaleString()}`);
    escribirTerminal('\nActualiza la página (F5) para consultar nuevamente');
  } catch (error) {
    console.error('Error al obtener cotización:', error);
    escribirTerminal('Error al obtener la cotización. Intenta nuevamente más tarde.');
  }
}

// Event listener para la tecla Enter
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    procesarEntrada();
  }
});

// Mensaje inicial
escribirTerminal('Listo para validar. Ingrese su palabra secreta:');
