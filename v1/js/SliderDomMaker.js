export class SliderDomMaker{
    constructor(){
        this.clss = {
            wrap : "slider-wrap",
            bar : "slider-bar",
            barOn : "slider-bar-on",
            btn : "slider-btn",
            btnMin : "slider-btn-min",
            btnMax : "slider-btn-max",
            btnLabel : "slider-btn-label",
            param : "slider-param",
            amount : "slider-amount"
        }
        
        this.$wrap = null;
        this.$bar = null;
        this.$barOn = null;
        this.$btnMin = null;
        this.$btnMax = null;
        this.$lblMin = null;
        this.$lblMax = null;
        this.$param = null;
        this.$amount = null;

        this.btnWidth = 30;
    }//constructor

    draw_slider(){
        /* wrap */
        this.$wrap = this.make_wrap();
        
        /* bar */
        this.$bar = this.make_bar();
        this.$wrap.appendChild(this.$bar);

        /* button */
        const [$btnMin, $btnMax] = this.make_btns();
        this.$wrap.appendChild($btnMin);
        this.$wrap.appendChild($btnMax);

        /* param */
        this.$param = this.make_param();
        this.$wrap.appendChild(this.$param);
        
        /* amount */
        this.$amount = this.make_amount();
        this.$wrap.appendChild(this.$amount);

        /* 최종 */
        document.body.appendChild(this.$wrap);
    }//draw_slider

    make_wrap(){
        const $wrap = document.createElement('SECTION');
        $wrap.classList.add(this.clss.wrap);
        return $wrap;
    }//make_wrap

    make_bar(){
        const $bar = document.createElement('ARTICLE');
        const $barOn = document.createElement('DIV');
        $bar.classList.add(this.clss.bar);
        $barOn.classList.add(this.clss.barOn);

        $barOn.style.setProperty('--bar-min',"0%");
        $barOn.style.setProperty('--bar-max',"50%");

        $bar.appendChild($barOn)
        this.$barOn = $barOn;

        return $bar;
    }//make_bar

    make_btns(){
        const $btnMin = this.make_btn(true);
        const $btnMax = this.make_btn(false);
        return [$btnMin, $btnMax];
    }//make_btns

    make_btn(isMin = true){
        const $btn = document.createElement('BUTTON');
        $btn.classList.add(this.clss.btn);
        $btn.classList.add(isMin ? this.clss.btnMin : this.clss.btnMax);

        const $lbl = document.createElement('SPAN');
        $lbl.classList.add(this.clss.btnLabel);
        $lbl.textContent = 0;
        $btn.appendChild($lbl);

        if(isMin){
            this.$btnMin = $btn;
            this.$lblMin = $lbl;
        }else{
            this.$btnMax = $btn;
            this.$lblMax = $lbl;
        }

        return $btn;
    }//make_btn

    make_param(){
        const $param = document.createElement('UL');
        $param.classList.add(this.clss.param);

        const {min,max,step} = this.info;
        for(let i=min; i<=max; i+=step){
            if(i<max){
                const $li = document.createElement('LI');
                // $li.textContent = i;
                $param.appendChild($li);
                $li.dataset.labelLeft = i;
                if(i+step >= max){$li.dataset.labelRight = i + step;}
            }
            this.param.push(i);
        }

        $param.style.setProperty('--item-count',this.param.length - 1);

        return $param
    }//make_param

    make_amount(){
        const $amount = document.createElement('DIV');
        $amount.classList.add(this.clss.amount);
        $amount.textContent = "0";
        return $amount;
    }

    /* -------------- */
    move_btn_max_center(){
        const {width} = this.$wrap.getBoundingClientRect();
        const x = (width / 2) - (this.btnWidth / 2);
        this.$btnMax.style.transform = `translateX(${x}px)`;
        console.log(x);
    }//move_btn_max_center
}//SliderDomMaker