<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Cotización del Dólar Blue</title>
  <style>
    body {
      background-color: #121212;
      color: #00ff00;
      font-family: monospace;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      color: #00ff00;
      text-align: center;
      margin-bottom: 20px;
    }

    .input-container {
      margin-bottom: 15px;
    }

    #input {
      background: #121212;
      color: #00ff00;
      border: 1px solid #00ff00;
      padding: 10px;
      width: 100%;
      font-family: monospace;
      font-size: 1em;
      box-sizing: border-box;
    }

    #terminal {
      background: black;
      padding: 15px;
      border-radius: 8px;
      white-space: pre-wrap;
      min-height: 200px;
      border: 1px solid #333;
      margin-top: 10px;
    }

    .cargando {
      color: #ffff00;
      font-style: italic;
    }

    .error {
      color: #ff5555;
    }

    .exito {
      color: #55ff55;
    }

    .instrucciones {
      color: #aaaaaa;
      margin-bottom: 10px;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <h1>💵 Dólar Blue App</h1>
  
  <div class="input-container">
    <div class="instrucciones">Ingrese su palabra secreta y presione Enter:</div>
    <input type="password" id="input" placeholder="Escriba aquí su palabra secreta..." autofocus />
  </div>
  
  <div id="terminal"><span class="cargando">Terminal lista. Esperando validación...</span></div>

  <script type="module" src="/index.js"></script>
</body>
</html>
