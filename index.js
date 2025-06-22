
import { obtenerJson } from "https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js";
import { validarSecreto } from "https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js";

const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

const dni = "34877662";

function escribir(mensaje) {
  terminal.textContent += mensaje + "\n";
}

async function procesarEntrada() {
  const secreto = input.value.trim();
  input.value = "";

  escribir("🔐 Verificando palabra secreta...");

  if (await validarSecreto(dni, secreto)) {
    escribir("✅ Palabra Secreta válida");
    await mostrarCotizacion();
  } else {
    escribir("❌ Palabra Secreta inválida");
  }

  escribir("↩️ Podés probar otra vez si querés.");
}

async function mostrarCotizacion() {
  const dolarBlue = await obtenerJson("https://dolarapi.com/v1/dolares/blue");

  escribir("💸 Cotización del Dólar Blue:");
  escribir("🟢 Venta: $" + dolarBlue.venta);
  escribir("🔵 Compra: $" + dolarBlue.compra);
  const promedio = ((dolarBlue.venta + dolarBlue.compra) / 2).toFixed(2);
  escribir("📊 Promedio: $" + promedio);
  escribir("📅 Fecha: " + dolarBlue.fecha);
}
