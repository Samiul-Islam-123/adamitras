import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from any device on the network
    port: 5173, // Keep this port or change if needed
    strictPort: true, // Ensures Vite runs on the specified port
  }
});
