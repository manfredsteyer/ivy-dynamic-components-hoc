import {
    ɵɵdefineComponent,
    ɵɵdirectiveInject,
    ɵComponentDef,
    ChangeDetectionStrategy,
    ɵɵelement,
    OnInit,
    ɵɵproperty
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RenderFlags } from '@angular/compiler/src/core';

export function withRoute(component /*: ɵComponentType<any>*/) {

    const def = component.ngComponentDef as ɵComponentDef<any>;
    const elementName = def.selectors[0][0] as string;

    // TODO: using ɵComponentType leads to an error, b/c the type
    //  does not have ngComponentDef at compile time
    class HigherOrderComponent implements OnInit {

        static ngComponentDef: ɵComponentDef<HigherOrderComponent>;

        params: any = {};

        constructor(private route: ActivatedRoute) {
        }

        ngOnInit() {
            this.route.params.subscribe(params => {
              this.params = params;
            });
        }
    }

    HigherOrderComponent.ngComponentDef = ɵɵdefineComponent({
        consts: 1,
        vars: 1,
        directives: [
            component
        ],
        changeDetection: ChangeDetectionStrategy.Default,
        factory: () => new HigherOrderComponent(
            ɵɵdirectiveInject(ActivatedRoute)),
        selectors: [[]],
        template: (rf, ctx) => {
            if (rf & RenderFlags.Create) {
               ɵɵelement(0, elementName, null, ['wrapped', '']);
            }
            if (rf & RenderFlags.Update) {
                for (const prop in ctx.params) {
                    if (prop in component) {
                       ɵɵproperty(prop, ctx.params[prop]);
                    }
                }
            }
        },
        type: HigherOrderComponent,
    });

    return HigherOrderComponent;
}
