const main = document.getElementById('main');
const study = document.getElementById('study');
const sum = document.getElementById('sum');
const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const status = document.getElementById('status');
const meigen = document.getElementById('meigen');
const meigenlist=["誘惑に負けた1時間で、ライバルは前に進んでいる。","勉強で勝つ者は、最後に笑う者だ。","成長した自分に出会いたいなら、勉強をやめるな。","勝ち負けの結果よりも、成長の過程が大切だ。","勝つために必要なのは、常に成長し続ける意志だ。","勝ち負けは結果。でも、勉強は自分を強くする手段だ。"]



const date=new Date;
const dateid=date.getMonth()+" "+date.getDate()+" "+date.getFullYear();



let sumtime=parseInt(localStorage.getItem(dateid));

shokika();
function shokika(){
    if(localStorage.getItem(dateid)==="NaN"||localStorage.getItem(dateid)===""){
        localStorage.setItem(dateid,0);
    }
    var random=Math.floor(Math.random()*6);
    meigen.innerText=meigenlist[random];
    main.style.display = 'block';
    study.style.display = 'none';
    var hour = Math.floor(sumtime / 3600);
    var min = Math.floor(sumtime %3600 /60);
    var sec = sumtime % 60;
    sum.innerText = String(hour).padStart(2, '0') + ":" +String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
}
const sound = new Audio('決定ボタンを押す4.mp3');


let counttime=0;

stop.addEventListener('click', () => {
    click=false;
    sumtime+=parseInt(counttime);
    localStorage.setItem(dateid,sumtime);
    shokika();
});

start.addEventListener('click', () => {
    counttime=0;

    click=true;
    main.style.display = 'none';
    study.style.display = 'block';

    studyfunc();

    function studyfunc() {

        document.documentElement.requestFullscreen();

        status.innerText = '学習中';
        let studytime = 1500;

        var min = Math.floor(studytime / 60);
        var sec = studytime % 60;
        timer.innerText = String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');

        const studynow = setInterval(() => {
            studytime--;
            counttime++;
            var min = Math.floor(studytime / 60);
            var sec = studytime % 60;
            timer.innerText = String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
            if (studytime === 0) {
                clearInterval(studynow);
                breakfunc();
                return;
            }
            if(click===false){
                clearInterval(studynow);
                return;
            }
        }, 1000);
    }
    // break

    function breakfunc() {
        
        sound.play();
        status.innerText = '休憩中';

        let breaktime = 300;

        var min = Math.floor(breaktime / 60);
        var sec = breaktime % 60;
        timer.innerText = String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');

        const breaknow = setInterval(() => {
            counttime++;
            breaktime--;
            var min = Math.floor(breaktime / 60);
            var sec = breaktime % 60;
            timer.innerText = String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
            if (breaktime === 0) {
                clearInterval(breaknow);
                sound.play();
                studyfunc();
                return;
            }
            if(click===false){
                clearInterval(studynow);
                return;
            }
        }, 1000);
    }
});
