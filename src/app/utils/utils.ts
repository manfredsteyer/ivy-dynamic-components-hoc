import {
    ɵɵdefineComponent,
    ɵɵdirectiveInject,
    ɵComponentDef,
    ChangeDetectionStrategy,
    ɵɵelement,
    OnInit,
    ɵɵproperty,
    Type,
    ɵComponentType,
    ɵRenderFlags
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

export function withRoute(inner: Type<any>) {

    // At runtime this will be a ɵComponentType<any> with
    // a static ngComponentDef property
    const ngComponent = inner as ɵComponentType<any>;

    const def = ngComponent.ngComponentDef as ɵComponentDef<any>;
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
            inner
        ],
        changeDetection: ChangeDetectionStrategy.Default,
        factory: () => new HigherOrderComponent(
            ɵɵdirectiveInject(ActivatedRoute)),
        selectors: [[]],
        template: (rf, ctx) => {

            if (rf & ɵRenderFlags.Create) {
               ɵɵelement(0, elementName, null, ['wrapped', '']);
            }
            if (rf & ɵRenderFlags.Update) {
                for (const prop in ctx.params) {
                    const compProp = def.inputs[prop];
                    if (compProp) {
                       ɵɵproperty(prop, ctx.params[compProp]);
                    }
                }
            }
        },
        type: HigherOrderComponent,
    });

    return HigherOrderComponent;
}
