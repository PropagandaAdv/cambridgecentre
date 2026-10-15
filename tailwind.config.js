/** Design token: unica fonte di verità dei colori e dei font (brand identity 2024). */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { red: '#E4002B', blue: '#036AAC', ink: '#1A1A1A', white: '#FFFFFF' },
        canvas: '#F5F7FA', // bianco freddo tinto blu, mai #FFF puro (proposta di design)
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
