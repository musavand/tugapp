/* eslint-disable prettier/prettier */

import { EventEmitter2 } from '@nestjs/event-emitter';

/* eslint-disable @typescript-eslint/no-unused-vars */
export function EmitEvent(eventName:string){
  return function(
    target: any,
    porpertyKey: string,
    descriptor : PropertyDescriptor
  ){
    const originalMethod = descriptor.value;
    descriptor.value = async function  (...args :any[]) {
        const eventEmitter : EventEmitter2 = this.eventEmittor;
        if (!eventEmitter){
             throw new Error(
               `EventEmitter2 instance not found in class ${target.constructor.name}. Ensure it's injected.`,
             );
        }
        try {
          const result = await originalMethod.apply(this, args);
          eventEmitter.emitAsync(eventName, result); // Emit event with result data
          return result;
        } catch (error) {
          throw error; // Propagate errors normally
        }
    }


    return descriptor;
  }
}