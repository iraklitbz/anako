declare module 'macy' {
    interface MacyOptions {
      container: string;
      trueOrder?: boolean;
      waitForImages?: boolean;
      margin?: number;
      columns?: number;
      breakAt?: { [key: number]: number };
    }
  
    interface MacyInstance {
      recalculate: (runOnImageLoad?: boolean) => void;
      // Puedes agregar más métodos si los usas
    }
  
    function Macy(options: MacyOptions): MacyInstance;
  
    export default Macy;
  }