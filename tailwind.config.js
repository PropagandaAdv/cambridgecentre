/** Design token: unica fonte di verità dei colori e dei font (brand identity 2024). */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { red: '#E4002B', blue: '#036AAC', ink: '#1A1A1A', white: '#FFFFFF' },
        canvas: '#F5F7FA',
        muted: '#4A5A6A',  // testo secondario su canvas: 6.6:1 (calcolato)
        mist: '#9DB4C8',   // testo secondario su blu notte: 7.9:1 (calcolato)
        line: '#5C6B7A',   // bordi interattivi su canvas: 5.1:1 (calcolato)
        'red-deep': '#C70026', // bianco freddo tinto blu, mai #FFF puro (proposta di design)
        night: '#0B1E30',  // blu notte derivato dal blu brand (proposta di design)
      },
      fontFamily: {
        display: ['"Libre Baskerville"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: { soft: '0 30px 60px -20px rgba(3,106,172,0.25)' },
    },
  },
  plugins: [],
};
