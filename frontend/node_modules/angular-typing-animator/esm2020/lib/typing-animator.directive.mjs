import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { concat, concatMap, delay, from, ignoreElements, interval, map, of, repeat, take, tap } from 'rxjs';
import * as i0 from "@angular/core";
export class TypingAnimatorDirective {
    constructor(elRef) {
        this.elRef = elRef;
        this.defaults = {
            typeSpeed: 50,
            deleteSpeed: 30,
            startDelay: 0,
            showCursor: true
        };
        this.typeSpeed = this.defaults.typeSpeed;
        this.deleteSpeed = this.defaults.deleteSpeed;
        this.startDelay = this.defaults.startDelay;
        this.showCursor = this.defaults.showCursor;
        this.onComplete = new EventEmitter();
        this.onDeleted = new EventEmitter();
        this.type = (word, speed, backwards = false) => interval(speed).pipe(map((x) => backwards
            ? word.substring(0, word.length - x - 1)
            : word.substring(0, x + 1)), take(word.length));
        this.typeEffect = (word) => concat(this.type(word, this.typeSpeed), of('').pipe(delay(1200), ignoreElements(), tap(() => this.onComplete.emit({ word: word }))), this.type(word, this.deleteSpeed, true), of('').pipe(delay(300), ignoreElements(), tap(() => this.onDeleted.emit({ word: word }))));
    }
    ngAfterViewInit() {
        setTimeout(() => {
            if (this.showCursor) {
                this.insertCursor();
                this.appendStyling();
            }
            from(this.sentences)
                .pipe(concatMap(this.typeEffect), repeat())
                .subscribe((x) => (this.elRef.nativeElement.textContent = x));
        }, this.startDelay);
    }
    insertCursor() {
        if (this.cursor) {
            return;
        }
        this.cursor = document.createElement('span');
        this.cursor.className = 'typed-cursor';
        this.cursor.innerHTML = '|';
        this.elRef.nativeElement.parentNode &&
            this.elRef.nativeElement.parentNode.insertBefore(this.cursor, this.elRef.nativeElement.nextSibling);
    }
    appendStyling() {
        if (this.showCursor) {
            if (document.head.querySelector('#typing')) {
                return;
            }
            const css = document.createElement('style');
            css.id = 'typing';
            css.innerHTML = `
        .typed-cursor {
            opacity: 1;
            animation: typedjsBlink 0.7s infinite;
            -webkit-animation: typedjsBlink 0.7s infinite;
            animation: typedjsBlink 0.7s infinite;
        }
        @keyframes typedjsBlink {
            50% { opacity: 0.0; }
        }
        @-webkit-keyframes typedjsBlink {
            0% { opacity: 1; }
            50% { opacity: 0.0; }
            100% { opacity: 1; }
        }
      `;
            document.head.appendChild(css);
        }
    }
}
TypingAnimatorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: TypingAnimatorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
TypingAnimatorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: TypingAnimatorDirective, selector: "[typingAnimator]", inputs: { sentences: "sentences", typeSpeed: "typeSpeed", deleteSpeed: "deleteSpeed", startDelay: "startDelay", showCursor: "showCursor" }, outputs: { onComplete: "onComplete", onDeleted: "onDeleted" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: TypingAnimatorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[typingAnimator]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { sentences: [{
                type: Input
            }], typeSpeed: [{
                type: Input
            }], deleteSpeed: [{
                type: Input
            }], startDelay: [{
                type: Input
            }], showCursor: [{
                type: Input
            }], onComplete: [{
                type: Output
            }], onDeleted: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwaW5nLWFuaW1hdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHlwaW5nLWFuaW1hdG9yL3NyYy9saWIvdHlwaW5nLWFuaW1hdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULEtBQUssRUFDTCxJQUFJLEVBQ0osY0FBYyxFQUNkLFFBQVEsRUFDUixHQUFHLEVBQ0gsRUFBRSxFQUNGLE1BQU0sRUFDTixJQUFJLEVBQ0osR0FBRyxFQUNKLE1BQU0sTUFBTSxDQUFDOztBQU1kLE1BQU0sT0FBTyx1QkFBdUI7SUF1QmxDLFlBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7UUF0QnJDLGFBQVEsR0FBRztZQUNULFNBQVMsRUFBRSxFQUFFO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixVQUFVLEVBQUUsQ0FBQztZQUNiLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFHTyxjQUFTLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDNUMsZ0JBQVcsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUNoRCxlQUFVLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDOUMsZUFBVSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBRTlDLGVBQVUsR0FBbUMsSUFBSSxZQUFZLEVBRW5FLENBQUM7UUFDSyxjQUFTLEdBQW1DLElBQUksWUFBWSxFQUVsRSxDQUFDO1FBbUJMLFNBQUksR0FBRyxDQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsU0FBUyxHQUFHLEtBQUssRUFBc0IsRUFBRSxD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R0FBRyxRQUFRLENBQUM7WUFDbEIsR0FBRyxDQUFDLFNBQVMsR0FBRzs7Ozs7Ozs7Ozs7Ozs7O09BZWYsQ0FBQztZQUVGLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7b0hBM0dVLHVCQUF1Qjt3R0FBdkIsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBSG5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtpQkFDN0I7aUdBU1UsU0FBUztzQkFBakIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVJLFVBQVU7c0JBQW5CLE1BQU07Z0JBR0csU0FBUztzQkFBbEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBjb25jYXQsXG4gIGNvbmNhdE1hcCxcbiAgZGVsYXksXG4gIGZyb20sXG4gIGlnbm9yZUVsZW1lbnRzLFxuICBpbnRlcnZhbCxcbiAgbWFwLFxuICBvZixcbiAgcmVwZWF0LFxuICB0YWtlLFxuICB0YXBcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgdHlwZSB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3R5cGluZ0FuaW1hdG9yXSdcbn0pXG5leHBvcnQgY2xhc3MgVHlwaW5nQW5pbWF0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgZGVmYXVsdHMgPSB7XG4gICAgdHlwZVNwZWVkOiA1MCxcbiAgICBkZWxldGVTcGVlZDogMzAsXG4gICAgc3RhcnREZWxheTogMCxcbiAgICBzaG93Q3Vyc29yOiB0cnVlXG4gIH07XG5cbiAgQElucHV0KCkgc2VudGVuY2VzITogc3RyaW5nW107XG4gIEBJbnB1dCgpIHR5cGVTcGVlZDogbnVtYmVyID0gdGhpcy5kZWZhdWx0cy50eXBlU3BlZWQ7XG4gIEBJbnB1dCgpIGRlbGV0ZVNwZWVkOiBudW1iZXIgPSB0aGlzLmRlZmF1bHRzLmRlbGV0ZVNwZWVkO1xuICBASW5wdXQoKSBzdGFydERlbGF5OiBudW1iZXIgPSB0aGlzLmRlZmF1bHRzLnN0YXJ0RGVsYXk7XG4gIEBJbnB1dCgpIHNob3dDdXJzb3I6IGJvb2xlYW4gPSB0aGlzLmRlZmF1bHRzLnNob3dDdXJzb3I7XG5cbiAgQE91dHB1dCgpIG9uQ29tcGxldGU6IEV2ZW50RW1pdHRlcjx7IHdvcmQ6IHN0cmluZyB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIHdvcmQ6IHN0cmluZztcbiAgfT4oKTtcbiAgQE91dHB1dCgpIG9uRGVsZXRlZDogRXZlbnRFbWl0dGVyPHsgd29yZDogc3RyaW5nIH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgd29yZDogc3RyaW5nO1xuICB9PigpO1xuXG4gIHByaXZhdGUgY3Vyc29yITogSFRNTFNwYW5FbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYodGhpcy5zaG93Q3Vyc29yKSB7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q3Vyc29yKCk7XG4gICAgICAgIHRoaXMuYXBwZW5kU3R5bGluZygpO1xuICAgICAgfVxuXG4gICAgICBmcm9tKHRoaXMuc2VudGVuY2VzKVxuICAgICAgICAucGlwZShjb25jYXRNYXAodGhpcy50eXBlRWZmZWN0KSwgcmVwZWF0KCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHgpID0+ICh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQgPSB4KSk7XG4gICAgfSwgdGhpcy5zdGFydERlbGF5KTtcbiAgfVxuXG4gIHR5cGUgPSAod29yZDogc3RyaW5nLCBzcGVlZDogbnVtYmVyLCBiYWNrd2FyZHMgPSBmYWxzZSk6IE9ic2VydmFibGU8c3RyaW5nPiA9PlxuICAgIGludGVydmFsKHNwZWVkKS5waXBlKFxuICAgICAgbWFwKCh4KSA9PlxuICAgICAgICBiYWNrd2FyZHNcbiAgICAgICAgICA/IHdvcmQuc3Vic3RyaW5nKDAsIHdvcmQubGVuZ3RoIC0geCAtIDEpXG4gICAgICAgICAgOiB3b3JkLnN1YnN0cmluZygwLCB4ICsgMSlcbiAgICAgICksXG4gICAgICB0YWtlKHdvcmQubGVuZ3RoKVxuICAgICk7XG5cbiAgdHlwZUVmZmVjdCA9ICh3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4gPT5cbiAgICBjb25jYXQoXG4gICAgICB0aGlzLnR5cGUod29yZCwgdGhpcy50eXBlU3BlZWQpLFxuICAgICAgb2YoJycpLnBpcGUoXG4gICAgICAgIGRlbGF5KDEyMDApLFxuICAgICAgICBpZ25vcmVFbGVtZW50cygpLFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5vbkNvbXBsZXRlLmVtaXQoeyB3b3JkOiB3b3JkIH0pKVxuICAgICAgKSxcbiAgICAgIHRoaXMudHlwZSh3b3JkLCB0aGlzLmRlbGV0ZVNwZWVkLCB0cnVlKSxcbiAgICAgIG9mKCcnKS5waXBlKFxuICAgICAgICBkZWxheSgzMDApLFxuICAgICAgICBpZ25vcmVFbGVtZW50cygpLFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5vbkRlbGV0ZWQuZW1pdCh7IHdvcmQ6IHdvcmQgfSkpXG4gICAgICApXG4gICAgKTtcblxuICBwcml2YXRlIGluc2VydEN1cnNvcigpIHtcbiAgICBpZiAodGhpcy5jdXJzb3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnNvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0aGlzLmN1cnNvci5jbGFzc05hbWUgPSAndHlwZWQtY3Vyc29yJztcbiAgICB0aGlzLmN1cnNvci5pbm5lckhUTUwgPSAnfCc7XG5cbiAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSAmJlxuICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShcbiAgICAgIHRoaXMuY3Vyc29yLFxuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50Lm5leHRTaWJsaW5nXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kU3R5bGluZygpIHtcbiAgICBpZiAodGhpcy5zaG93Q3Vyc29yKSB7XG4gICAgICBpZiAoZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKCcjdHlwaW5nJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjc3M6IEhUTUxTdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgY3NzLmlkID0gJ3R5cGluZyc7XG4gICAgICBjc3MuaW5uZXJIVE1MID0gYFxuICAgICAgICAudHlwZWQtY3Vyc29yIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICBhbmltYXRpb246IHR5cGVkanNCbGluayAwLjdzIGluZmluaXRlO1xuICAgICAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IHR5cGVkanNCbGluayAwLjdzIGluZmluaXRlO1xuICAgICAgICAgICAgYW5pbWF0aW9uOiB0eXBlZGpzQmxpbmsgMC43cyBpbmZpbml0ZTtcbiAgICAgICAgfVxuICAgICAgICBAa2V5ZnJhbWVzIHR5cGVkanNCbGluayB7XG4gICAgICAgICAgICA1MCUgeyBvcGFjaXR5OiAwLjA7IH1cbiAgICAgICAgfVxuICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgdHlwZWRqc0JsaW5rIHtcbiAgICAgICAgICAgIDAlIHsgb3BhY2l0eTogMTsgfVxuICAgICAgICAgICAgNTAlIHsgb3BhY2l0eTogMC4wOyB9XG4gICAgICAgICAgICAxMDAlIHsgb3BhY2l0eTogMTsgfVxuICAgICAgICB9XG4gICAgICBgO1xuXG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGNzcyk7XG4gICAgfVxuICB9XG59XG4iXX0=