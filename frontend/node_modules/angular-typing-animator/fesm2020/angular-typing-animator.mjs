import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, NgModule } from '@angular/core';
import { interval, map, take, concat, of, delay, ignoreElements, tap, from, concatMap, repeat } from 'rxjs';

class TypingAnimatorDirective {
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

class TypingAnimatorModule {
}
TypingAnimatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: TypingAnimatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TypingAnimatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: TypingAnimatorModule, declarations: [TypingAnimatorDirective], exports: [TypingAnimatorDirective] });
TypingAnimatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: TypingAnimatorModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: TypingAnimatorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        TypingAnimatorDirective
                    ],
                    exports: [
                        TypingAnimatorDirective
                    ]
                }]
        }] });

/*
 * Public API Surface of angular-typing-animator
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TypingAnimatorDirective, TypingAnimatorModule };
//# sourceMappingURL=angular-typing-animator.mjs.map
