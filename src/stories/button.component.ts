import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'storybook-button',
  template: ` <button
    type="button"
    (click)="onClick.emit($event)"
    class="storybook-button {{labelClass}}"
    [ngStyle]="{ 'background-color': backgroundColor }"
  >
    {{ label }} ~ {{ label2 }}
  </button>`,
  styleUrls: ['./button.css'],
})
export default class ButtonComponent implements OnChanges {
  
  constructor(
    private ref: ChangeDetectorRef
  ) {
    
  }

  /**
   * Is this the principal call to action on the page?
   */
  @Input()
  primary = false;

  /**
   * What background color to use
   */
  @Input()
  backgroundColor?: string;

  /**
   * How large should the button be?
   */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'Button';

  /**
   * Button contents label 2
   *
   * @required
   */
   @Input()
   label2 = 'Button 2';

  /**
   * Button labelClass
   *
   * @required
   */
   @Input()
   labelClass = '';

  /**
   * Optional click handler
   */
  @Output()
  onClick = new EventEmitter<Event>();

  /**
   * ngOnChanges
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.log("[Inside ButtonComponent ngOnChanges function]");
    this.label2 = "label2 Updated via OnChanges";
    this.labelClass = "storybook-button--primary storybook-button--" + this.size;
    this.ref.detectChanges();
    console.log("[Completed ButtonComponent ngOnChanges function]");
  }

  public get classes(): string[] {
    const mode = this.primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return ['storybook-button', `storybook-button--${this.size}`, mode];
  }
}
