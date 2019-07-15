import {
    ɵcompileComponent,
    ɵɵdefineComponent,
    ɵɵdirectiveInject,
    ɵrenderComponent,
    ɵComponentDef,
    ɵComponentType,
    ɵmarkDirty,
    Type,
    Host,
    ElementRef,
    Injector,
    ChangeDetectionStrategy
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';


export function withRoute(component /*: ɵComponentType<any>*/) {

    const def = component.ngComponentDef as ɵComponentDef<any>;

    console.debug(def.selectors);

    // TODO: using ɵComponentType leads to an error, b/c the type
    //  does not have ngComponentDef at compile time
    class HigherOrderComponent {

        static ngComponentDef: ɵComponentDef<HigherOrderComponent>;

        constructor(
            private injector: Injector,
            private host: ElementRef,
            private route: ActivatedRoute) {
                
                const comp = ɵrenderComponent(component, { host: this.host.nativeElement, injector });
                // const compType = comp.constructor as ɵComponentType<any>;
               
                
                route.params.subscribe(params => {
                    console.debug('p', params);
                    
                    for (const propName in def.inputs) {
                        if (params[propName]) {
                            console.debug('new value', params[propName]);
                            comp[propName] = params[propName];
                            console.debug('!', propName);
                            ɵmarkDirty(comp);
                        }
                    }

                });


        }
    };

    


    HigherOrderComponent.ngComponentDef = ɵɵdefineComponent({
        consts: 20,
        vars: 20,
        directives: [],
        changeDetection: ChangeDetectionStrategy.Default,
        factory: (f) => new HigherOrderComponent(
            ɵɵdirectiveInject(Injector as any),
            ɵɵdirectiveInject(ElementRef),
            ɵɵdirectiveInject(ActivatedRoute)),
        // factory: (f) => new (f || HigherOrderComponent)(ɵɵdirectiveInject(ActivatedRoute)),
        selectors: [[]],
        template: (rf, ctx) => { },
        // tslint:disable-next-line: whitespace
        type: HigherOrderComponent,
    });

    return HigherOrderComponent;

}
