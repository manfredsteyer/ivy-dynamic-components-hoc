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
    ChangeDetectionStrategy,
    ContentChild,
    ɵɵelement,
    ɵɵviewQuery,
    ɵɵstaticViewQuery,
    ɵɵqueryRefresh,
    ɵɵloadViewQuery,
    AfterContentInit,
    OnInit,
    AfterViewInit,
    ChangeDetectorRef
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';


export function withRoute(component /*: ɵComponentType<any>*/) {

    const def = component.ngComponentDef as ɵComponentDef<any>;

    const elementName = def.selectors[0][0] as string;

    // TODO: using ɵComponentType leads to an error, b/c the type
    //  does not have ngComponentDef at compile time
    class HigherOrderComponent implements AfterViewInit {

        static ngComponentDef: ɵComponentDef<HigherOrderComponent>;

        component: any;

        ngAfterViewInit(): void {
           this.setupParams();
           this.cd.detectChanges();
        }

        setupParams() {
            const comp = this.component;

            this.route.params.subscribe(params => {
                console.debug('p', params);
                
                for (const propName in def.inputs) {
                    if (params[propName]) {
                        console.debug('new value', params[propName]);
                        comp[propName] = params[propName];
                        console.debug('!', propName);
                        // ɵmarkDirty(comp);
                    }
                }

            });
        }

        constructor(
            private cd: ChangeDetectorRef,
            private injector: Injector,
            private host: ElementRef,
            private route: ActivatedRoute) {
                
                // const comp = ɵrenderComponent(component, { host: this.host.nativeElement, injector });
                // const compType = comp.constructor as ɵComponentType<any>;
               
                
                
                


        }
    };

    


    HigherOrderComponent.ngComponentDef = ɵɵdefineComponent({
        consts: 20,
        vars: 20,
        directives: [
            component
        ],
        changeDetection: ChangeDetectionStrategy.Default,
        factory: (f) => new HigherOrderComponent(
            ɵɵdirectiveInject(ChangeDetectorRef as any),
            ɵɵdirectiveInject(Injector as any),
            ɵɵdirectiveInject(ElementRef),
            ɵɵdirectiveInject(ActivatedRoute)),
        // factory: (f) => new (f || HigherOrderComponent)(ɵɵdirectiveInject(ActivatedRoute)),
        selectors: [[]],
        viewQuery: (rf, ctx) => {
            if (rf & 1) {
                ɵɵstaticViewQuery(['wrapped'], true, null);
            }
            if (rf & 2) {
                let value;
                if (ɵɵqueryRefresh((value = ɵɵloadViewQuery()))) {
                    ctx.component = value.first;
                }
            }
        },
        template: (rf, ctx) => { 
            
            if (rf & 1) {
                console.debug(elementName);
               ɵɵelement(0, elementName, null, ['wrapped', '']);
            }
        },
        // tslint:disable-next-line: whitespace
        type: HigherOrderComponent,
    });

    return HigherOrderComponent;

}
