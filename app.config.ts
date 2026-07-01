export default defineAppConfig({
  ui: {
    toast: {
      slots: {
        root: 'bg-fondo-card border border-fondo-login',
        title: 'text-texto font-bold',
        description: 'text-texto-formulario',
        progress: 'bg-boton-hover',
        close: 'text-texto'
      }
    }
  }
})