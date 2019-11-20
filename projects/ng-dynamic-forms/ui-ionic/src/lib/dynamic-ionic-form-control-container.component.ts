import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ContentChildren,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    QueryList,
    Type,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
    DynamicFormArrayGroupModel,
    DynamicFormControl,
    DynamicFormControlContainerComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormComponentService,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormRelationService,
    DynamicFormValidationService,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { DynamicIonicCheckboxComponent } from "./checkbox/dynamic-ionic-checkbox.component";
import { DynamicIonicDateTimeComponent } from "./datetime/dynamic-ionic-datetime.component";
import { DynamicIonicFormArrayComponent } from "./form-array/dynamic-ionic-form-array.component";
import { DynamicIonicFormGroupComponent } from "./form-group/dynamic-ionic-form-group.component";
import { DynamicIonicInputComponent } from "./input/dynamic-ionic-input.component";
import { DynamicIonicRadioGroupComponent } from "./radio-group/dynamic-ionic-radio-group.component";
import { DynamicIonicRangeComponent } from "./range/dynamic-ionic-range.component";
import { DynamicIonicSelectComponent } from "./select/dynamic-ionic-select.component";
import { DynamicIonicToggleComponent } from "./toggle/dynamic-ionic-toggle.component";
import { DynamicIonicTextAreaComponent } from "./textarea/dynamic-ionic-textarea.component";

@Component({
    selector: "dynamic-ionic-form-control",
    templateUrl: "./dynamic-ionic-form-control-container.component.html",
    changeDetection: ChangeDetectionStrategy.Default
})
export class DynamicIonicFormControlContainerComponent extends DynamicFormControlContainerComponent {

    @ContentChildren(DynamicTemplateDirective) contentTemplateList: QueryList<DynamicTemplateDirective>;

    @HostBinding("class") klass;

    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() hostClass: string[];
    @Input("templates") inputTemplateList: QueryList<DynamicTemplateDirective>;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("ionEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild("componentViewContainer", {read: ViewContainerRef, static: true}) componentViewContainerRef: ViewContainerRef;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                protected componentService: DynamicFormComponentService,
                protected relationService: DynamicFormRelationService) {

        super(changeDetectorRef, componentFactoryResolver, layoutService, validationService, componentService, relationService);
    }

    get componentType(): Type<DynamicFormControl> | null {
        return this.componentService.getCustomComponentType(this.model) || ionicUIFormControlMapFn(this.model);
    }
}

export function ionicUIFormControlMapFn(model: DynamicFormControlModel): Type<DynamicFormControl> | null {

    switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return DynamicIonicFormArrayComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return DynamicIonicCheckboxComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            return DynamicIonicFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            return DynamicIonicDateTimeComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
            return DynamicIonicFormGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            return DynamicIonicInputComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return DynamicIonicRadioGroupComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            return DynamicIonicSelectComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
            return DynamicIonicRangeComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
            return DynamicIonicToggleComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return DynamicIonicTextAreaComponent;

        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
            return DynamicIonicDateTimeComponent;

        default:
            return null;
    }
}
