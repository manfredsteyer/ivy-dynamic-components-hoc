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

    const def = ngComponent.ɵcmp as ɵComponentDef<any>;
    const elementName = def.selectors[0][0] as string;

    // TODO: using ɵComponentType leads to an error, b/c the type
    //  does not have ngComponentDef at compile time
    class HigherOrderComponent implements OnInit {

        static ɵcmp: ɵComponentDef<HigherOrderComponent>;
        static ɵfac: () => HigherOrderComponent;

        params: any = {};

        constructor(private route: ActivatedRoute) {
        }

        ngOnInit() {
            this.route.params.subscribe(params => {
              this.params = params;
            });
        }
    }

    HigherOrderComponent.ɵfac = () => new HigherOrderComponent(ɵɵdirectiveInject(ActivatedRoute));

    HigherOrderComponent.ɵcmp = ɵɵdefineComponent({
        vars: 1,
        decls: 2,
        consts: [[3, 'comicId']],
        directives: [
            inner
        ],
        changeDetection: ChangeDetectionStrategy.Default,
        selectors: [[]],
        template: (rf, ctx) => {

            // tslint:disable-next-line: no-bitwise
            if (rf & ɵRenderFlags.Create) {
                ɵɵelement(0, elementName);
            }
            // tslint:disable-next-line: no-bitwise
            if (rf & ɵRenderFlags.Update) {
                // tslint:disable-next-line: forin
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
