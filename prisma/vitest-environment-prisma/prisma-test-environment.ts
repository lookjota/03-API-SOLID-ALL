
import { Environment } from "vitest";

export default<Environment>{
  name: 'prisma',
  transformMode: 'web',
  async setup(global, options) {
    console.log('setup');

    return {
      teardown() { 
        console.log('teardown');  ``
      },
    }
  },
}