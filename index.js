import {Terminal} from '@es-js/terminal';
import {obtenerJson} from 'https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js';
import {validarSecreto} from 'https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js';

async function inicio() {
    Terminal.escribir('Hola! Ingresa la palabra secreta:');
    
    var secreto = await Terminal.leer();
    
    var dni = '34877662';
    
    if (await validarSecreto(dni, secreto)) {
        await mostrarCotizacion();
    } else {
        Terminal.escribir('Palabra secreta inválida');
    }
    
    Terminal.escribir('Presiona ENTER para volver a ingresar');
    
    await Terminal.leerEnter();
    
    Terminal.limpiar();
    
    inicio();
}

async function mostrarCotizacion() {
    const dolarBlue = await obtenerJson('https://dolarapi.com/v1/dolares/blue');
    
    Terminal.escribir(dolarBlue);
}

inicio();


async function mostrarCotizacion() {
  const dolarBlue = await obtenerJson("https://dolarapi.com/v1/dolares/blue");

  escribir("💸 Cotización del Dólar Blue:");
  escribir("🟢 Venta: $" + dolarBlue.venta);
  escribir("🔵 Compra: $" + dolarBlue.compra);
  const promedio = ((dolarBlue.venta + dolarBlue.compra) / 2).toFixed(2);
  escribir("📊 Promedio: $" + promedio);
  escribir("📅 Fecha: " + dolarBlue.fecha);
}


