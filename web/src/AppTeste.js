import React, { useState } from 'react';

// 3 conceitos principais do React:
// COMPONENTE : Bloco isolado de html, css e js o qual n interfeer no restante da aplicação.
//PROPRIEDADE: Imformações q um componente PAI passa para o componente FILHO
//ESTADO: informações mantidas pelo componente (lembrar: imutabilidade)


function App() {
  const [counter, setCounter  ] = useState(0)

  function incrementeCounter() {
    setCounter(counter + 1)
  }

  return (
    <>
      <h1> Contador: {counter}</h1>
      <button onClick={incrementeCounter}>Incrementar</button>
    </>
  );
}


export default App;
