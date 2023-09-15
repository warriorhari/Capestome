import { AfterViewInit, ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import type { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class TypingAnimatorDirective implements AfterViewInit {
    private elRef;
    defaults: {
        typeSpeed: number;
        deleteSpeed: number;
        startDelay: number;
        showCursor: boolean;
    };
    sentences: string[];
    typeSpeed: number;
    deleteSpeed: number;
    startDelay: number;
    showCursor: boolean;
    onComplete: EventEmitter<{
        word: string;
    }>;
    onDeleted: EventEmitter<{
        word: string;
    }>;
    private cursor;
    constructor(elRef: ElementRef);
    ngAfterViewInit(): void;
    type: (word: string, speed: number, backwards?: boolean) => Observable<string>;
    typeEffect: (word: string) => Observable<string>;
    private insertCursor;
    private appendStyling;
    static ɵfac: i0.ɵɵFactoryDeclaration<TypingAnimatorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TypingAnimatorDirective, "[typingAnimator]", never, { "sentences": "sentences"; "typeSpeed": "typeSpeed"; "deleteSpeed": "deleteSpeed"; "startDelay": "startDelay"; "showCursor": "showCursor"; }, { "onComplete": "onComplete"; "onDeleted": "onDeleted"; }, never>;
}
