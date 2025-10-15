import WordleGame from './components/WordleGame'

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <img src="/Bip_logo.png" alt="BiP" className="brand-logo" />
          <h1>BiP Wordle</h1>
        </div>
      </header>
      <WordleGame />

    </div>
  )
}
