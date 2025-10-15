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
      <footer className="footer">
        <a href="https://github.com/" target="_blank" rel="noreferrer">Fork</a>
        <span>·</span>
        <a href="https://www.netlify.com/" target="_blank" rel="noreferrer">Netlify ile dağıt</a>
      </footer>
    </div>
  )
}
