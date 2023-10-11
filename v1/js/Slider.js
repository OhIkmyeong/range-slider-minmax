import { SliderDomMaker } from "./SliderDomMaker.js";

export class Slider extends SliderDomMaker{
    constructor(info){
        super();
        this.info = info;
        this.param = [];
        this.$btnCurr = null;
        this.btnPos = {
            down : null,
            now : null
        }
    }//constructor

    init(){
        /* DOM 그리기 */
        this.draw_slider();
        
        /* 버튼 */
        this.move_btn_max_center();
        
        /* 라벨 */
        this.change_label_min(this.param[0]);
        this.change_label_max(this.param[parseInt(this.param.length / 2)]);

        /* 이벤트 더하기 */
        this.$btnMin.addEventListener('mousedown',this.on_mouse_down,{once:true})
        this.$btnMax.addEventListener('mousedown',this.on_mouse_down,{once:true})

    }//init

    /* ----------- */
    change_label(INFO = {}){
        const {value, $lbl} = INFO;
        $lbl.textContent = value;
    }//change_label
    
    change_label_min(value){
        this.change_label({value : value, $lbl : this.$lblMin});
    }//change_label_min
    
    change_label_max(value){
        this.change_label({value : value, $lbl : this.$lblMax});
    }//change_label_max
    
    /* ----------- */
    on_mouse_down = (e) =>{
        this.$btnCurr = e.currentTarget;
        this.btnPos.down = e.clientX;
        window.addEventListener('mousemove', this.on_mouse_move);
        window.addEventListener('mouseup', this.on_mouse_up, {once:true});
    }//on_mouse_down

    on_mouse_move = (e) => {
        const xDown = e.clientX - this.btnPos.down;
        const {left} = this.$btnCurr.getBoundingClientRect();
        const {left:wrapLeft, width:wrapWidth} = this.$bar.getBoundingClientRect();
        const leftPrev = left - wrapLeft; 
        const x = leftPrev + xDown;
        const limitRight = wrapWidth;
        let finalX = x;
        if(x < 0){finalX = 0;}
        if(x > limitRight){finalX = limitRight;}
        this.btnPos.down = e.clientX;

        /* 01. 버튼 옮기기 */
        this.$btnCurr.style.transform = `translateX(${finalX}px)`;

        /* 02. bar 조정 */
        const perX = finalX / wrapWidth * 100;
        const isMin = this.is_btn_curr_min();
        this.$barOn.style.setProperty(`--bar-${isMin ? "min" : "max"}`, `calc(${perX}%)`);

        /* 03. label 텍스트 변경 */
        const {min,max} = this.info;
        const value = parseInt(min + ((max - min) * perX / 100));
        if(isMin){
            this.change_label_min(value);
        }else{
            this.change_label_max(value);
        }

        /* 04.amount 텍스트 변경 */
        this.display_amount();
    }//on_mouse_move

    on_mouse_up = (e) =>{
        window.removeEventListener('mousemove',this.on_mouse_move);
        this.$btnCurr.addEventListener('mousedown',this.on_mouse_down,{once:true})
        this.$btnCurr = null;
    }//on_mouse_up

    /* ----------- */
    is_btn_curr_min(){
        if(this.$btnCurr.classList.contains(this.clss.btnMin)) return true;
        return false;
    }//is_btn_curr_min

    /* ----------- */
    display_amount(){
        const max = Number(this.$lblMax.textContent);
        const min = Number(this.$lblMin.textContent);
        const amount = max - min;
        this.$amount.textContent = amount;
    }//display_amount
}//Slider